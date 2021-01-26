<template>
  <v-card class="rank-board px-8 py-3" outlined>
    <v-card-title> 가짜연구소 멤버 랭킹 </v-card-title>
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
      <span class="rank-board__name mr-auto ml-3">{{ name }}</span>
      <span class="rank-board__postCount mr-1">{{ postCount }}</span>
      <span class="rank-board__posts">posts</span>
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
