<template>
  <!-- src="/v.png" -->
  <div>
    <v-row>
      <v-col>
        질문 공간
        <text-editor />
      </v-col>
    </v-row>
  </div>
</template>
 
<script>
import TextEditor from '@/components/api/quil/TextEditor.vue'
import headMixin from '@/mixins/common/head.js'
export default {
  components: {
    TextEditor,
  },
  mixins: [headMixin],
  data () {
    return {
    }
  },
  head () {
    return this.getHead({ pageName: 'query' })
  }  
}
</script>
