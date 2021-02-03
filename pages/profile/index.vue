<template>
  <section class="profile d-flex">
    <UserInfo class="mr-6" />
    <div>
      <v-chip-group mandatory @change="changeSelectedMenu">
        <v-chip
          v-for="(name, idx) in profileMenues"
          :key="name"
          class="ms-2"
          label
          :outlined="!(idx === selectedMenuIdx)"
        >
          {{ name }}
        </v-chip>
      </v-chip-group>
      <Summary class="mb-15" />
      <Following class="mb-15" />
      <Activity />
    </div>
  </section>
</template>
<script>
import headMixin from '@/mixins/common/head.js'
import UserInfo from '@/components/profile/UserInfo.vue'
import Summary from '@/components/profile/Summary.vue'
import Following from '@/components/profile/Following.vue'
import Activity from '@/components/profile/Activity.vue'

export default {
  components: {
    UserInfo,
    Summary,
    Following,
    Activity,
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
