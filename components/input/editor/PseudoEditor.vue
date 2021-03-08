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
