<script>
import { CmdDict } from '@/fixture/cmds.js'
export default {
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
  render(h) {
    const format = (cmd, value) => document.execCommand(cmd, true, value)
    const self = this
    const btns = self.cmds.map((cmd) => {
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
              self.$emit('addSection')
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
              self.parent._data.gistActive = true
            },
          },
        },
        ['mdi-github']
      )
    )
    btns.push(
      h('v-file-input', {
        props: {
          'prepend-icon': 'mdi-camera',
          hideInput: true,
          chips: true,
        },
        on: {
          change: (file) => {
            self.$emit('fileChange', { file })
          },
        },
      })
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
