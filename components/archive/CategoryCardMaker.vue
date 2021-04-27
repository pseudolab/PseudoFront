<template class="category-card-maker">
  <div>
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
          @click.stop="() => (showProgressBar = !showProgressBar)"
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
        <div v-if="!showProgressBar" />
      </template>
      <template #footer-rd-corner="{ changeTone }">
        <v-btn
          class="white--text font-weight-bold mr-2"
          x-small
          :color="changeTone(0)"
          @click.stop="() => (isAppending = false)"
          @mousedown.stop=""
          @touchstart.stop=""
          >취소</v-btn
        >
        <v-btn
          class="white--text font-weight-bold"
          x-small
          :color="changeTone(0)"
          @click.stop="() => (isAppending = false)"
          @mousedown.stop=""
          @touchstart.stop=""
          >생성</v-btn
        >
      </template>
    </CategoryCardLayOut>
  </div>
</template>
<script>
export default {
  props: {
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
    isAppending: true,
    showProgressBar: false,
    newbookInformation: {
      url: null,
      title: '',
      description: '',
    },
    picker: null,
  }),
  methods: {
    handleBook() {
      console.log('book clicked')
    },
  },
}
</script>
<style lang="scss" scoped>
.plus-card {
  overflow: hidden;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
}
.title {
  font-size: 24px;
  font-weight: 700;
}
.description {
  font-size: 16px;
}
</style>
