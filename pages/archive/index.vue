<template class="archive-category">
  <main>
    <StaticBoard :static-data="staticData" />
    <section class="archive-category__cards">
      <CategoryCard
        v-for="(info, index) in bookInformation"
        :key="index"
        :category-name="info.categoryName"
        :description="info.description"
        :builder="info.builder"
        :cowriter="info.cowriter"
        :start-date="info.startDate"
        :end-date="info.endDate"
        :color="info.color"
      />
      <CategoryCardMaker
        v-if="isAdmin"
        builder="user1"
        @fetchCategories="fetchCategories"
      />
    </section>
  </main>
</template>
<script>
import headMixin from '@/mixins/common/head.js'
import StaticBoard from '@/components/common/StaticBoard.vue'
import CategoryCard from '@/components/archive/CategoryCard.vue'
import CategoryCardMaker from '@/components/archive/CategoryCardMaker.vue'

// TODO: 사용자 확인 후 카드 생성할 수 있도록 수정
export default {
  components: { StaticBoard, CategoryCard, CategoryCardMaker },
  mixins: [headMixin],
  data() {
    return {
      bookInformation: [],
      staticData: [
        { label: 'in Progress', value: 45 },
        { label: 'in Progress', value: 12 },
        { label: 'Upcoming', value: 10 },
        { label: 'Total Project', value: 67 },
      ],
    }
  },
  computed: {
    isAdmin() {
      return this.$store.state.profile.isAdmin
    },
  },
  async mounted() {
    try {
      await this.fetchCategories()
    } catch (error) {
      // TODO: 추후에 에로 로직 설정
      console.error(error)
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const { data } = await this.$axios.get('/categories')
        this.bookInformation = data
      } catch (error) {
        // TODO: 추후에 에로 로직 설정
      }
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
