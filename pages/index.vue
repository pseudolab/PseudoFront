<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card> Main Page </v-card>
    </v-col>
  </v-row>
</template>

<script>
import headMixin from '@/mixins/common/head.js'
export default {
  mixins: [headMixin],
  data() {
    return {}
  },
  head() {
    return this.getHead({ pageName: 'main' })
  },
}
</script>
