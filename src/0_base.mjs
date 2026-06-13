const D = window.dom80;

const EX = {
  autorun() { D.whenDomReady(EX.autorunAssumeDomReady); },
  autorunAssumeDomReady() { EX.mapPuzzleAreas(EX.initOnePuzzleArea); },
  mapPuzzleAreas(f) { return D.qsMap('.' + EX.puzAreaCls, f); },
  puzAreaCls: 'puzzle-area',
};

EX.updateMixin = Object.assign.bind(Object, EX);

if (D.body.classList.contains('puzzle-autorun')) { EX.autorun(); }

export default EX;
