export default {
  methods: {
    getAnchorElements() {
      const s = window.getSelection()
      const node = s.anchorNode
      // parent is not Editor element, Just wrapping marked element
      const parent =
        node.parentElement.id === 'txtArea' ? node : node.parentElement
      return {
        node,
        selection: s,
        parentElement: parent,
        prevElement: node.previousSibling,
        nextElement: node.nextSibling,
      }
    },
  },
}
