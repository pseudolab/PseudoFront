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
      <h2 class="mb-3">Name</h2>
      <h3>한 줄 소개</h3>
      <p>한 줄 설명 추가</p>
      <h3>소속</h3>
      <p>가짜 연구소</p>
      <h3>지역</h3>
      <p>서울</p>
      <h3>메일 주소</h3>
      <p>abc@abc.com</p>
      <h3>개인 웹페이지</h3>
      <p>www.abc.com</p>
    </v-card>
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
<style lang="scss" scoped></style>
