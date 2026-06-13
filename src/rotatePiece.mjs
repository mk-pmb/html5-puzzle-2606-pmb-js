import EX from './0_base.mjs';

EX.updateMixin({

  defaultRotationAngleDeg: 45,

  rotationAngleNumOrDefault(ang) {
    if (Number.isFinite(ang)) { return ang; }
    return EX.defaultRotationAngleDeg;
  },

  rotatePieceCwHotkey: 'r',
  rotatePieceCwBtnIcon: '\u21B7',
  rotatePieceCw(puzArea, deltaAngleDeg) {
    const mrp = puzArea.mostRecentPieceReadOnly;
    if (!mrp) { return; }
    const st = mrp.style;
    if (!st) { return; }
    const oldAngle = EX.parseCssNumIgnoreUnit(st.rotate);
    let ang = EX.rotationAngleNumOrDefault(deltaAngleDeg);
    ang = (oldAngle + ang) % 360;
    st.rotate = ang + 'deg';
    EX.updateMostRecentPieceTracerGeom(puzArea, mrp);
  },

  rotatePieceCcwHotkey: 'R',
  rotatePieceCcwBtnIcon: '\u21B6',
  rotatePieceCcw(puzArea, deltaAngleDeg) {
    return EX.rotatePieceCw(puzArea,
      -EX.rotationAngleNumOrDefault(deltaAngleDeg));
  },

});
