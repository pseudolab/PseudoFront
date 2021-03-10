<template>
  <section class="user-info">
    <UserProfile
      :img-url="require('~/assets/img/test.png')"
      exp-color="red"
      :exp="10"
      :remain-exp="20"
      :width="200"
      :is-animation="true"
    />
    <v-card class="pa-3" outlined>
      <v-card-title class="mb-3">Name</v-card-title>
      <v-card-subtitle>한 줄 소개</v-card-subtitle>
      <v-card-text> 한 줄 설명 추가 </v-card-text>
      <v-card-subtitle>소속</v-card-subtitle>
      <v-card-text> 가짜 연구소 </v-card-text>
      <v-card-subtitle>지역</v-card-subtitle>
      <v-card-text> 서울 </v-card-text>
      <v-card-subtitle>메일 주소</v-card-subtitle>
      <v-card-text> abc@abc.com </v-card-text>
      <v-card-subtitle>개인 웹페이지</v-card-subtitle>
      <v-card-text> www.abc.com </v-card-text>
    </v-card>
    <v-btn
      class="d-block ml-auto mt-4"
      :style="{
        border: 'none',
      }"
      disabled
      small
      depressed
      >Edit</v-btn
    >
  </section>
</template>
<script>
import UserProfile from '@/components/common/UserProfile.vue'

export default {
  components: {
    UserProfile,
  },
}
</script>
<style lang="scss" scoped>
.user-info {
  & .theme--light.v-card .v-card__subtitle {
    color: #797979;
    font-size: 16px;
    padding: 0;
  }
  & .theme--light.v-card > .v-card__text {
    color: #797979;
    font-size: 10px;
    padding: 0;
  }
}
</style>
