import EX from './0_base.mjs';

const D = window.dom80;

EX.updateMixin({

  defaultPuzzleAreaConfig: {
    camera: 'side',
    cornerLen: 0,
    scale: 1,
    viewbox: ['-', ' -', ' ', ' ', ''].join(1000),
  },

  initOnePuzzleArea(puzArea) {
    const origFirstChild = puzArea.firstElementChild;
    if (!origFirstChild) { return; }

    const cfg = EX.updateConfig(EX.defaultPuzzleAreaConfig, puzArea.dataset);
    Object.assign(puzArea.dataset, cfg);

    EX.ensureKeyCatcher();

    const puzBox = D.skel(puzArea, ['.puzzle-box', [
      '.viewport $', [
        '.viewbox $', [
          '.origin $', [
            '.pieces $',
            '.mostRecentPieceTracer $', [
              '.fill .shadow',
              '.fill .halo',
            ],
          ],
        ],
      ],
      '.toolbar $',
    ]]);
    puzArea.insertBefore(puzBox, origFirstChild);

    Object.assign(puzArea, {
      config: cfg,
      fmtLenPx: EX.fmtLenPx.bind(null, cfg.scale),
      mostRecentPieceReadOnly: false,
      movingFrom: false,
      refs: puzBox.refs,
    });
    delete puzBox.refs;

    EX.setupViewBox(puzArea);
    EX.installToolbar(puzArea);
    EX.parsePieces(puzArea, origFirstChild, {});
    EX.updateMostRecentPiece(puzArea);
    EX.setupEvensForOnePuzzleArea(puzArea);
  },

});
