<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-card>
        <pseudo-editor />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import headMixin from '@/mixins/common/head.js'
import PseudoEditor from '@/components/input/editor/PseudoEditor.vue'
export default {
  components: {
    PseudoEditor,
  },
  mixins: [headMixin],
  data() {
    return {}
  },
  head() {
    return this.getHead({ pageName: 'main' })
  },
}
</script>
