import EX from './0_base.mjs';

EX.updateMixin({

  sideCameraInitPiece(piece, puzArea) {
    const { geom } = piece;
    Object.assign(piece.style, {
      top:    puzArea.fmtLenPx(-geom.y),
      left:   puzArea.fmtLenPx(geom.x),
      width:  puzArea.fmtLenPx(geom.w),
      height: puzArea.fmtLenPx(geom.h),
    });
  },

});
