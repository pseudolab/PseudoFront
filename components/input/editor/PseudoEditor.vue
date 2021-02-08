<script>
import SimpleEditor from '@/components/input/editor/SimpleEditor.vue'
import EditorToolbar from '@/components/input/editor/EditorToolbar.vue'
import gist from '@/mixins/input/gist.js'
export default {
  mixins: [gist],
  data() {
    return {
      menuActive: false,
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
        h(
          'v-menu',
          {
            props: {
              contentClass: 'menu-content',
              origin: 'top right',
              value: self.menuActive,
              closeOnClick: true,
              closeOnContentClick: false,
              absolute: true,
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
          [h(EditorToolbar), self.genGistForm(h)]
        ),
      ]
    )
  },
}
</script>
<style lang="scss">
@import url('./editor.scss');
@import url('https://github.githubassets.com/assets/gist-embed-4ac6018bcc05457cde2f66d2e7299d11.css');
</style>
