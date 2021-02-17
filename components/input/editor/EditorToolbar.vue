<script>
import { CmdDict } from '@/fixture/cmds.js'
export default {
  functional: true,
  props: {
    cmds: {
      type: Array,
      required: true,
      validator: (arr) => {
        const keys = Object.keys(CmdDict)
        return arr.every((cmd) => keys.includes(cmd))
      },
    },
  },
  render(h, context) {
    const format = (cmd, value) => document.execCommand(cmd, true, value)
    const btns = context.props.cmds.map((cmd) => {
      const option = {
        props: {},
        on: {},
        style: {
          width: '1.2vw',
          height: '1.2vh',
        },
      }
      const c = CmdDict[cmd]
      const child = []
      const command = cmd.includes('_') ? cmd.split('_')[0] : cmd
      option.on.click = (e) => format(command, c.val)
      if (c.tag === 'v-icon') {
        child.push(c.src)
      } else if (c.tag === 'v-img') {
        option.props.src = c.src
        option.props.contain = true
      }
      return h('v-btn', { props: { icon: true } }, [h(c.tag, option, child)])
    })
    // Section add Btn
    btns.push(
      h(
        'v-icon',
        {
          on: {
            click(e) {
              const qPage = context.parent.$parent.$parent.$parent
              const id = qPage.sections.length + 1
              const s = document.getSelection()
              const el = s.type === 'Range' ? s.baseNode.parentNode : s.baseNode
              el.setAttribute('id', `section-${id}`)
              qPage.addSection(id)
            },
          },
        },
        ['mdi-alien']
      )
    )
    // gist component on
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
