import EX from './0_base.mjs';

const D = window.dom80;

EX.updateMixin({

  keyCatcher: false,

  ensureKeyCatcher() {
    if (EX.keyCatcher) { return; }
    const kc = D.mkTag('input');
    kc.type = 'text';
    kc.size = 1;
    kc.tabindex = -1;
    kc.className = 'puzzle-keycatcher';
    EX.keyCatcher = kc;
    D.body.appendChild(kc);

    kc.targetPuzArea = false;
    kc.setTarget = function setTarget(puzArea) {
      kc.targetPuzArea = puzArea;
      setTimeout(() => kc.focus(), 5);
      return kc;
    };

    kc.keyHandlersMap = {};
    EX.scanMethodsWithHint('Hotkey', function each(mthd, hint) {
      Object([]).concat(hint).forEach(function addKey(keySpec) {
        if (!keySpec) { return; }
        const t = typeof keySpec;
        if (t === 'string') { kc.keyHandlersMap[keySpec] = mthd; }
      });
    });

    const onKey = function onKey(evt) {
      const text = kc.value;
      if (!text) { return; }
      kc.value = '';
      EX.runDelegatedHandler(kc.targetPuzArea, kc.keyHandlersMap, text, evt);
    };

    kc.onkeyup = onKey;
  },

});
