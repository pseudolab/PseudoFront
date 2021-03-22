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
            const s = window.getSelection()
            const node = s.anchorNode
            const m = marked(node.textContent).replace('\n', '')
            const chr = evt.data
            const origin = node.parentElement
            const prev = node.previousSibling // line change

            if (!chr && prev && s.anchorOffset === 0) {
              console.log('prev.textContent: ', prev.textContent)
              prev.outerHTML = marked(prev.textContent)
            } else if (origin.outerHTML !== m) {
              // 커서위치 Row의 마크다운 적용
              // console.log(`orgiin.outerHTML: ${origin.outerHTML} \n m: ${m}`)
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
