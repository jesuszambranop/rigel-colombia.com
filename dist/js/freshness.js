(() => {
  'use strict';
  const current = document.querySelector('meta[name="rigel-version"]')?.content;
  if (!current || !window.fetch) return;
  const manifest = new URL('site-version.json', location.href);
  manifest.searchParams.set('check', Date.now().toString(36));
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  fetch(manifest.href, {cache:'no-store', signal:controller.signal})
    .then(response => response.ok ? response.json() : null)
    .then(release => {
      if (!release || !/^[a-f0-9]{16}$/.test(release.version) || release.version === current) return;
      const next = new URL(location.href);
      // One navigation per release, even if a CDN briefly returns older HTML.
      if (next.searchParams.get('_v') === release.version) return;
      next.searchParams.set('_v', release.version);
      location.replace(next.href);
    })
    .catch(() => { /* A slow or offline connection must not block the page. */ })
    .finally(() => clearTimeout(timeout));
})();
