<template>
  <!-- src="/v.png" -->
  <div>
    <v-row justify="center">
      <v-col cols="1"> </v-col>
      <v-col cols="10">
        <query-form />
      </v-col>
      <v-col cols="1" />
    </v-row>
  </div>
</template>

<script>
import headMixin from '@/mixins/common/head.js'
import QueryForm from '@/components/input/QueryForm.vue'
export default {
  components: {
    QueryForm,
  },
  mixins: [headMixin],
  head() {
    return this.getHead({ pageName: 'query' })
  },
}
</script>
