<template>
  <section class="profile d-flex my-15 justify-space-between">
    <UserInfo />
    <div class="flex-grow-1 ml-5">
      <v-chip-group class="mb-5" mandatory @change="changeSelectedMenu">
        <v-chip
          v-for="(name, idx) in profileMenues"
          :key="name"
          class="ms-2"
          label
          :outlined="!(idx === selectedMenuIdx)"
          color="primary"
        >
          {{ name }}
        </v-chip>
      </v-chip-group>
      <Summary v-if="selectedMenuIdx === 0" />
      <Table
        v-else-if="selectedMenuIdx === 1"
        :table-data="tableData"
        :loading="loading"
        @changeSortType="changeSortType"
        @changePage="changePage"
      />
    </div>
  </section>
</template>
<script>
import headMixin from '@/mixins/common/head.js'
import UserInfo from '@/components/profile/UserInfo.vue'
import Summary from '@/components/profile/Summary.vue'
import Table from '@/components/common/Table.vue'

// mock data
import archiveTableData from '@/mock/archive/archiveTableData.js'

export default {
  components: {
    UserInfo,
    Summary,
    Table,
  },
  mixins: [headMixin],
  data() {
    return {
      profileMenues: ['Summary', 'Posts', 'Q & A', 'Rank', 'Bookmarks'],
      selectedMenuIdx: 0,
      tableData: archiveTableData,
      loading: false,
    }
  },

  methods: {
    changeSelectedMenu(idx) {
      this.selectedMenuIdx = idx
    },
    changeSortType(type) {
      // TODO: sortType 관련 항목 설정
      this.sortType = type
    },
    changePage(idx) {
      // TODO: pageIdx 관련 항목 설정
      this.pageIdx = idx
    },
  },
  head() {
    return this.getHead({ pageName: 'profile' })
  },
}
</script>
<style lang="scss" scoped></style>
