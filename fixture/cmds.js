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
    val: null,
  },
  contentReadOnly: {
    src: 'mdi-account-circle',
    tag: 'v-icon',
    val: null,
  },
  bold: {
    src: require('~/assets/img/p-icons/1.png'),
    tag: 'v-img',
    val: null,
  },
  // required Selection
  copy: {
    src: 'mdi-owl',
    tag: 'v-icon',
    val: null,
  },
  selectAll: {
    src: require('~/assets/img/p-icons/0.png'),
    tag: 'v-img',
    val: null,
  },
  heading_2: {
    src: require('~/assets/img/p-icons/4.png'),
    tag: 'v-img',
    val: 'H2',
  },
  heading_3: {
    src: require('~/assets/img/p-icons/5.png'),
    tag: 'v-img',
    val: 'H3',
  },
  strikeThrough: {
    src: require('~/assets/img/p-icons/7.png'),
    tag: 'v-img',
    val: null,
  },
})

export { CmdDict }
