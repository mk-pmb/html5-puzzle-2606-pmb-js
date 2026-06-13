import EX from './0_base.mjs';

const D = window.dom80;

EX.updateMixin({

  addInsideCornersToElem(puzArea, el) {
    let { cornerLen } = el.dataset; // always a string or undefined
    if (cornerLen === '-') { cornerLen = ''; }
    cornerLen = puzArea.fmtLenPx(cornerLen || puzArea.config.cornerLen);
    if (!cornerLen) { return; }
    function addCorner(tb, lr) {
      const c = D.mkTag('span');
      c.className = ('corner corner-'
        + ['top', 'bottom'][tb] + '-' + ['left', 'right'][lr]);
      c.style[['top', 'bottom'][tb]] = 0;
      c.style[['left', 'right'][lr]] = 0;
      c.style.width = cornerLen;
      c.style.height = cornerLen;
      const b = D.mkTag('b');
      c.appendChild(b);
      b.style['border' + ['Bottom', 'Top'][tb] + 'Width'] = 0;
      b.style['border' + ['Right', 'Left'][lr] + 'Width'] = 0;
      el.appendChild(c);
    }
    addCorner(0, 0);
    addCorner(0, 1);
    addCorner(1, 0);
    addCorner(1, 1);
  },

});
