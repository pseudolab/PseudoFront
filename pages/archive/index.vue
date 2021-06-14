<template class="archive-category">
  <main>
    <StaticBoard :static-data="staticData" />
    <section class="archive-category__cards">
      <CategoryCard
        v-for="(info, index) in bookInformation"
        :key="index"
        :title="info.title"
        :description="info.description"
        :builder="info.builder"
        :builder-profile-img="info.builderProfileImg"
        :number-member="info.numberMember"
        :start-date="info.startDate"
        :end-date="info.endDate"
        :progress="info.progress"
        :color="info.color"
      />
      <CategoryCardMaker
        :builder-profile-img="require('~/assets/img/test.png')"
        builder="user1"
      />
    </section>
  </main>
</template>
<script>
import headMixin from '@/mixins/common/head.js'
import StaticBoard from '@/components/common/StaticBoard.vue'
import CategoryCard from '@/components/archive/CategoryCard.vue'
import CategoryCardMaker from '@/components/archive/CategoryCardMaker.vue'

export default {
  components: { StaticBoard, CategoryCard, CategoryCardMaker },
  mixins: [headMixin],
  data() {
    return {
      newbookInformation: {
        url: null,
        title: '',
        description: '',
      },
      bookInformation: [
        {
          title: 'Kubeflow 발만 담가보기1',
          description: `Kubeflow를 통한 ML 학습, 배포 및 관리`,
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
          description: `글자수열자를세기위함글자수열자를세기위함`,
          builder: '김병조',
          builderProfileImg: require('~/assets/img/test.png'),
          numberMember: 4,
          startDate: new Date(),
          progress: 84,
          color: [255, 144, 144],
        },
        {
          title: 'Kubeflow 발만 담가보기',
          description: `글자수열자를세기위함글자수열자를세기위함`,
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
          description: `글자수열자를세기위함글자수열자를세기위함`,
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
          description: `Kubeflow를 통한 ML 학습, 배포 및 관리`,
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
          description: `Kubeflow를 통한 ML 학습, 배포 및 관리`,
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
          description: `Kubeflow를 통한 ML 학습, 배포 및 관리`,
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
          description: 'Kubeflow를 통한 ML 학습, 배포 및 관리',
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
          description: `Kubeflow를 통한 ML 학습, 배포 및 관리`,
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
    fetchBook() {
      // TODO: 서버와 연동하여 새로운 스터디 생성하기
      this.newbookInformation = {
        url: null,
        title: '',
        description: '',
      }
      this.isAppending = false
      console.log('fetch book')
    },
  },
  head() {
    return this.getHead({ pageName: 'archive' })
  },
}
</script>
<style lang="scss" scoped>
.archive-category {
  &__cards {
    width: 100%;
    display: grid;
    justify-content: space-between;
    padding: 0 auto;
    grid-template-columns: repeat(auto-fit, 350px);
    @media screen and (max-width: 755px) {
      grid-template-columns: 100%;
    }
    gap: 30px;
  }
}
</style>
