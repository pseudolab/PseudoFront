<template>
  <section class="user-info">
    <img width="200px" :src="imgUrl" />
    <v-card class="pa-3" outlined>
      <v-card-title class="mb-3">{{ userName }}</v-card-title>
      <v-card-subtitle>한 줄 소개</v-card-subtitle>
      <v-card-text> {{ description }} </v-card-text>
      <v-card-subtitle>지역</v-card-subtitle>
      <v-card-text> {{ region }} </v-card-text>
      <v-card-subtitle>메일 주소</v-card-subtitle>
      <v-card-text> {{ userMail }} </v-card-text>
    </v-card>
  </section>
</template>
<script>
export default {
  props: {
    userName: {
      default: '',
      type: String,
    },
    userMail: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      defualt: '',
    },
    region: {
      type: String,
      defulat: '',
    },
    imgUrl: {
      typs: String,
      defualt: '',
    },
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
