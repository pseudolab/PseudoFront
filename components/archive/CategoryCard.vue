<template class="category-card">
  <CategoryCardLayOut
    :color="color"
    :progress="progress"
    :builder-profile-img="builderProfileImg"
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
        {{ startDate | moment('ll') }} -
        <span v-if="endDate">
          {{ endDate | moment('ll') }}
        </span>
        <span v-else> ing </span>
      </h6>
    </template>
    <template #title>
      <h1>{{ title }}</h1>
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
    title: { type: String, required: true },
    description: { type: String, required: true },
    builder: { type: String, required: true },
    builderProfileImg: { type: String, required: true },
    numberMember: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, default: null },
    progress: { type: Number, required: true },
    color: {
      type: Array,
      validator: ([red, green, blue]) => {
        function validNumber(value) {
          if (
            value !== undefined &&
            Number.isInteger(value) &&
            value >= 0 &&
            value <= 255
          ) {
            return true
          }
          return false
        }
        if (validNumber(red) && validNumber(green) && validNumber(blue)) {
          return true
        }
        return false
      },
      required: true,
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
