<template>
  <v-chip-group
    class="chip-board"
    :multiple="true"
    @change="changeSelectedChips"
  >
    <v-chip
      v-for="{ name, isSelected } in chips"
      :key="name"
      class="ma-2"
      :outlined="!isSelected"
      label
    >
      {{ name }}
    </v-chip>
  </v-chip-group>
</template>
<script>
/*
props:
  chips: - 필수
    attribute: name, isOutline
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
    changeSelectedChips(chips) {
      this.$emit('changeSelectedChips', chips)
    },
  },
}
</script>
<style lang="scss" scoped></style>
