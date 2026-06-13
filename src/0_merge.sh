#!/bin/bash
# -*- coding: utf-8, tab-width: 2 -*-


function merge_cli_init () {
  export LANG{,UAGE}=en_US.UTF-8  # make error messages search engine-friendly
  local SELFPATH="$(readlink -m -- "$BASH_SOURCE"/..)"
  cd -- "$SELFPATH" || return $?
  set -o pipefail -o errexit

  local JS_DEST='../dist/bundle.mjs'
  local MIXIN_START_RGX='EX\.updateMixin\(\{$'
  local MIXIN_END_RGX='^\}'
  local BOM_HEXESC='\xEF\xBB\xBF'

  local MIXIN_FILES=( $(grep -lxPe "$MIXIN_START_RGX" -- *.mjs) )

  ( head --lines=2 -- "${MIXIN_FILES[0]}"
    printf -- "import './%s';\n" "${MIXIN_FILES[@]}"
    echo $'\nexport default EX;'
  ) >_merge.mjs


  ( echo -ne "$BOM_HEXESC"

    LANG=C sed -nrf <(echo "s~^$BOM_HEXESC~~"'
      / eslint-disable-next-line /N
      s~\n~\r~g
      /^const EX = /b
      /^const /p
      /(^|\r)function /p
      ') -- "${MIXIN_FILES[@]}" | awk '!seen[$0]++' | tr '\r' '\n'

    sed -nre '/^export /b; /^const EX = /,$p' -- _base.mjs
    sed -nre "/^$MIXIN_START_RGX\$/,/$MIXIN_END_RGX/p" -- "${MIXIN_FILES[@]}" |
      sed -re "/$MIXIN_END_RGX/N; /\\n$MIXIN_START_RGX/d"
    grep -Pe '^export ' -- _base.mjs
  ) | grep -Pe '\S' >"$JS_DEST"

  du --apparent-size --bytes -- "$JS_DEST"
  elp --no-ignore -- "$JS_DEST"
}










merge_cli_init "$@"; exit $?
