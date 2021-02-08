<template>
  <v-row justify="center" align="center">
    <v-col>
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
