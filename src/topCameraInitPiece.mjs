import EX from './0_base.mjs';

EX.updateMixin({

  topCameraInitPiece(piece, puzArea) {
    const { geom } = piece;
    Object.assign(piece.style, {
      top:    puzArea.fmtLenPx(geom.z),
      left:   puzArea.fmtLenPx(geom.x),
      width:  puzArea.fmtLenPx(geom.w),
      height: puzArea.fmtLenPx(geom.d), // d = depth
    });
  },

});
