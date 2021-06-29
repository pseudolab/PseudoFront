<template>
  <section class="user-info">
    <!-- <img width="200px" :src="imgUrl" /> -->
    <article class="information pa-3">
      <h3 class="mb-3">{{ userName }}</h3>
      <EditInput
        label="한 줄 소개"
        placeholder="간단한 소개글을 작성해주세요."
        :input-value="description"
        @changeInput="setDescription"
      />
      <EditInput
        label="지역"
        placeholder="거주 지역을 입력해주세요."
        :input-value="region"
        @changeInput="setRegion"
      />
      <EditInput
        label="메일 주소"
        placeholder="이메일을 입력해주세요."
        :input-value="userMail"
        @changeInput="setUserMail"
      />
    </article>
  </section>
</template>
<script>
import EditInput from '@/components/common/EditInput.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    EditInput,
  },
  props: {
    userName: {
      type: String,
      required: true,
    },
    // imgUrl: {
    //   typs: String,
    //   defualt: '',
    // },
  },
  computed: {
    userMail() {
      return this.$store.state.profile.userMail
    },
    description() {
      return this.$store.state.profile.description
    },
    region() {
      return this.$store.state.profile.region
    },
  },
  methods: {
    ...mapMutations({
      setUserMail: 'profile/SET_USER_MAIL',
      setDescription: 'profile/SET_DESCRIPTION',
      setRegion: 'profile/SET_REGION',
    }),
  },
}
</script>
<style lang="scss" scoped>
.user-info {
  & .information {
    width: 200px;
    border: 1px solid #797979;
    border-radius: 5px;
  }
}
</style>
