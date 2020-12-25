<template>
  <v-card>
    <div
      ref="editor"
      v-quill:myQuillEditor="editorOption"
      class="quill-editor"
      :content="content"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
    />
  </v-card>  
</template>
<script>
export default {
  props: {
    content: {
      type: String,
      required: true,
    }
  },
  data () {
    return {
      editorOption: {
        // some quill options
        placeholder: '내용을 입력 해 주세요.',
        modules: {
          // https://quilljs.com/
          // https://github.com/surmon-china/vue-quill-editor
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],            
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
            [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
            [{ direction: 'rtl' }], // text direction
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ font: [] }],
            [{ align: [] }],
            ['clean']        
          ]
        }
      }  
    }
  },
  mounted () {
    this.$refs.editor.parentElement.firstChild.style = 'border-radius: 0px 0px 5px 5px !important'
    console.log('app init, my quill insrance object is:', this.myQuillEditor)
  },  
  methods: {
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange ({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.$emit('update:content', html)
    }
  },      
}
</script>

<style lang="scss" scoped>
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
    border: none;
  }
</style>