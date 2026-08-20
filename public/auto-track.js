// public/auto-track.js
//
// Auto-tracks every element that already has a data-umami-event attribute
// (you've already added these across the site for Umami) and mirrors the
// same click events to your own Netlify Function — as a free, independent
// backup to Umami Cloud.
//
// No changes needed to your existing buttons/links. Just load this file
// once, site-wide (see placement instructions).

(function () {
  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-umami-event]');
    if (!el) return;

    const eventName = el.getAttribute('data-umami-event');
    if (!eventName) return;

    // Collect any data-umami-event-* attributes as extra detail
    // e.g. data-umami-event-channel="linkedin" → { channel: "linkedin" }
    const extra = {};
    for (const attr of el.attributes) {
      if (attr.name.startsWith('data-umami-event-')) {
        const key = attr.name.replace('data-umami-event-', '');
        extra[key] = attr.value;
      }
    }

    sendTrackEvent(eventName, extra);
  }, true); // capture phase, so it still fires even if the site later stops propagation

  function sendTrackEvent(name, data) {
    try {
      fetch('/.netlify/functions/track-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: name, ...data }),
        keepalive: true,
      }).catch(() => {});
    } catch (e) { /* never break the page over analytics */ }
  }
})();
