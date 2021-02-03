<script>
export default {
  data() {
    return {
      gistId: null,
      file: null,
    }
  },
  watch: {
    gistId(newId) {
      if (!newId) {
        return
      }
      let url = `https://gist.github.com/${newId}.json`
      if (this.file) {
        url = `${url}?file=${this.file}`
      }
      this.$axios.get(url).then((res) => {
        const newDiv = res.data.div
        const txtArea = this.$refs.editor
        const classAdded = newDiv.replace(
          'class="gist"',
          'class="gist custom-gist" contenteditable="false"'
        )
        const addedArea = classAdded + '<div> </br> <div>'
        txtArea.innerHTML += addedArea
        txtArea.lastElementChild.focus()
      })
    },
  },
  mounted() {
    this.gistId = 'e20d226dffc02452ce5f80e195336bc6'
  },
  methods: {
    getNumOfLines() {
      // startwith 0
      return this.$refs.editor.childElementCount
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
        ref: 'editor',
        class: {
          editor: true,
        },
        attrs: {
          contenteditable: true,
        },
        on: {
          click(e) {
            self.$emit('click', e)
          },
          keyup: (evt) => {
            // console.log(
            //   `shiftKey: ${evt.shiftKey}\n keyCode: ${evt.keyCode}, \n evt:`,
            //   evt,
            //   'currentTarget:',
            //   evt.currentTarget
            // )
            console.log('getNumOfLines:', self.getNumOfLines())
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
