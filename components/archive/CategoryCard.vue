<template class="category-card">
  <CategoryCardLayOut
    :color="decimalColor"
    :builder="builder"
    @cardClicked="handleBook"
  >
    <!-- <button
      class="pre-season season"
      @click.stop="fetchPreSeason"
      @mousedown.stop=""
      @touchstart.stop=""
    />
    <button
      class="next-season season"
      @click.stop="fetchNextSeason"
      @mousedown.stop=""
      @touchstart.stop=""
    /> -->
    <template #icon="{ changeTone }">
      <v-btn
        icon
        :color="changeTone(0)"
        @click.stop="popModal"
        @mousedown.stop=""
        @touchstart.stop=""
      >
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </template>
    <template #period>
      <h6>
        {{ startDate }} -
        <span v-if="endDate">
          {{ endDate }}
        </span>
        <span v-else> ing </span>
      </h6>
    </template>
    <template #title>
      <h1>{{ categoryName }}</h1>
    </template>
    <template #description>
      <p>
        {{ description }}
      </p>
    </template>
    <template #footer-rd-corner>
      <span class="member">
        <v-icon small>mdi-account</v-icon>
        {{ numberMember }}
      </span>
    </template>
  </CategoryCardLayOut>
</template>
<script>
import CategoryCardLayOut from '@/components/archive/CategoryCardLayOut.vue'
export default {
  components: { CategoryCardLayOut },
  props: {
    categoryName: { type: String, required: true },
    description: { type: String, required: true },
    builder: { type: String, required: true },
    // builderProfileImg: { type: String, required: true }, //TODO: 추후 추가
    cowriter: { type: Array, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, default: null },
    // progress: { type: Number, required: true }, //TODO: 추후 추가
    color: {
      type: String,
      required: true,
    },
  },
  computed: {
    numberMember() {
      return this.cowriter.length + 1
    },
    decimalColor() {
      const { color } = this
      const r = parseInt(`0x${[...color].slice(1, 3).join('')}`)
      const g = parseInt(`0x${[...color].slice(3, 5).join('')}`)
      const b = parseInt(`0x${[...color].slice(5, 7).join('')}`)
      return [r, g, b]
    },
  },
  methods: {
    popModal() {
      console.log('modal pop-up')
    },
    fetchPreSeason() {
      console.log('pre season')
    },
    fetchNextSeason() {
      console.log('next season')
    },
    handleBook() {
      // TODO: 페이지 이동 추가(빌더 소개, 스터디, 최근 게시물)
      // TODO: 데이터 바인딩 시키기
      console.log('book clicked')
    },
  },
}
</script>
<style lang="scss" scoped>
.category-card {
  & .member {
    display: flex;
    justify-content: center;
  }
  & .season {
    height: 10px;
    width: 100%;
    position: absolute;
    background-color: rgb(201, 201, 201);
    left: 0;
    z-index: 3;
    &:hover {
      background-color: rgb(228, 228, 228);
    }
  }
  & .pre-season {
    top: 0;
  }
  & .next-season {
    bottom: 0;
  }
}
</style>
