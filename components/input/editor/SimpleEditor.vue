<script>
import marked from 'marked'
export default {
  data() {
    return {
      html: '',
    }
  },
  methods: {
    format(cmd, value) {
      document.execCommand(cmd, true, value)
    },
  },
  render(h) {
    const self = this
    return h('div', {
      ref: 'txtArea', // for element
      attrs: {
        contenteditable: true,
        id: 'txtArea', // for node
      },
      on: {
        mousedown: (evt) => {
          if (evt.button === 2) {
            this.$emit('click', evt)
          }
        },
        input: (evt) => {
          // Selected Node
          const node = window.getSelection().anchorNode
          node.outerHTML = node.data ? marked(node.data) : null
          self.html = evt.target.innerHTML
        },
        keyup: (evt) => {
          // console.log(`shiftKey: ${evt.shiftKey}\n keyCode: ${evt.keyCode}, \n evt:`,evt,currentTarget:',evt.currentTarget)
          if (evt.keyCode === '91') {
            self.format('bold')
          }
        },
      },
    })
  },
}
</script>
