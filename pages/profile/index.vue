<template>
  <section class="profile d-flex my-15 justify-space-between">
    <UserInfo />
    <div>
      <v-chip-group class="mb-5" mandatory @change="changeSelectedMenu">
        <v-chip
          v-for="(name, idx) in profileMenues"
          :key="name"
          class="ms-2"
          label
          :outlined="!(idx === selectedMenuIdx)"
          color="primary"
        >
          {{ name }}
        </v-chip>
      </v-chip-group>
      <Summary v-if="selectedMenuIdx === 0" />
    </div>
  </section>
</template>
<script>
import headMixin from '@/mixins/common/head.js'
import UserInfo from '@/components/profile/UserInfo.vue'
import Summary from '@/components/profile/Summary.vue'

export default {
  components: {
    UserInfo,
    Summary,
  },
  mixins: [headMixin],
  data() {
    return {
      profileMenues: ['Summary', 'Posts', 'Q & A', 'Rank', 'Bookmarks'],
      selectedMenuIdx: 0,
    }
  },

  methods: {
    changeSelectedMenu(idx) {
      this.selectedMenuIdx = idx
    },
  },
  head() {
    return this.getHead({ pageName: 'profile' })
  },
}
</script>
<style lang="scss" scoped></style>
