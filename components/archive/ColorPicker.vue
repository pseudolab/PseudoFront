<template>
  <section class="color-picker">
    <div
      v-for="color in palette"
      :key="color"
      :style="{ backgroundColor: color }"
      class="color"
      @click="pickColor(color)"
    ></div>
  </section>
</template>
<script>
export default {
  props: {
    palette: {
      type: Array,
      required: true,
    },
  },
  methods: {
    convertDecimal(hex) {
      return parseInt(`0x${hex}`)
    },
    pickColor(color) {
      const r = this.convertDecimal([...color].slice(1, 3).join(''))
      const g = this.convertDecimal([...color].slice(3, 5).join(''))
      const b = this.convertDecimal([...color].slice(5, 7).join(''))
      this.$emit('pick-color', [r, g, b])
    },
  },
}
</script>
<style lang="scss" scoped>
.color-picker {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(-105%);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 30px;
  & .color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid black;
    cursor: pointer;
  }
}
</style>
