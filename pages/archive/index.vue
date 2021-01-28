<template>
  <section class="archive">
    <v-autocomplete
      class="px-15 mb-3"
      prepend-inner-icon="mdi-magnify"
      :items="subjectCategory"
      placeholder="검색어를 입력하세요"
      background-color="white"
      rounded
      solo
      :hide-details="true"
      flat
    />
    <article class="archive--trend d-flex align-center px-15 mb-4">
      <strong>Trending</strong>
      <ChipBoadr :chips="chips" @changeSelectedChips="changeSelectedChips" />
    </article>
    <v-btn class="archive__write-btn font-weight-bold" outlined> 글쓰기 </v-btn>
    <div class="d-flex">
      <Table
        :table-data="tableData"
        :loading="loading"
        class="flex-grow-1 mr-5"
      />
      <RankBoard />
    </div>
  </section>
</template>

<script>
import headMixin from '@/mixins/common/head.js'
import ChipBoadr from '@/components/common/ChipBoadr.vue'
import Table from '@/components/common/Table.vue'
import RankBoard from '@/components/common/RankBoard.vue'

// mock data
import archiveTableData from '@/mock/archive/archiveTableData.js'
import subjectCategoryData from '@/mock/subjectCategoryData.js'

export default {
  components: {
    ChipBoadr,
    Table,
    RankBoard,
  },
  mixins: [headMixin],
  data() {
    return {
      // TODO: fixture로 빼야 함 - 나중에 api로 받아올 부분
      loading: false,
      chips: subjectCategoryData.map((subject) => ({
        name: subject,
        isSelected: false,
      })),
      subjectCategory: subjectCategoryData,
      tableData: archiveTableData,
    }
  },
  methods: {
    changeSelectedChips(chips) {
      this.chips.forEach((_, idx) => {
        if (chips.findIndex((val) => val === idx) !== -1) {
          this.chips[idx].isSelected = true
        } else {
          this.chips[idx].isSelected = false
        }
      })
      // TODO: selected chip을 api에 어떻게 보내줄지 결정한 후 작업.
    },
  },
  head() {
    return this.getHead({ pageName: 'main' })
  },
}
</script>
<style lang="scss" scoped>
.archive {
  &__write-btn {
    background-color: white !important;
  }
}
</style>
