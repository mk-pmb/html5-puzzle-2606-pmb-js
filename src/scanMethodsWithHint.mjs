import EX from './0_base.mjs';

EX.updateMixin({

  scanMethodsWithHint(suffix, func, ...args) {
    const found = [];
    if (!suffix) { throw new Error('suffix is required'); }
    Object.keys(EX).forEach(function each(key) {
      if (!key.endsWith(suffix)) { return; }
      const mthd = key.slice(0, -suffix.length);
      const impl = EX[mthd];
      if (!impl) { return; }
      if (!impl.call) { return; }
      found.push(mthd);
    });
    if (!found.length) { return; }
    found.sort(); // <-- Ensure side-effects happen in reproducible order.
    return found.map(function each(mthd) {
      const hint = EX[mthd + suffix];
      const impl = EX[mthd];
      return func(mthd, hint, impl, ...args);
    });
  },

});
