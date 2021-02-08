<script>
import { CmdDict } from '@/fixture/cmds.js'
export default {
  functional: true,
  props: {
    cmds: {
      type: Array,
      required: false,
      validator: (arr) => {
        const keys = Object.keys(CmdDict)
        return arr.every((cmd) => keys.includes(cmd))
      },
      default: () => ['bold', 'fontSize', 'backColor', 'copy'],
    },
  },
  render(h, context) {
    const btns = context.props.cmds.map((cmd) => {
      return h('v-icon', [CmdDict[cmd].src])
    })
    btns.push(
      h(
        'v-icon',
        {
          on: {
            click(e) {
              context.parent._data.gistActive = true
            },
          },
        },
        ['mdi-github']
      )
    )
    return h(
      'v-card',
      {
        class: {
          'editor-toolbar': true,
        },
      },
      btns
    )
  },
}
</script>
