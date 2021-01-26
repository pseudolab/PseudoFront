<template>
  <section class="archive">
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      placeholder="검색어를 입력하세요"
      background-color="white"
      rounded
    />
    <article class="archive--trend d-flex align-center px-6">
      <strong>Trending</strong>
      <ChipBoadr :chips="chips" @changeSelectedChips="changeSelectedChips" />
    </article>
    <v-btn outlined> 글쓰기 </v-btn>
    <div class="d-flex">
      <Table
        :table-data="tableData"
        :loading="loading"
        class="flex-grow-1 mr-3"
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
      chips: [
        { name: 'Levdfa', isSelected: false },
        { name: 'Rucode', isSelected: false },
        { name: 'bubule', isSelected: false },
      ],

      tableData: [
        {
          info: {
            title: 'TabNet 논문 리뷰',
            likes: 17,
            comments: 5,
            quotations: 2,
            date: Date.now(),
            badges: ['Levdfa', 'Rucode'],
          },
          writer: {
            icon: 'test3.png',
            name: 'Duck',
            level: 99,
            exp: 30,
            accumulation: 50,
          },
          contributer: [
            {
              icon: 'test3.png',
              name: 'Duck',
              level: 99,
              exp: 30,
              accumulation: 50,
            },
            {
              icon: 'test3.png',
              name: 'Duck2',
              level: 99,
              exp: 30,
              accumulation: 50,
            },
            {
              icon: 'test3.png',
              name: 'Duck3',
              level: 99,
              exp: 30,
              accumulation: 50,
            },
          ],
        },
        {
          info: {
            title: 'TabNet 논문 리뷰',
            likes: 17,
            comments: 5,
            quotations: 2,
            date: Date.now(),
            badges: ['Levdfa', 'Rucode', 'bubule'],
          },
          writer: {
            icon: 'test3.png',
            name: 'Duck',
            level: 99,
            exp: 90,
            accumulation: 50,
          },
        },
      ],
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
