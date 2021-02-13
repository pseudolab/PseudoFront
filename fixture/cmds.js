/**
 * @readonly
 * @param {Object.<
 *  cmd: string,
 *  tag: v-icon | v-img,
 *  validator: callback | null
 * >}
 * https://developer.mozilla.org/ko/docs/Web/API/Document/execCommand
 */
const CmdDict = Object.freeze({
  backColor: {
    src: 'mdi-pencil',
    tag: 'v-icon',
  },
  contentReadOnly: {
    src: 'mdi-account-circle',
    tag: 'v-icon',
  },
  bold: {
    src: require('~/assets/img/p-icons/1.png'),
    tag: 'v-icon',
  },
  // required Selection
  copy: {
    src: 'mdi-owl',
    tag: 'v-icon',
  },
  selectAll: {
    src: require('~/assets/img/p-icons/0.png'),
    tag: 'v-img',
  },
  fontSize: {
    src: 'mdi-domain',
    tag: 'v-icon',
  },
})

export { CmdDict }
