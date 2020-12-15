export default {
  data () {
    return {
      content: '<p>I am Example</p>',
      editorOption: {
        // some quill options
        modules: {
          // https://quilljs.com/
          // https://github.com/surmon-china/vue-quill-editor
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        }
      }  
    }
  },

}