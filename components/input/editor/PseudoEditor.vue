<script>
import SimpleEditor from '@/components/input/editor/SimpleEditor.vue'
export default {
  data() {
    return {
      isActive: false,
    }
  },
  mounted() {},
  methods: {},
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
              value: self.isActive,
              closeOnClick: true,
              closeOnContentClick: false,
              dark: true,
              absolute: true,
            },
            on: {
              input: (val) => (self.isActive = val),
            },
            scopedSlots: {
              activator: ({ on }) => {
                return h(SimpleEditor, { ref: 'editor', on })
              },
            },
          },
          [
            h(
              'v-card',
              {
                style: {
                  'background-color': 'red',
                },
              },
              ['CARDCARD']
            ),
          ]
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
