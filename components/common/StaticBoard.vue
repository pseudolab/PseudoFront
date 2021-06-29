<template>
  <article class="static-board">
    <div v-for="({ label, value }, index) in staticData" :key="index">
      <h2>
        {{ value }}
      </h2>
      {{ label }}
    </div>
  </article>
</template>

<script>
/*
  NOTE: StaticBoard Props 설명
  staticData는 항목명(label), 아이콘(icon), 수치(value)로 이루어진 오브젝트들로 구성된 배열이다.
*/
export default {
  props: {
    staticData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.static-board {
  width: 100%;
  background-color: #2715b9;
  color: white;
  border-radius: 20px;
  padding: 10px 20px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-around;
}
</style>
