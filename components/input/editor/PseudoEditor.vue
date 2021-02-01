<script>
import SimpleEditor from '@/components/input/editor/SimpleEditor.vue'
export default {
  mounted() {},
  methods: {},
  render(h) {
    return h(
      'div',
      {
        class: {
          'editor-container': true,
        },
      },
      [
        h(SimpleEditor, {
          ref: 'editor',
        }),
      ]
    )
  },
}
</script>
<style lang="scss">
@import url('./editor.scss');
@import url('https://github.githubassets.com/assets/gist-embed-4ac6018bcc05457cde2f66d2e7299d11.css');
</style>
