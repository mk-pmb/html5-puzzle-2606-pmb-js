import EX from './0_base.mjs';

EX.updateMixin({

  moveToolStart(puzArea, evt) {
    if (evt.target === puzArea.refs.viewbox) {
      return EX.updateMostRecentPiece(puzArea);
    }
    const piece = EX.findEventPiece(puzArea, evt);
    if (!piece) { return; }
    EX.updateMostRecentPiece(puzArea, piece);
    puzArea.classList.add('moving');

    const ptrId = evt.pointerId;
    puzArea.setPointerCapture(ptrId);

    const from = {
      hndDrop: 'moveToolStop',
      hndMove: 'moveToolMove',
      origLeft: EX.parseCssNumIgnoreUnit(piece.style.left),
      origTop: EX.parseCssNumIgnoreUnit(piece.style.top),
      ptrId,
      ptrX: evt.clientX,
      ptrY: evt.clientY,
    };
    from.deltaLeft = from.origLeft - from.ptrX;
    from.deltaTop = from.origTop - from.ptrY;
    puzArea.movingFrom = from; // eslint-disable-line no-param-reassign

    EX.keyCatcher.setTarget(puzArea);
  },

  moveToolMove(puzArea, evt) {
    const { movingFrom } = puzArea;
    if (!movingFrom) { return; }
    const piece = puzArea.mostRecentPieceReadOnly;
    if (!piece) { return; }
    const st = piece.style;
    if (!st) { return; }
    st.top = (movingFrom.deltaTop + evt.clientY) + 'px';
    st.left = (movingFrom.deltaLeft + evt.clientX) + 'px';
    EX.updateMostRecentPieceTracerGeom(puzArea, piece);
  },

  moveToolStop(puzArea) {
    const from = puzArea.movingFrom;
    puzArea.releasePointerCapture(from.ptrId);
    puzArea.movingFrom = false; // eslint-disable-line no-param-reassign
    puzArea.classList.remove('moving');
  },

});
