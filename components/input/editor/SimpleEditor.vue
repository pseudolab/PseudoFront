<script>
export default {
  methods: {
    getNumOfLines() {
      // startwith 0, elementNodeReference
      return this.$refs.txtArea.childElementCount
    },
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
        },
        on: {
          mousedown: (evt) => {
            if (evt.button === 2) {
              this.$emit('click', evt)
            }
          },
          keyup: (evt) => {
            // console.log(
            //   `shiftKey: ${evt.shiftKey}\n keyCode: ${evt.keyCode}, \n evt:`,
            //   evt,
            //   'currentTarget:',
            //   evt.currentTarget
            // )
            if (evt.keyCode === '91') {
              self.format('bold')
            }
          },
        },
      },
      ['내용을 입력 하세요']
    )
  },
}
</script>
