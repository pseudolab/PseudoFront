<template>
  <div class="category-card-maker">
    <v-card
      v-if="!isAppending"
      class="plus-card"
      rounded="xl"
      @click="() => (isAppending = true)"
    >
      &plus;
    </v-card>
    <CategoryCardLayOut
      v-else
      :color="color"
      :progress="50"
      :builder-profile-img="builderProfileImg"
      :builder="builder"
      @cardClicked="() => (isAppending = isAppending)"
    >
      <template #icon="{ changeTone }">
        <v-btn
          icon
          :color="changeTone(0)"
          @click.stop="togglePalete"
          @mousedown.stop=""
          @touchstart.stop=""
        >
          <v-icon> mdi-palette </v-icon>
        </v-btn>
      </template>
      <template #title="{ changeTone }">
        <v-text-field
          v-model="newbookInformation.title"
          class="title mx-3 mb-4"
          hide-details
          dense
          height="36px"
          placeholder="스터디 명"
          :color="changeTone(0)"
          @click.stop=""
          @keydown.stop=""
          @mousedown.stop=""
          @touchstart.stop=""
        />
      </template>
      <template #description="{ changeTone }">
        <v-text-field
          v-model="newbookInformation.description"
          hide-details
          dense
          placeholder="간략한 설명"
          class="description mx-3"
          :color="changeTone(0)"
          :height="24"
          @click.stop=""
          @keydown.stop=""
          @mousedown.stop=""
          @touchstart.stop=""
        >
        </v-text-field>
      </template>
      <template #progress>
        <div v-if="!showColorPicker" />
      </template>
      <template #footer-rd-corner="{ changeTone }">
        <v-btn
          class="white--text font-weight-bold mr-2"
          x-small
          :color="changeTone(0)"
          @click.stop="cancleCard"
          @mousedown.stop=""
          @touchstart.stop=""
          >취소</v-btn
        >
        <v-btn
          class="white--text font-weight-bold"
          x-small
          :color="changeTone(0)"
          @click.stop="fetchCard"
          @mousedown.stop=""
          @touchstart.stop=""
          >생성</v-btn
        >
      </template>
    </CategoryCardLayOut>
    <v-color-picker
      v-show="showColorPicker"
      v-model="picker"
      canvas-height="100px"
      width="300px"
      class="color-picker no-alpha"
      hide-inputs
    ></v-color-picker>
  </div>
</template>
<script>
export default {
  props: {
    builderProfileImg: {
      type: String,
      required: true,
    },
    builder: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isAppending: false,
    showColorPicker: false,
    newbookInformation: {
      url: null,
      title: '',
      description: '',
    },
    picker: { rgba: { a: 1, b: 0, g: 0, r: 255 } },
  }),
  computed: {
    color() {
      const { rgba } = this.picker
      return [rgba.r, rgba.g, rgba.b]
    },
  },
  methods: {
    handleBook() {
      console.log('book clicked')
    },
    appendCard() {
      this.isAppending = true
    },
    fetchCard() {
      this.isAppending = false
      this.showColorPicker = false
      // NOTE: 서버와 연동 추가
    },
    cancleCard() {
      this.isAppending = false
      this.showColorPicker = false
    },
    togglePalete() {
      this.showColorPicker = !this.showColorPicker
    },
  },
}
</script>
<style lang="scss">
.category-card-maker
  .no-alpha
  .v-color-picker__controls
  .v-color-picker__preview
  .v-color-picker__sliders {
  .v-color-picker__hue {
    margin-bottom: 0;
  }
  .v-color-picker__alpha {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.category-card-maker {
  position: relative;
  & .plus-card {
    overflow: hidden;
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 100px;
  }
  & .title {
    font-size: 24px;
    font-weight: 700;
  }
  & .description {
    font-size: 16px;
  }
  & .color-picker {
    position: absolute;
    transform: translateY(-105%);
    top: 0;
    right: 10px;
  }
}
</style>
