<script>
import marked from 'marked'
import elements from '@/mixins/input/editor/elements'
import manufacture from '@/mixins/input/editor/manufacture'

/* 
TODO: gist css 안먹는중
TODO: nested listing
TODO: gist 가끔 안먹는중
TODO: 줄바꿈이 아니라 실시간으로 텍스트 파싱 안되나..?
TODO: Marked 적용시 Preserve Attribute
*/
const DEFAULT_TAG = 'P'
const EXCEPT_FORMAT_TAGS = ['img']

export default {
  mixins: [elements, manufacture],
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
  methods: {
    trggerUpdateSections() {
      this.editNode.dispatchEvent(
        new CustomEvent('updateSections', { bubbles: true })
      )
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
            const { prevElement: p, selection: s } = self.getAnchorElements()
            const chr = evt.data
            if (
              !chr &&
              p &&
              s.anchorOffset === 0 &&
              Array.from(p.children).every(
                (e) => !EXCEPT_FORMAT_TAGS.includes(e.tagName.toLowerCase())
              ) &&
              p.attributes.length < 1
            ) {
              console.log(p)
              p.outerHTML = marked(p.textContent)
            }
            self.html = self.editNode.innerHTML
          },
          keyup: (evt) => {
            const { parentElement } = self.getAnchorElements()
            if (evt.code === 'Enter') {
              self.trggerUpdateSections()
            } else if (evt.keyCode === '91') {
              self.format('bold')
            } else if (evt.shiftKey) {
              console.log('evt.code: ', evt.code)
              if (evt.code === 'ArrowRight') {
                self.indentManufacture({ element: parentElement, add: true })
              } else if (evt.code === 'ArrowLeft') {
                self.indentManufacture({ element: parentElement, add: false })
              }
            }
          },
        },
      },
      [h(DEFAULT_TAG, [h('br')])]
    )
  },
}
</script>
