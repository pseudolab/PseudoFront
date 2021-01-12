<template>
  <!-- src="/v.png" -->
  <div>
    <v-row>
      <v-col>
        <text-editor />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import TextEditor from '@/components/input/quil/TextEditor.vue'
import headMixin from '@/mixins/common/head.js'
export default {
  components: {
    TextEditor,
  },
  mixins: [headMixin],
  head() {
    return this.getHead({ pageName: 'community' })
  },
}
</script>
