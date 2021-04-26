<template>
  <main class="archive-category">
    <StaticBoard :static-data="staticData" />
    <section class="archive-category__cards">
      <CategoryCard
        v-for="(
          {
            title,
            briefDescription,
            builder,
            builderProfileImg,
            numberMember,
            startDate,
            endDate,
            progress,
            color,
          },
          index
        ) in bookInformation"
        :key="index"
        :title="title"
        :brief-description="briefDescription"
        :builder="builder"
        :builder-profile-img="builderProfileImg"
        :number-member="numberMember"
        :start-date="startDate"
        :end-date="endDate"
        :progress="progress"
        :color="color"
      />
      <v-card
        v-if="isAppending"
        class="mr-5 mb-5 d-flex flex-column category-card"
      >
        <input
          ref="uploader"
          type="file"
          class="d-none"
          @change="uploadImage"
        />
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
          <v-btn small outlined color="black" @click.stop="fetchBook"
            >생성</v-btn
          >
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
    </section>
  </main>
</template>
<script>
import headMixin from '@/mixins/common/head.js'
import StaticBoard from '@/components/common/StaticBoard.vue'
import CategoryCard from '@/components/archive/CategoryCard.vue'

export default {
  components: { StaticBoard, CategoryCard },
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
          title: 'Kubeflow 발만 담가보기',
          briefDescription: `Kubeflow를 통한 ML 학습, 배포 및 관리`,
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          startDate: new Date(),
          endDate: new Date(),
          progress: 84,
          color: [255, 0, 0],
        },
        {
          title: 'Kubeflow 발만 담가보기',
          briefDescription: `글자수열자를세기위함글자수열자를세기위함`,
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          startDate: new Date(),
          progress: 84,
          color: [255, 144, 144],
        },
        {
          title: 'Kubeflow 발만 담가보기',
          briefDescription: `글자수열자를세기위함글자수열자를세기위함`,
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          startDate: new Date(),
          endDate: new Date(),
          progress: 84,
          color: [0, 0, 0],
        },
        {
          title: 'Kubeflow 발만 담가보기',
          briefDescription: `글자수열자를세기위함글자수열자를세기위함`,
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          startDate: new Date(),
          endDate: new Date(),
          progress: 84,
          color: [255, 255, 255],
        },
        {
          title: 'Kubeflow 발만 담가보기',
          briefDescription: `Kubeflow를 통한 ML 학습, 배포 및 관리`,
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          startDate: new Date(),
          endDate: new Date(),
          progress: 84,
          color: [13, 178, 48],
        },
        {
          title: 'Kubeflow 발만 담가보기',
          briefDescription: `Kubeflow를 통한 ML 학습, 배포 및 관리`,
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          startDate: new Date(),
          endDate: new Date(),
          progress: 84,
          color: [131, 48, 133],
        },
        {
          title: 'Kubeflow 발만 담가보기',
          briefDescription: `Kubeflow를 통한 ML 학습, 배포 및 관리`,
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          startDate: new Date(),
          endDate: new Date(),
          progress: 84,
          color: [13, 148, 133],
        },
        {
          title: 'Kubeflow 발만 담가보기',
          briefDescription: 'Kubeflow를 통한 ML 학습, 배포 및 관리',
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          startDate: new Date(),
          endDate: new Date(),
          progress: 84,
          color: [13, 12, 133],
        },
        {
          title: 'Kubeflow 발만 담가보기',
          briefDescription: `Kubeflow를 통한 ML 학습, 배포 및 관리`,
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          startDate: new Date(),
          endDate: new Date(),
          progress: 84,
          color: [13, 48, 133],
        },
      ],
      staticData: [
        { label: 'in Progress', value: 45 },
        { label: 'in Progress', value: 12 },
        { label: 'Upcoming', value: 10 },
        { label: 'Total Project', value: 67 },
      ],
      isAppending: false,
    }
  },
  methods: {
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
  &__cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
}
</style>
