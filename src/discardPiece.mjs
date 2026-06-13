import EX from './0_base.mjs';

EX.updateMixin({

  discardPieceHotkey: 'D',
  discardPieceBtnIcon: '\u267B',
  discardPiece(puzArea) {
    const pcs = puzArea.refs.pieces;
    const mrp = puzArea.mostRecentPieceReadOnly;
    if (!mrp) { return; }
    pcs.removeChild(mrp);
    EX.updateMostRecentPiece(puzArea);
  },

});
