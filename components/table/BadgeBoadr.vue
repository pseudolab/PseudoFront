<template>
  <section class="badge-board">
    <v-chip
      v-for="({ name, color, isOutline }, index) in chips"
      :key="name"
      class="ma-2"
      :color="color"
      :outlined="isOutline"
      :text-color="isOutline ? color : 'white'"
      @click="select(index)"
    >
      {{ name }}
    </v-chip>
  </section>
</template>
<script>
/*
props:
  chips: - 필수
    attribute: name, color, isOutline
emit:
  @selectChip:
    parameter: index
*/
export default {
  props: {
    chips: {
      required: true,
      type: Array,
    },
  },
  methods: {
    select(index) {
      this.$emit('selectChip', index)
    },
  },
}
</script>
<style lang="scss" scoped></style>
