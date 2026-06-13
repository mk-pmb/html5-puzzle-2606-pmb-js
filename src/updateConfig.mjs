import EX from './0_base.mjs';

EX.updateMixin({

  updateConfig(origCfg, ovr) {
    const cfg = { ...origCfg };
    Object.keys(ovr).forEach(function upd(k) {
      let v = ovr[k];
      if (Number.isFinite(cfg[k])) { v = +v; }
      if (!v) { return; }
      cfg[k] = v;
    });
    return cfg;
  },

});
