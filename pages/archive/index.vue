<template>
  <main class="archive-category">
    <v-card
      v-for="(
        {
          imgURL,
          title,
          brief,
          describtion,
          builder,
          builderProfileImg,
          numberMember,
          isBriefly,
        },
        index
      ) in bookInformation"
      :key="index"
      class="mr-5 mb-5 d-flex flex-column category-card"
    >
      <v-img
        class="pointer"
        :alt="title"
        max-height="150px"
        :src="imgURL"
        @click="handleBook"
      />
      <v-card-title class="pointer" @click="handleBook">{{
        title
      }}</v-card-title>
      <v-card-text
        class="flex-grow-1 d-flex flex-column justify-space-between pointer"
        @click="handleBook"
      >
        <p class="description">
          {{ isBriefly ? brief : describtion }}
        </p>
        <div
          v-if="brief"
          class="pointer"
          @click.stop="bookInformation[index].isBriefly = !isBriefly"
        >
          <span v-if="isBriefly">자세히</span>
          <span v-if="!isBriefly">간략히</span>
        </div>
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
      class="mr-5 mb-5 d-flex flex-column category-card"
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
      class="mr-5 mb-5 d-flex justify-center align-center category-card"
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
          describtion: `본 스터디는 Kubernetes 환경에서
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.`,
          // recentPost:
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          isBriefly: false,
        },
        {
          imgURL: require('~/assets/img/fakelab_card_sample.png'),
          title: 'Kubeflow 발만 담가보기',
          describtion: `글자수열자를세기위함글자수열자를세기위함글자수열자를세기위함글자수열자를세기위함글자수열자를세기위함글자수열자를세기위함글자수열자를세기위함글자수열자를세기위함글자수열자를세기위함글자수열자를세기위함`,
          // recentPost:
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          isBriefly: false,
        },
        {
          imgURL: require('~/assets/img/fakelab_card_sample.png'),
          title: 'Kubeflow 발만 담가보기',
          describtion: `본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게 도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
          Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면 좋겠습니다.
          본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게 도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.`,
          brief: `본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게 도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
          Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히`,
          // recentPost:
          builder: '김병조',
          builderProfileImg: null,
          numberMember: 4,
          isBriefly: true,
        },
        {
          imgURL: require('~/assets/img/fakelab_card_sample.png'),
          title: 'Kubeflow 발만 담가보기',
          describtion: `본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.`,
          // recentPost:
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          isBriefly: false,
        },
        {
          imgURL: require('~/assets/img/fakelab_card_sample.png'),
          title: 'Kubeflow 발만 담가보기',
          describtion: `본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게
        도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.
        Kubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면
        좋겠습니다.`,
          // recentPost:
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          isBriefly: false,
        },
        {
          imgURL: require('~/assets/img/fakelab_card_sample.png'),
          title: 'Kubeflow 발만 담가보기',
          describtion:
            '본 스터디는 Kubernetes 환경에서 간단하게 ML 워크플로우를 배포할 수 있게\n도와주는 시스템인 Kubeflow의 기능 및 실습을 목표로 하고 있습니다.\nKubeflow를 통한 ML 학습, 배포 및 관리 등을 함께 익히고, 공유되면\n좋겠습니다.',
          // recentPost:
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          isBriefly: false,
        },
        {
          imgURL: require('~/assets/img/fakelab_card_sample.png'),
          title: 'Kubeflow 발만 담가보기',
          describtion: `1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890`,
          brief: `12345678901234567890123456789012345678901234567890123456789012345678901234567890`,
          // recentPost:
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          isBriefly: true,
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
      // FIXME: 숫자와 문자 글자 크기가 달라 line 수가 다르게 나옴
      const token = this.newbookInformation.describtion.split('\n')
      let counter = 0
      let brief = ``
      token.forEach((val) => {
        const countLine = Math.floor(val.length / 37) + 1
        let i = 0
        while (counter + i <= 3 && i < countLine) {
          brief += val.slice(i * 36, (i + 1) * 36)
          ++i
        }
        if (i > 0) {
          brief += '\n'
        }
        counter += countLine
      })
      console.log(brief)
      this.newbookInformation = {
        url: null,
        title: '',
        brief: counter > 4 ? brief : null,
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
.archive-category {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: minmax(420px, 1fr);
  gap: 30px;
  & .category-card {
    width: 100%;
    height: 100%;
  }
  & .footer {
    padding: 16px 25px;
    display: flex;
    align-items: center;
    font-size: 12px;
  }
  & .pointer {
    cursor: pointer;
    user-select: none;
  }
}
</style>
