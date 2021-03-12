<script>
// import marked from 'marked'
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
            // self.html = evt.target.innerHTML
            // const node = window.getSelection().anchorNode
            // if (!self.editNode.innerHTML.startsWith('<')) {
            //   self.editNode.innerHTML =
            //     '<div>' + self.editNode.innerHTML + '</div>'
            // } else if (node.data) {
            //   // node.parentElement.outerHTML = marked(node.data)
            //   // node.parentElement.focus()
            // }
          },
          keyup: (evt) => {
            // console.log(`shiftKey: ${evt.shiftKey}\n keyCode: ${evt.keyCode}, \n evt:`,evt,currentTarget:',evt.currentTarget)
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
