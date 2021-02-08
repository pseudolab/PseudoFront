import { types, range } from '@/fixture/validators.js'

/**
 * @readonly
 * @param {Object.<
 *  cmd: string,
 *  type: icon | img,
 *  validator: callback | null
 * >}
 * https://developer.mozilla.org/ko/docs/Web/API/Document/execCommand
 */
const CmdDict = Object.freeze({
  backColor: {
    src: 'mdi-pencil',
    type: 'icon',
    validator: types.str,
  },
  contentReadOnly: {
    src: 'mdi-account-circle',
    type: 'icon',
    validator: types.bool,
  },
  bold: {
    src: 'mdi-account-circle',
    type: 'icon',
    validator: null,
  },
  // required Selection
  copy: {
    src: 'mdi-owl',
    type: 'icon',
    validator: null,
  },
  fontSize: {
    src: 'mdi-domain',
    type: 'icon',
    validator: range(1, 7),
  },
})

export { CmdDict }
