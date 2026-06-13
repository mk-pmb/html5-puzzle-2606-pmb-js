import EX from './0_base.mjs';

EX.updateMixin({

  parseCssNumIgnoreUnit(s) { return parseInt(s, 10) || 0; },

  fmtLenPx(scale, mm) {
    if (!mm) { return 0; }
    let len = +mm;
    if (!len) { return 0; }
    len *= scale;
    if (len % 1) { len = len.toFixed(2); }
    return len + 'px';
  },

});
