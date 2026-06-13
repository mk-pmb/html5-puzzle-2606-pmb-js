import EX from './0_base.mjs';

function isStr(x) { return ((typeof x) === 'string'); }

EX.updateMixin({

  delegatedHandler(...args) {
    return EX.runDelegatedHandler.bind(null, ...args);
  },

  runDelegatedHandler(puzArea, dict, prop, evt) {
    if (!puzArea) { return; }
    let hnd = dict;
    if (hnd === 'TARGET') { hnd = evt.target; }
    if (hnd === 'DATASET') { hnd = evt.target?.dataset; }
    if (isStr(hnd)) { hnd = puzArea[hnd]; }
    if (!hnd) { return; }
    hnd = hnd[prop];
    if (isStr(hnd)) { hnd = EX[hnd]; }
    if (!hnd) { return; }
    return hnd(puzArea, evt);
  },

});
