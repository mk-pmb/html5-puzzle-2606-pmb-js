import EX from './0_base.mjs';

EX.updateMixin({

  updateMostRecentPiece(puzArea, piece) {
    const tracerSt = puzArea.refs.mostRecentPieceTracer.style;
    // eslint-disable-next-line no-param-reassign
    puzArea.mostRecentPieceReadOnly = (piece || false);
    if (!piece) {
      tracerSt.display = 'none';
      return;
    }
    const pcs = puzArea.refs.pieces;
    if (pcs.lastElementChild !== piece) { pcs.appendChild(piece); }
    tracerSt.display = '';
    EX.updateMostRecentPieceTracerGeom(puzArea, piece);
  },

  updateMostRecentPieceTracerGeom(puzArea, piece) {
    const st = puzArea.refs.mostRecentPieceTracer.style;
    Object(['top', 'left', 'width', 'height', 'rotate'])
      .forEach(function copy(prop) { st[prop] = piece.style[prop]; });
  },

  makeLeastRecentHotkey: 'b',
  makeLeastRecentBtnIcon: '\u2B1A',
  makeLeastRecent(puzArea, setPiece) {
    const pcs = puzArea.refs.pieces;
    const p = setPiece || pcs.lastElementChild;
    if (!p) { return; }
    const fc = pcs.firstElementChild;
    if (p === fc) { return; }
    pcs.insertBefore(p, fc);
    EX.updateMostRecentPiece(puzArea);
  },

});
