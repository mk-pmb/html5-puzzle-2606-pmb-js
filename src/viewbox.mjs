import EX from './0_base.mjs';

function numOr0(x) { return (+x || 0); }

EX.updateMixin({

  setupViewBox(puzArea) {
    const cfg = puzArea.config;
    const vbNums = (cfg.viewbox + ' 0 0 0 0'
    ).match(/\S+/g).slice(0, 4).map(numOr0);
    cfg.viewbox = vbNums.join(' ');
    const [minCamX, minCamY, maxCamX, maxCamY] = vbNums;

    const ori = puzArea.refs.origin.style;
    ori.marginTop     = puzArea.fmtLenPx(-minCamY);
    ori.marginLeft    = puzArea.fmtLenPx(-minCamX);
    ori.marginRight   = puzArea.fmtLenPx(maxCamX);
    ori.marginBottom  = puzArea.fmtLenPx(maxCamY);

    const box = puzArea.refs.viewbox.style;
    box.width   = puzArea.fmtLenPx(maxCamX - minCamX);
    box.height  = puzArea.fmtLenPx(maxCamY - minCamY);
  },

});
