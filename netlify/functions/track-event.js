// netlify/functions/track-event.js
//
// Generic event tracker for sagarsankhe.netlify.app — accepts any of the
// event names you're already sending to Umami (view-resume, contact-me,
// contact-channel, send-message, skill-tab, project-detail, project-link,
// verify-credentials-linkedin, nav-link, theme-toggle) plus whatever extra
// detail comes with them (channel, category, project, section, etc).
//
// Captures city/region/country via Netlify's built-in context.geo (free,
// no external API) and browser/OS/device from the User-Agent header.
// No IP address is stored.

import { getStore } from '@netlify/blobs';
import { parseUserAgent } from './ua-parser.js';

const MAX_LOG_ENTRIES = 300;
const MAX_EVENT_NAME_LENGTH = 60;

export default async (req, context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { event, ...extra } = body || {};

  if (typeof event !== 'string' || !event.trim() || event.length > MAX_EVENT_NAME_LENGTH) {
    return new Response(JSON.stringify({ error: 'Invalid event name' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const store = getStore('site-analytics');

  // 1. Increment the main counter for this event
  await incrementCounter(store, safeKey(event));

  // 2. If there's a single extra detail field (e.g. channel, category,
  //    project, section), also keep a per-detail breakdown counter
  const detailEntries = Object.entries(extra).filter(([, v]) => typeof v === 'string' && v.trim());
  for (const [key, value] of detailEntries) {
    await incrementCounter(store, safeKey(`${event}:${key}:${value}`));
  }

  // 3. Append a detailed log entry — city/region/country + device info
  const geo = context.geo || {};
  const ua = req.headers.get('user-agent') || '';
  const device = parseUserAgent(ua);

  const logEntry = {
    event,
    detail: detailEntries.length ? Object.fromEntries(detailEntries) : null,
    time: new Date().toISOString(),
    city: geo.city || null,
    region: geo.subdivision?.name || null,
    country: geo.country?.name || null,
    browser: device.browser + (device.browserVersion ? ' ' + device.browserVersion : ''),
    os: device.os + (device.osVersion ? ' ' + device.osVersion : ''),
    deviceType: device.deviceType,
  };

  await appendToLog(store, logEntry);

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

// Netlify Blobs keys must avoid control chars and a few reserved characters,
// so normalise anything coming from the page before using it as a key.
function safeKey(key) {
  return key.replace(/[^\w.:@-]+/g, "_").slice(0, 200);
}

async function incrementCounter(store, key) {
  const current = await store.get(key, { type: 'text' });
  const count = current ? parseInt(current, 10) : 0;
  await store.set(key, String(count + 1));
}

async function appendToLog(store, entry) {
  const existing = await store.get('event-log', { type: 'json' });
  const log = Array.isArray(existing) ? existing : [];
  log.unshift(entry);
  if (log.length > MAX_LOG_ENTRIES) log.length = MAX_LOG_ENTRIES;
  await store.setJSON('event-log', log);
}

export const config = {
  path: '/.netlify/functions/track-event',
};
