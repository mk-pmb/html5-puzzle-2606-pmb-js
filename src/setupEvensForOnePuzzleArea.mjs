import EX from './0_base.mjs';

EX.updateMixin({

  findEventPiece(puzArea, evt) {
    const piece = evt.target;
    return (piece.parentNode === puzArea.refs.pieces) && piece;
  },

  setupEvensForOnePuzzleArea(puzArea) {
    function proxyCancel(evt) { return puzArea.onpointercancel(evt); }
    window.addEventListener('blur', proxyCancel);
    Object.assign(puzArea, {
      onpointerdown: EX.onGrab.bind(null, puzArea),
      onpointermove: EX.delegatedHandler(puzArea, 'movingFrom', 'hndMove'),
      onpointercancel: EX.onLeave.bind(null, puzArea),
      onpointerleave: proxyCancel,
      onpointerup: EX.onDrop.bind(null, puzArea),
    });
  },

  onGrab(puzArea, evt) {
    if (evt.button === 0) { return EX.moveToolStart(puzArea, evt); }
  },

  onDrop(puzArea, evt) {
    EX.runDelegatedHandler(puzArea, 'movingFrom', 'hndDrop', evt);
  },

  onLeave(puzArea, evt) {
    const tgt = evt.target;
    if (!tgt.closest) { return EX.onDrop(puzArea, evt); } /*
      ^-- probably the window object => lost focus => drop. */
    if (tgt === puzArea.refs.viewport) { return EX.onDrop(puzArea, evt); }
  },

});
