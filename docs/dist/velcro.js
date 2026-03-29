/* Velcro v0.1 */
(function () {
  const currentScript = document.currentScript;
  const githubPagesAssetBase = (() => {
    if (!window.location.hostname.endsWith('github.io')) return null;
    const owner = window.location.hostname.split('.')[0];
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const repo = pathParts[0];
    if (!owner || !repo) return null;
    return `https://raw.githubusercontent.com/${owner}/${repo}/main/assets/macaroni/`;
  })();
  const assetBase =
    githubPagesAssetBase ||
    (currentScript && currentScript.src
      ? new URL('../assets/macaroni/', currentScript.src).href
      : './assets/macaroni/');

  function getMacaroniSrc(char) {
    if (char === ' ') return `${assetBase}space.png`;
    if (/^[A-Da-d]$/.test(char)) return `${assetBase}${char.toUpperCase()}.png`;
    return null;
  }

  function renderMacaroni(el) {
    const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    el.textContent = '';

    for (const ch of text) {
      const src = getMacaroniSrc(ch);
      if (!src) {
        el.appendChild(document.createTextNode(ch));
        continue;
      }

      const img = document.createElement('img');
      img.className = 'v-letter';
      img.alt = ch === ' ' ? 'space' : ch;
      img.src = src;
      img.addEventListener('error', () => {
        img.replaceWith(document.createTextNode(ch));
      });
      el.appendChild(img);
    }
  }

  function init() {
    const nodes = document.querySelectorAll('[data-style="macaroni"]');
    nodes.forEach(renderMacaroni);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
