<script>
import PseudoEditor from '@/components/input/editor/PseudoEditor.vue'
export default {
  data() {
    return {
      ctgr: '',
      subject: '',
      author: '',
      participants: [],
      keywords: [],
      ctgrs: [
        {
          ko: '질문',
          val: 'QandA',
        },
        {
          ko: '기록',
          val: 'Archive',
        },
      ],
    }
  },
  computed: {
    txtArea() {
      return document.getElementById('txtArea')
    },
  },
  methods: {
    getContent() {
      return {
        ctgr: this.ctgr,
        subject: this.subject,
        author: this.author,
        participants: this.participants,
        keywords: this.keywords,
        content: this.txtArea.innerHTML,
      }
    },
    genContent(h) {
      const self = this
      const child = []
      child.push(
        h('v-autocomplete', {
          props: {
            'item-value': 'val',
            'item-text': 'ko',
            'cache-items': true,
            label: '카테고리',
            outlined: true,
            items: self.ctgrs,
          },
          on: {
            change: (val) => {
              self.ctgr = val
            },
          },
        })
      )
      const datas = ['subject', 'author']
      const txts = ['제목', '작성자']
      txts.forEach((label, idx) => {
        child.push(
          h('v-text-field', {
            props: {
              outlined: true,
              label,
              value: self[datas[idx]],
            },
            on: {
              input: (val) => {
                self[datas[idx]] = val
              },
            },
          })
        )
      })
      child.push(
        h('v-combobox', {
          props: {
            multiple: true,
            chips: true,
            value: self.participants,
            outlined: true,
            label: '참여자',
            'search-input.sync': self.partiTxt,
            'deletable-chips': true,
          },
          on: {
            input: (val) => {
              self.participants = val
            },
          },
        })
      )
      child.push(
        h(PseudoEditor, {
          ref: 'psedoEditor',
        })
      )
      child.push(
        h('v-combobox', {
          props: {
            multiple: true,
            chips: true,
            value: self.keywords,
            outlined: true,
            label: '키워드',
            'search-input.sync': self.keyTxts,
            'deletable-chips': true,
          },
          on: {
            input: (val) => {
              self.keywords = val
            },
          },
        })
      )
      child.push(
        h('v-card-actions', [
          h('v-spacer'),
          h(
            'v-btn',
            {
              on: {
                click: (e) => {
                  const queryObj = Object.assign(self.getContent(), {
                    files: self.$refs.psedoEditor.files, // FIXME: 나중에 queryObj 위로 전달해서 거기서 전송하도록
                  })
                  const objToForm = (queryObj) =>
                    Object.keys(queryObj).reduce((form, k) => {
                      form.append(k, queryObj[k])
                      return form
                    }, new FormData())
                  const formdata = objToForm(queryObj)
                  // FIXME: How to access to Injected Lib in JSX Or and parent
                  console.log('queryObj:', queryObj)
                  self.$root.context.$axios.post(
                    'http://18.191.67.71:4000/routes/posts', // url
                    formdata, // data
                    {
                      // config
                      headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                    }
                  )
                },
              },
            },
            ['등록']
          ),
          h('v-btn', ['취소']),
          h('v-spacer'),
        ])
      )
      return child
    },
  },
  render(h) {
    // 카테고리(오토) 제목 작성자 참여자
    return h(
      'v-card',
      {
        class: {
          'pa-12': true,
        },
      },
      this.genContent(h)
    )
  },
}
</script>
<style lang="scss">
@import url('https://github.githubassets.com/assets/gist-embed-4ac6018bcc05457cde2f66d2e7299d11.css');
* {
  [contenteditable]:focus {
    outline: 0px solid transparent;
  }
}

.editor-container {
  width: 100%;
  height: 100%;
  border: thin solid $p-b-blue;
  padding: 3%;

  #txtArea {
    min-height: 30vh;
  }
}

.custom-gist {
  margin: 0% 10%;
}

.editor-toolbar {
  max-width: 40vw;
  min-width: 20vw;
  height: 5vh;
  padding: 0px 0.7vw;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.v-text-field__details {
  display: none;
}
.v-list-item__title {
  align-self: center;
  font-size: 1rem;
  color: $p-b-blue;
}
</style>
