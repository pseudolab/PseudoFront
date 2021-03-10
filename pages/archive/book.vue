<template>
  <main class="archive-book">
    <v-card
      v-for="i in 7"
      :key="i"
      class="mr-5 mb-5"
      width="30rem"
      @click="handleBook"
    >
      <v-img
        height="15rem"
        :src="require('~/assets/img/fakelab_card_sample.png')"
      />
      <v-card-title>Kubeflow 발만 담가보기</v-card-title>
      <v-card-text>
        본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.<br />
        <a>
          <span class="mr-3">최근 게시글:</span>
          xxxxxxxxxxxxxxxxxxxxx
        </a>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <footer class="footer">
        <strong>Builder&nbsp;</strong>
        <UserProfile :img-url="require('~/assets/img/test.png')" :width="20" />
        <span class="builder"> 김병조 </span>
        <span class="member ml-auto">
          <v-icon small>mdi-account</v-icon>
          4
        </span>
      </footer>
    </v-card>
  </main>
</template>
<script>
import headMixin from '@/mixins/common/head.js'
import UserProfile from '@/components/common/UserProfile.vue'

export default {
  components: { UserProfile },
  mixins: [headMixin],
  methods: {
    handleBook() {
      // TODO: 페이지 이동 추가(빌더 소개, 스터디, 최근 게시물)
      // TODO: 데이터 바인딩 시키기
    },
  },
  head() {
    return this.getHead({ pageName: 'archive-book' })
  },
}
</script>
<style lang="scss" scoped>
.archive-book {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  align-items: center;

  & .footer {
    padding: 16px 25px;
    display: flex;
    align-items: center;
    font-size: 12px;
  }
}
</style>
