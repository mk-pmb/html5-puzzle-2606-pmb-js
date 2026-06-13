import EX from './0_base.mjs';

const D = window.dom80;

EX.updateMixin({

  installToolbar(puzArea) {
    if (!puzArea.classList.contains('toolbar-right')) {
      puzArea.classList.add('toolbar-left');
    }
    const btnCtnr = puzArea.refs.toolbar;
    const addBtn = EX.addToolbarButton.bind(null, btnCtnr);
    addBtn('moveToolbarLeft', '\u2770');
    EX.scanMethodsWithHint('BtnIcon', addBtn);
    addBtn('moveToolbarRight', '\u2771');
    btnCtnr.onclick = EX.delegatedHandler(puzArea, 'DATASET', 'mthd');
  },

  addToolbarButton(btnCtnr, mthdName, btnIcon) {
    const btnEl = D.mkTag('input');
    btnEl.type = 'button';
    btnEl.value = btnIcon;
    btnEl.title = mthdName;
    btnEl.dataset.mthd = mthdName;
    btnCtnr.appendChild(btnEl);
  },

  moveToolbarLeft(puzArea) {
    puzArea.classList.remove('toolbar-right');
    puzArea.classList.add('toolbar-left');
  },

  moveToolbarRight(puzArea) {
    puzArea.classList.remove('toolbar-left');
    puzArea.classList.add('toolbar-right');
  },

});
