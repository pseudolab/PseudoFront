<template>
  <article class="summary">
    <v-card class="d-flex" outlined>
      <article class="flex-grow-1 pa-3">
        <h4>Current Rank</h4>
        <p><strong class="mr-3">587</strong><span>of 179,059</span></p>
      </article>
      <article class="flex-grow-1 pa-3">
        <h4>Highest Rank</h4>
        <p><strong class="mr-3">423</strong><span>of 179,059</span></p>
      </article>
    </v-card>

    <Following class="mb-15 mt-15" />
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
