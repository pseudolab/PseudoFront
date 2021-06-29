<template>
  <div class="category-card-maker">
    <v-card
      v-if="!isAppending"
      class="plus-card"
      rounded="xl"
      @click="
        () => {
          isAppending = true
        }
      "
    >
      &plus;
    </v-card>
    <CategoryCardLayOut
      v-else
      :color="color"
      :progress="50"
      :builder-profile-img="builderProfileImg"
      :builder="builder"
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
          v-model="newbookInformation.categoryName"
          class="categoryName mx-3 mb-4"
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
          @click.stop="
            () => {
              isAppending = false
              showColorPicker = false
            }
          "
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
    <color-picker
      v-show="showColorPicker"
      class="color-picker no-alpha"
      :palette="pallete"
      @pick-color="pickColor"
    />
  </div>
</template>
<script>
import ColorPicker from './ColorPicker.vue'

export default {
  components: { ColorPicker },
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
      categoryName: '',
      description: '',
      cowriter: [], // TODO: 기능 추가
    },
    color: [0, 0, 0],
    pallete: [
      '#b3b2be',
      '#b2ade6',
      '#caa5e4',
      '#e19cdb',
      '#e3a0bb',
      '#e2a49d',
      '#d5ad71',
      '#adbc20',
      '#78c742',
      '#50cb5c',
      '#48c895',
      '#58c2cd',
      '#98b5e0',
    ],
  }),
  methods: {
    handleBook() {
      console.log('book clicked')
    },
    async fetchCard() {
      try {
        const data = {
          ...this.newbookInformation,
          builder: 'builder', // TODO: 현재 사용자 정보로 설정
          // builderProfileImg: '', // TODO: 현재 사용자 이미지로 설정
          startDate: this.$moment().format('YYYY-MM-DD'), // TODO: 양식 맞추기
          endDate: this.$moment().format('YYYY-MM-DD'),
          // progress: 0,
          color: this.color.reduce((acc, cur) => {
            let hex = cur.toString(16)
            if (hex.length === 1) {
              hex = `0${hex}`
            }
            return acc + hex
          }, '#'),
        }
        const res = await this.$axios({
          method: 'post',
          url: '/routes/categories',
          data,
        })
        if (res.status !== 200) {
          throw new Error(`get ${res.status}`)
        }
      } catch (error) {
        // TODO: 추후에 에로 로직 설정
        console.error(error)
        window.alert('서버 에러')
      } finally {
        this.$emit('fetchCategories', false)
        this.showColorPicker = false
        this.isAppending = false
      }
    },
    togglePalete() {
      this.showColorPicker = !this.showColorPicker
    },
    pickColor(color) {
      this.color = color
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
  & .categoryName {
    font-size: 24px;
    font-weight: 700;
  }
  & .description {
    font-size: 16px;
  }
}
</style>
