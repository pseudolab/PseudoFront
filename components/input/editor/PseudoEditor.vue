<script>
import SimpleEditor from '@/components/input/editor/SimpleEditor.vue'
import EditorToolbar from '@/components/input/editor/EditorToolbar.vue'
import gist from '@/mixins/input/gist.js'
import { fileToElement } from '@/fixture/common/fileManage.js'
export default {
  mixins: [gist],
  data() {
    return {
      menuActive: false,
      files: [],
    }
  },
  render(h) {
    const self = this
    return h(
      'div',
      {
        class: {
          'editor-container': true,
        },
      },
      [
        h('v-file-input', {
          props: {
            value: self.files,
            'prepend-icon': 'mdi-camera',
            hideInput: true,
            multiple: true,
            chips: true,
          },
          on: {
            change: (vals) => {
              self.files = vals
              const { node } = this.$refs.editor.getAnchorElements()
              const newLine = document.createElement('p')
              fileToElement(self.files).then((element) => {
                console.log(element)
                newLine.appendChild(element)
                node.parentElement.after(newLine)
              })
            },
          },
        }),
        h(
          'v-menu',
          {
            props: {
              contentClass: 'menu-content',
              value: self.menuActive,
              closeOnClick: true,
              closeOnContentClick: false,
              absolute: true,
              top: true,
              'offset-y': true,
              'offset-x': true,
            },
            on: {
              input: (val) => (self.menuActive = val),
            },
            scopedSlots: {
              activator: ({ on }) => {
                return h(SimpleEditor, {
                  ref: 'editor',
                  on,
                })
              },
            },
          },
          [
            h(EditorToolbar, {
              props: {
                cmds: ['selectAll', 'bold', 'heading_2', 'heading_3'],
              },
            }),
            self.genGistForm(h),
          ]
        ),
      ]
    )
  },
}
</script>
