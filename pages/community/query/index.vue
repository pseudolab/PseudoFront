<template>
  <!-- src="/v.png" -->
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="obj.title"
          solo
          clearable
          hide-details="auto"
          class="headline"
          label="제목"
        />
        <text-editor :content.sync="obj.content" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TextEditor from '@/components/input/quil/TextEditor.vue'
import headMixin from '@/mixins/common/head.js'
export default {
  components: {
    TextEditor
  },
  mixins: [headMixin],
  data() {
    return {
      obj: {
        title: '',
        content: ''
      }
    }
  },
  head() {
    return this.getHead({ pageName: 'query' })
  }
}
</script>
