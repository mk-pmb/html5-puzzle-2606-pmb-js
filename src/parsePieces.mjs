import EX from './0_base.mjs';

const D = window.dom80;
const doNothing = Boolean;

// eslint-disable-next-line no-param-reassign
function assignIf(d, k, v) { if (d && v) { d[k] = v; } }
function numOr0(x) { return (+x || 0); }


EX.updateMixin({

  parsePieces(puzArea, origInitElem, inheritedAttrs) {
    if (!origInitElem) { return; }
    let keptAttr = inheritedAttrs;
    const parElem = origInitElem.parentElement;
    let curElem;
    let nextElem = origInitElem;
    let tn;
    let fc;
    // console.debug('parsePieces >>', parElem);
    while (nextElem) {
      curElem = nextElem;
      nextElem = curElem.nextElementSibling;
      parElem.removeChild(curElem);
      fc = curElem.firstElementChild;
      tn = D.lcTag(curElem);
      if ((tn === 'p') || (tn === 'del')) {
        EX.parseOnePuzzlePiece(puzArea, curElem, keptAttr);
      }
      if (tn === 'var') {
        const mergedAttr = { ...keptAttr, ...D.attrDict(curElem) };
        if (fc) {
          EX.parsePieces(puzArea, fc, mergedAttr);
        } else {
          // console.debug('Update keptAttr for', curElem, mergedAttr);
          keptAttr = mergedAttr;
        }
      }
      if ((tn === 'ins') && fc) {
        const backupPreviousPiece = EX.previousPiece;
        EX.parsePieces(puzArea, fc,
          { ...D.attrDict(EX.previousPiece), ...D.attrDict(curElem) });
        // eslint-disable-next-line no-param-reassign
        EX.previousPiece = backupPreviousPiece;
      }
    }
    // console.debug('parsePieces <<', parElem);
  },

  previousPiece: false,

  parseOnePuzzlePiece(puzArea, curElem, inheritedAttrs) {
    // console.debug('parseOnePuzzlePiece', curElem, inheritedAttrs);
    const piece = curElem;
    EX.weakAssignAttributesFromDict(piece, inheritedAttrs);

    piece.geom = EX.parseOnePuzzlePieceGeometry(piece);
    (EX[puzArea.dataset.camera + 'CameraInitPiece']
      || doNothing)(piece, puzArea);

    assignIf(piece.style, 'backgroundColor', piece.getAttribute('bgc'));

    if (D.lcTag(piece) !== 'del') {
      puzArea.refs.pieces.appendChild(piece);
      piece.appendChild(D.mkTagC('span .fill .inner-frame'));
      EX.addInsideCornersToElem(puzArea, piece);
    }

    EX.previousPiece = piece;
  },

  geometryAttribNames: ['x', 'y', 'z', 'w', 'h', 'd'],

  parseOnePuzzlePieceGeometry(piece) {
    const geom = {};
    EX.geometryAttribNames.forEach(function parse(attr) {
      let val = piece.getAttribute(attr) || '';
      const rel = val.startsWith('_');
      if (rel) { val = val.slice(1); }
      val = numOr0(val);
      if (rel) { val += numOr0(EX.previousPiece?.geom?.[attr]); }
      geom[attr] = val;
    });

    function checkNegSize(axis, sizeProp) {
      const len = geom[sizeProp];
      if (len && (len < 0)) {
        geom[axis] += len;
        geom[sizeProp] = -len;
      }
    }
    checkNegSize('x', 'w');
    checkNegSize('y', 'h');
    checkNegSize('z', 'd');

    function fmtMult(attr, unit, val) {
      geom[attr] = val;
      const numStr = val.toFixed(2).replace(/\.0+$/, '');
      piece.setAttribute(attr + '-' + unit, numStr);
    }
    fmtMult('floor', 'sqcm', (geom.w * geom.d) / 100);
    fmtMult('volume', 'l', (geom.w * geom.d * geom.h) / 1e6);

    return geom;
  },















});
