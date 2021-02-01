<template>
  <section class="profile">
    <HexagonGraph
      :activity-score-data-set="activityScoreDataSet"
      :has-animation="true"
    />
  </section>
</template>
<script>
import headMixin from '@/mixins/common/head.js'
import HexagonGraph from '@/components/profile/HexagonGraph.vue'

// mock data
import {
  activityScoreDataMaxScore,
  activityScoreDatascore,
} from '@/mock/profile/activityScoreData.js'

export default {
  components: {
    HexagonGraph,
  },
  mixins: [headMixin],
  computed: {
    activityScoreDataSet() {
      return activityScoreDataMaxScore.map(
        (_, idx) =>
          (activityScoreDatascore[idx] / activityScoreDataMaxScore[idx]) * 100
      )
    },
  },
  head() {
    return this.getHead({ pageName: 'profile' })
  },
}
</script>
<style lang="scss" scoped></style>
