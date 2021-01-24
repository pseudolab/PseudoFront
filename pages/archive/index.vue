<template>
  <section class="archive">
    <v-text-field
      prepend-inner-icon="mdi-magnify"
      placeholder="검색어를 입력하세요"
      background-color="white"
      rounded
    />
    <article class="archive--trend">
      <strong>Trending</strong>
      <ChipBoadr :chips="chips" @changeSelectedChips="changeSelectedChips" />
    </article>
    <article class="archive--btn-box">
      <v-btn outlined> 글쓰기 </v-btn>
      <v-btn-toggle mandatory group dense class="archive--btn-box--sort">
        <v-btn>최신순</v-btn>
        <v-btn>추천순</v-btn>
      </v-btn-toggle>
    </article>
    <hr
      :style="{
        border: 'none',
        height: '1px',
        backgroundColor: 'rgb(224,224,224)',
      }"
    />
    <Table :table-data="tableData" :loading="loading" />
  </section>
</template>

<script>
import headMixin from '@/mixins/common/head.js'
import ChipBoadr from '@/components/table/ChipBoadr.vue'
import Table from '@/components/table/Table.vue'
export default {
  components: {
    ChipBoadr,
    Table,
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
<style lang="scss">
.archive {
  &--trend {
    padding: 0 24px;
    display: flex;
    align-items: center;
  }
  &--btn-box {
    display: flex;
    justify-content: space-between;
    & .v-btn--active > .v-btn__content {
      color: #000;
    }
    & .v-btn:not(.v-btn--text):not(.v-btn--outlined).v-btn--active:before {
      opacity: 0;
    }
  }
}
</style>
