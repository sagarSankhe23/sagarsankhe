// netlify/functions/get-stats.js
//
// Returns event counts (including per-detail breakdowns like which
// contact channel or which project) + the recent detailed log for
// sagarsankhe.netlify.app. Protected by STATS_SECRET.
//   https://sagarsankhe.netlify.app/.netlify/functions/get-stats?key=YOUR_SECRET

import { getStore } from '@netlify/blobs';

export default async (req) => {
  const url = new URL(req.url);
  const key = url.searchParams.get('key');

  if (!process.env.STATS_SECRET || key !== process.env.STATS_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

  const store = getStore('site-analytics');
  const { blobs } = await store.list();

  const stats = {};
  let recentEvents = [];

  for (const blob of blobs) {
    if (blob.key === 'event-log') {
      recentEvents = (await store.get('event-log', { type: 'json' })) || [];
      continue;
    }
    const value = await store.get(blob.key, { type: 'text' });
    stats[blob.key] = parseInt(value, 10) || 0;
  }

  return new Response(JSON.stringify({ stats, recentEvents }, null, 2), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const config = {
  path: '/.netlify/functions/get-stats',
};
