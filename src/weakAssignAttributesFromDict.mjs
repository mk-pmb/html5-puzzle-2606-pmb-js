import EX from './0_base.mjs';

EX.updateMixin({

  weakAssignAttributesFromDict(destElem, srcDict) {
    if (!srcDict) { return; }
    Object.keys(srcDict).forEach(function each(k) {
      if (destElem.hasAttribute(k)) { return; }
      const v = srcDict[k];
      if (!v) { return; }
      destElem.setAttribute(k, v);
    });
  },

});
