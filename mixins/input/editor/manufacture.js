export default {
  methods: {
    format(cmd, value) {
      document.execCommand(cmd, true, value)
    },
    indentManufacture({ element, add = true }) {
      const indent = element.style.textIndent
      const m = indent.match(/\d+px/)

      if (m && m.length > 0) {
        // if exist indent
        const px = Number(m[0].replace('px', ''))
        let rank = Math.round(px / 20)
        rank += add ? 1 : -1
        element.style.textIndent = rank > 0 ? (rank * 20).toString() + 'px' : ''
      } else {
        element.style.textIndent = add ? '20px' : ''
      }
    },
  },
}
