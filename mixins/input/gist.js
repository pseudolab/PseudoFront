// Gist ID가 변경되면 this.$refs.editor 의 innerHTML 에 추가 됩니다
import { types, rangeLen } from '@/fixture/validators.js'
export default {
  data() {
    return {
      gistId: null,
      file: null,
      gistActive: false,
      formValid: false,
    }
  },
  mounted() {
    this.gistId = 'e20d226dffc02452ce5f80e195336bc6'
  },
  methods: {
    getGistDiv() {
      const id = this.gistId
      if (!id) {
        return
      }
      let url = `https://gist.github.com/${id}.json`
      if (this.file) {
        url = `${url}?file=${this.file}`
      }
      this.$axios.get(url).then((res) => {
        const newDiv = res.data.div
        const txtArea = this.$refs.editor.$refs.txtArea
        const classAdded = newDiv.replace(
          'class="gist"',
          'class="gist custom-gist" contenteditable="false"'
        )
        const addedArea = classAdded + '<div> </br> <div>'
        txtArea.innerHTML += addedArea
        txtArea.lastElementChild.focus()
      })
    },
    genGistForm(h) {
      const self = this
      return h(
        'v-dialog',
        {
          props: {
            value: self.gistActive,
            width: '500',
          },
        },
        [
          h(
            'v-form',
            {
              color: 'primary',
              ref: 'gistForm',
              props: {
                'lazy-validation': true,
                value: self.formValid,
              },
              on: {
                submit: (e) => {
                  if (self.$refs.gistForm.validate()) {
                    self.getGistDiv()
                    self.gistActive = false
                  }
                  e.preventDefault()
                },
              },
            },
            [
              h('v-text-field', {
                props: {
                  value: self.gistId,
                  label: 'GIST ID',
                  required: true,
                  rules: [
                    (id) => types.str(id),
                    (id) =>
                      rangeLen({ min: 30, max: 35, val: id }) ||
                      'gist id 길이를 다시 확인 해주세요.',
                  ],
                },
                on: {
                  input: (val) => {
                    self.gistId = val
                  },
                },
              }),
            ]
          ),
        ]
      )
    },
  },
}
