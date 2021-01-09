import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor/dist/ssr'
import MarkdownShortcuts from 'quill-markdown-shortcuts'

console.log(MarkdownShortcuts)
console.log(VueQuillEditor)
VueQuillEditor.Quill.register('modules/markdownShortcuts', MarkdownShortcuts)
console.log(VueQuillEditor)
Vue.use(VueQuillEditor)
console.log(Vue)