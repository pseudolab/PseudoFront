<script>
import marked from 'marked'
export default {
  data() {
    return {
      html: '',
    }
  },
  computed: {
    editNode() {
      return this.$refs.txtArea
    },
  },
  mounted() {},
  methods: {
    format(cmd, value) {
      document.execCommand(cmd, true, value)
    },
    getAnchorElements() {
      const s = window.getSelection()
      const node = s.anchorNode
      return {
        node,
        selection: s,
        parentElement: node.parentElement,
        prevElement: node.previousSibling,
        nextElement: node.nextSibling,
      }
    },
  },
  render(h) {
    const self = this
    return h(
      'div',
      {
        ref: 'txtArea', // for element
        attrs: {
          contenteditable: true,
          id: 'txtArea', // for node
          role: 'textbox',
        },
        on: {
          mousedown: (evt) => {
            if (evt.button === 2) {
              self.$emit('click', evt)
            }
          },
          input: (evt) => {
            const {
              prevElement,
              parentElement,
              selection,
              node,
            } = self.getAnchorElements()
            const chr = evt.data
            const m = marked(node.textContent).replace('\n', '')
            if (!chr && prevElement && selection.anchorOffset === 0) {
              prevElement.outerHTML = marked(prevElement.textContent)
            } else if (parentElement.outerHTML !== m) {
              // 커서위치 Row의 마크다운 적용
              // console.log(`orgiin.outerHTML: ${parentElement.outerHTML} \n m: ${m}`)
            }
            self.html = self.editNode.innerHTML
          },
          keyup: (evt) => {
            if (evt.code === 'Enter') {
              self.editNode.dispatchEvent(
                new CustomEvent('updateSections', { bubbles: true })
              )
            }
            if (evt.keyCode === '91') {
              self.format('bold')
            }
          },
        },
      },
      [h('p', [h('br')])]
    )
  },
}
</script>
