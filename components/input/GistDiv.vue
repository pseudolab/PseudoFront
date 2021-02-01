<script>
export default {
  functional: true,
  props: {
    gitDiv: {
      type: String,
      required: false,
      default: () => 'Git Div Loaddddding',
    },
  },
  render(h, context) {
    // Transparently pass any attributes, event listeners, children, etc.
    // if (context.data.props.gitDiv) {
    //   return h('p', [context.data.props.gitDiv])
    // } else {
    return h('p', ['No div'])
    // }
  },
}
</script>
