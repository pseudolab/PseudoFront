<script>
export default {
  functional: true,
  props: {
    cmds: {
      type: Array,
      required: true,
      default: () => ['bold', 'numbLine', 'dotLine'],
    },
  },
  render(h, context) {
    return h(
      'v-card',
      {
        class: {
          'editor-toolbar': true,
        },
      },
      ['CARDCARD']
    )
  },
}
</script>
