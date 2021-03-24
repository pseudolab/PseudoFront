<script>
import SimpleEditor from '@/components/input/editor/SimpleEditor.vue'
import EditorToolbar from '@/components/input/editor/EditorToolbar.vue'
import gist from '@/mixins/input/gist.js'
export default {
  mixins: [gist],
  data() {
    return {
      menuActive: false,
      files: [],
    }
  },
  methods: {
    readSingleFile(file, returnType = 'url') {
      const fr = new FileReader()
      return new Promise((resolve, reject) => {
        fr.onerror = () => {
          fr.abort()
          reject(new DOMException('Problem parsing input file.'))
        }
        fr.onload = () => {
          resolve(fr.result)
        }
        if (returnType === 'url') {
          fr.readAsDataURL(file)
        } else if (returnType === 'txt') {
          fr.read.readAsText(file)
        } else {
          reject(
            new DOMException(`
            returnType: '${returnType}' not matched in readSingleFile`)
          )
        }
      })
    },
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
            change: async (vals) => {
              self.files = vals
              const { node } = this.$refs.editor.getAnchorElements()
              let newLine = 'Why not Adjusted ???????'
              try {
                const imgUrl = await self.readSingleFile(self.files)
                const imgElement = h('v-img', {
                  props: {
                    src: imgUrl,
                    contain: true,
                    transition: true,
                  },
                })
                newLine = h('p', [imgElement])
              } catch (err) {
                newLine = h('p', [err])
              } finally {
                // #FIXME: 이거 왜 OBJECT 로 쓰이냐.. 동적 엘리먼트 추가가 안되네..
                node.parentElement.after(newLine)
              }
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
