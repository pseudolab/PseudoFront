<template>
  <!-- src="/v.png" -->
  <div>
    <v-row>
      <v-col> 질문 목록 </v-col>
    </v-row>
  </div>
</template>

<script>
import headMixin from '@/mixins/common/head.js'
export default {
  components: {},
  mixins: [headMixin],
  head() {
    return this.getHead({ pageName: 'query' })
  },
}
</script>
