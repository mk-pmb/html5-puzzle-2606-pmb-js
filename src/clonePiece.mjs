import EX from './0_base.mjs';

EX.updateMixin({

  clonePieceHotkey: 'c',
  clonePieceBtnIcon: '\u2687',
  clonePiece(puzArea) {
    const mrp = puzArea.mostRecentPieceReadOnly;
    if (!mrp) { return; }
    EX.updateMostRecentPiece(puzArea, EX.deepCloneDomElem(mrp));
  },

  deepCloneDomElem(el) { return el && el.cloneNode(true); },

});
