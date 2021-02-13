<template>
  <v-chip-group
    class="chip-board"
    :multiple="true"
    @change="changeSelectedChips"
  >
    <v-chip
      v-for="{ name, isSelected } in chips"
      :key="name"
      class="ms-2"
      :outlined="!isSelected"
      label
      color="primary"
    >
      {{ name }}
    </v-chip>
  </v-chip-group>
</template>
<script>
/*
props:
  chips: - 필수
    attribute: {name, isSelected} // Object type
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
