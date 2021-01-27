<template>
  <v-card class="rank-board px-3 py-3 text-center" outlined>
    <h4 class="mb-4">가짜연구소 멤버 랭킹</h4>
    <div
      v-for="({ icon, name, postCount, exp, accumulation }, idx) in rankInfo"
      :key="idx"
      class="rank-board--item d-flex align-center"
    >
      <UserProfile
        :img-url="require(`~/assets/img/${icon}`)"
        exp-color="#3cb043"
        :exp="exp"
        :remain-exp="accumulation"
        :width="40"
        :is-animation="false"
      />
      <span class="rank-board__name ml-1">{{ name }}</span>
      <span class="rank-board__postCount ml-4 mr-1 grey--text">{{
        postCount
      }}</span>
      <span class="rank-board__posts grey--text">posts</span>
    </div>
  </v-card>
</template>
<script>
import UserProfile from '@/components/common/UserProfile.vue'

export default {
  components: {
    UserProfile,
  },
  data: () => ({
    rankInfo: [
      {
        icon: 'test3.png',
        name: 'Name',
        postCount: 130,
        exp: 30,
        accumulation: 50,
      },
      {
        icon: 'test3.png',
        name: 'Name',
        postCount: 130,
        exp: 30,
        accumulation: 50,
      },
      {
        icon: 'test3.png',
        name: 'Name',
        postCount: 130,
        exp: 30,
        accumulation: 50,
      },
      {
        icon: 'test3.png',
        name: 'Name',
        postCount: 130,
        exp: 30,
        accumulation: 50,
      },
    ],
  }),
}
</script>
<style lang="scss" scoped>
.rank-board {
  &.v-sheet--outlined {
    border: none;
  }
}
</style>
