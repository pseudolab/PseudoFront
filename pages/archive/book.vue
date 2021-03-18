<template>
  <main class="archive-book">
    <v-card
      v-for="(
        { imgURL, title, text, builder, builderProfileImg, numberMember }, index
      ) in bookInformation"
      :key="index"
      class="mr-5 mb-5 d-flex flex-column"
      width="30rem"
      min-height="420"
      @click="handleBook"
    >
      <v-img max-height="150" :src="imgURL" />
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text class="flex-grow-1 d-flex flex-column justify-space-between">
        <p class="description">
          {{ text }}
        </p>
        <a style="display: block">
          <span class="mr-3">최근 게시글:</span>
          xxxxxxxxxxxxxxxxxxxxx
        </a>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>
      <footer class="footer">
        <strong>Builder&nbsp;</strong>
        <UserProfile :img-url="builderProfileImg" :width="20" />
        <span class="builder"> {{ builder }} </span>
        <span class="member ml-auto">
          <v-icon small>mdi-account</v-icon>
          {{ numberMember }}
        </span>
      </footer>
    </v-card>
    <v-card
      v-if="isAppending"
      class="mr-5 mb-5 d-flex flex-column"
      width="30rem"
      height="420"
    >
      <input ref="uploader" type="file" class="d-none" @change="uploadImage" />
      <v-img
        v-if="newbookInformation.url"
        height="150"
        :src="newbookInformation.url"
      />
      <v-btn
        v-else
        outlined
        height="138"
        style="font-size: 20px"
        class="mx-3 mt-3 text-center"
        @click.stop="onButtonClick"
      >
        <v-icon> mdi-file-image </v-icon>
        upload
      </v-btn>
      <v-text-field
        v-model="newbookInformation.title"
        class="mx-3"
        hide-details
        dense
        placeholder="스터디 명"
      />
      <v-textarea
        v-model="newbookInformation.describtion"
        hide-details
        outlined
        no-resize
        placeholder="간략한 설명"
        class="flex-grow-1 pa-3"
      >
      </v-textarea>
      <v-divider class="mx-4"></v-divider>
      <footer class="text-right" style="padding: 12px 25px">
        <v-btn small outlined color="black" @click.stop="fetchBook">생성</v-btn>
      </footer>
    </v-card>
    <v-card
      v-else
      class="mr-5 mb-5 d-flex justify-center align-center"
      width="30rem"
      height="420"
      style="font-size: 100px"
      @click="() => (isAppending = true)"
    >
      &plus;
    </v-card>
  </main>
</template>
<script>
import headMixin from '@/mixins/common/head.js'
import UserProfile from '@/components/common/UserProfile.vue'

export default {
  components: { UserProfile },
  mixins: [headMixin],
  data() {
    return {
      newbookInformation: {
        url: null,
        title: '',
        describtion: '',
      },
      bookInformation: [
        {
          imgURL: require('~/assets/img/test.png'),
          title: 'Kubeflow 발만 담가보기',
          text: `본 스터디는 Kubernetes 환경에서
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.`,
          // recentPost:
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
        },
        {
          imgURL: require('~/assets/img/fakelab_card_sample.png'),
          title: 'Kubeflow 발만 담가보기',
          text: `본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.`,
          // recentPost:
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
        },
        {
          imgURL: require('~/assets/img/fakelab_card_sample.png'),
          title: 'Kubeflow 발만 담가보기',
          text: `본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.`,
          // recentPost:
          builder: '김병조',
          builderProfileImg: null,
          numberMember: 4,
        },
        {
          imgURL: require('~/assets/img/fakelab_card_sample.png'),
          title: 'Kubeflow 발만 담가보기',
          text: `본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.`,
          // recentPost:
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
        },
        {
          imgURL: require('~/assets/img/fakelab_card_sample.png'),
          title: 'Kubeflow 발만 담가보기',
          text: `본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.`,
          // recentPost:
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
        },
        {
          imgURL: require('~/assets/img/fakelab_card_sample.png'),
          title: 'Kubeflow 발만 담가보기',
          text:
            '본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게\n도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.\nKubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면\n좋겠습니다.',
          // recentPost:
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
        },
        {
          imgURL: require('~/assets/img/fakelab_card_sample.png'),
          title: 'Kubeflow 발만 담가보기',
          text: `본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.`,
          // recentPost:
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
        },
      ],
      isAppending: false,
    }
  },
  methods: {
    handleBook() {
      // TODO: 페이지 이동 추가(빌더 소개, 스터디, 최근 게시물)
      // TODO: 데이터 바인딩 시키기
      console.log('book clicked')
    },
    uploadImage(e) {
      // TODO: 이미지 업로더 작업하시면 할 부분
    },
    fetchBook() {
      // TODO: 서버와 연동하여 새로운 스터디 생성하기
      this.newbookInformation = {
        url: null,
        title: '',
        describtion: '',
      }
      this.isAppending = false
      console.log('fetch book')
    },
    onButtonClick() {
      this.$refs.uploader.click()
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
  align-items: stretch;
  & .description {
    max-height: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  & .footer {
    padding: 16px 25px;
    display: flex;
    align-items: center;
    font-size: 12px;
  }
}
</style>
