<template>
  <section class="activity">
    <v-chip class="mb-4" label> Activity </v-chip>
    <article>
      <HexagonGraph
        :activity-score-data-set="activityScoreDataSet"
        :has-animation="true"
        color="#0077a3b0"
      />
      <ActivityCalender :year="2021" :calender-dataset="calenderDataset" />
    </article>
  </section>
</template>
<script>
import HexagonGraph from '@/components/profile/HexagonGraph.vue'
import ActivityCalender from '@/components/profile/ActivityCalender.vue'

// mock data
import {
  activityScoreDataMaxScore,
  activityScoreDatascore,
} from '@/mock/profile/activityScoreData.js'
import { calenderDataset } from '@/mock/profile/activityCalenderData.js'
export default {
  components: {
    HexagonGraph,
    ActivityCalender,
  },
  data() {
    return {
      calenderDataset,
    }
  },
  computed: {
    activityScoreDataSet() {
      return activityScoreDataMaxScore.map(
        (_, idx) =>
          (activityScoreDatascore[idx] / activityScoreDataMaxScore[idx]) * 100
      )
    },
  },
}
</script>
<style lang="scss" scoped></style>
