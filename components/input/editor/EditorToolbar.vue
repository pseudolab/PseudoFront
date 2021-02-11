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
      default: () => ['bold', 'copy'],
    },
  },
  render(h, context) {
    const format = (cmd, value) => document.execCommand(cmd, true, value)
    // const cmdDict = CmdDict
    const btns = context.props.cmds.map((cmd) => {
      return h(
        'v-icon',
        {
          on: {
            click(e) {
              format(cmd)
            },
          },
        },
        // icon name
        [CmdDict[cmd].src]
      )
    })
    btns.push(
      h(
        'v-icon',
        {
          // offsetTop: 528
          //
          on: {
            click(e) {
              const s = document.getSelection().baseNode
              // using clientHeight * locateRatio
              const locateRatio = (
                s.offsetTop / s.parentNode.clientHeight
              ).toFixed(3)
              context.parent.addSection(locateRatio)
            },
          },
        },
        ['mdi-alien']
      )
    )

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
