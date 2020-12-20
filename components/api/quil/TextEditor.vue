<template>
  <v-card>
    <v-text-field 
      v-model="obj.title" solo
      clearable hide-details="auto"
      class="headline" label="제목"
    />
    <div class="quill-editor"
      ref="editor"
      :content="obj.content"
      @change="onEditorChange($event)"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      v-quill:myQuillEditor="editorOption">
    </div>
  </v-card>  
</template>
<script>
const myDropdown = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
export default {
  data () {
    return {
      obj: {
        title: null,
        content: null,
      },
      editorOption: {
        // some quill options
        placeholder: '내용을 입력 해 주세요.',
        modules: {
          // https://quilljs.com/
          // https://github.com/surmon-china/vue-quill-editor
          toolbar: [
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            [{ 'direction': 'rtl' }],                         // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean']        
          ]
        }
      }  
    }
  },  
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.obj.content = html
    }
  },
  mounted() {
    this.$refs.editor.parentElement.firstChild.style = "border-radius: 0px 0px 5px 5px !important"
    console.log('app init, my quill insrance object is:', this.myQuillEditor)
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