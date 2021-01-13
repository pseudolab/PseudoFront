<template>
  <section class="badge-board">
    <v-chip
      v-for="({ name, color, isSelected }, index) in chips"
      :key="name"
      class="ma-2"
      :color="color"
      :outlined="isSelected"
      :text-color="isSelected ? color : 'white'"
      @click="select(index)"
    >
      {{ name }}
    </v-chip>
  </section>
</template>
<script>
export default {
  // TODO: fixture로 빼야 함
  // TODO: select method를 의존성 제거를 해야 함 (emit 사용)
  data: () => ({
    chips: [
      { name: 'Levdfa', color: 'deep-purple accent-4', isSelected: true },
      { name: 'Rucode', color: 'teal', isSelected: true },
      { name: 'bubule', color: 'amber darken-3', isSelected: true },
    ],
  }),
  methods: {
    select(index) {
      this.chips[index].isSelected = !this.chips[index].isSelected
    },
  },
}
</script>
<style lang="scss" scoped></style>
