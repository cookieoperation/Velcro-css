/* Velcro v0.1 */
(function () {
  function getMacaroniSrc(char) {
    if (char === ' ') return './assets/macaroni/space.png';
    if (/^[A-Da-d]$/.test(char)) return `./assets/macaroni/${char.toUpperCase()}.png`;
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
