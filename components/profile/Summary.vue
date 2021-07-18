<template>
  <article class="summary">
    <Following class="mb-15" />
    <Activity />
  </article>
</template>
<script>
import Following from '@/components/profile/Following.vue'
import Activity from '@/components/profile/Activity.vue'

export default {
  components: {
    Following,
    Activity,
  },
}
</script>
<style lang="scss" scoped>
.summary {
  & article {
    color: $p-b-blue;
    &:not(:last-child) {
      border-right: inherit;
      border-radius: 0 !important;
    }
  }
  & p {
    padding: 0;
    margin: 0;
  }
  & strong {
    font-size: 25px;
  }

  & h4 {
    font-size: 14px;
    font-weight: normal;
  }

  & span {
    color: #909090;
  }
}
</style>
