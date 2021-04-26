<template>
  <v-card
    :style="colorVariable"
    class="category-card pa-4 pointer"
    rounded="xl"
    @click="handleBook"
  >
    <h6>{{ recentlyUpdate | moment('ll') }}</h6>
    <v-btn
      class="pop-up-btn"
      icon
      :color="changeTone(0)"
      @click.prevent.stop="popModal"
      @mousedown.stop=""
      @touchstart.stop=""
    >
      <v-icon>mdi-information-outline</v-icon>
    </v-btn>
    <div class="text-center my-9">
      <h1>{{ title }}</h1>
      <p>
        {{ briefDescription }}
      </p>
    </div>
    <h3>Progress</h3>
    <progress max="100" :value="progress" />
    <footer>
      <strong>Builder&nbsp;</strong>
      <UserProfile :img-url="builderProfileImg" :width="20" />
      <span class="builder"> {{ builder }} </span>
      <span class="member ml-auto">
        <v-icon small>mdi-account</v-icon>
        {{ numberMember }}
      </span>
    </footer>
  </v-card>
</template>
<script>
// TODO: 카드 이동 애니메이션 추가하기
// TODO: 모달창 제작
// TODO: 카드 생성할때 사용할 카드 컴포넌트 추가
import UserProfile from '@/components/common/UserProfile.vue'

export default {
  components: { UserProfile },
  props: {
    title: { type: String },
    briefDescription: { type: String },
    builder: { type: String },
    builderProfileImg: { type: String },
    numberMember: { type: Number },
    recentlyUpdate: { type: Date },
    progress: { type: Number },
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
    },
  },
  computed: {
    colorVariable() {
      return {
        '--color': this.changeTone(0),
        '--bg-color': this.isDeep()
          ? this.changeTone(-30)
          : this.changeTone(150),
        '--p-bg-color': this.isDeep() ? '#efefef' : '#fff',
      }
    },
  },
  methods: {
    isDeep() {
      const [red, green, blue] = this.color
      if (red + green + blue > 400) {
        return true
      }
      return false
    },
    changeTone(level) {
      return this.color.reduce((acc, cur) => {
        let colorCode = cur + level
        if (colorCode < 0) colorCode = 0
        if (colorCode > 255) colorCode = 255
        colorCode = colorCode.toString(16)
        if (colorCode.length < 2) {
          colorCode = '0' + colorCode
        }
        return acc + colorCode
      }, '#')
    },
    handleBook() {
      // TODO: 페이지 이동 추가(빌더 소개, 스터디, 최근 게시물)
      // TODO: 데이터 바인딩 시키기
      console.log('book clicked')
    },
    popModal() {
      console.log('modal pop-up')
    },
  },
}
</script>
<style lang="scss" scoped>
.category-card {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 300px;

  background-color: var(--bg-color);
  & .pop-up-btn {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  & progress {
    width: 100%;
    position: relative;
    -webkit-appearance: none;
    height: 7px;
    &::-webkit-progress-bar {
      border-radius: 7px;
      background-color: var(--p-bg-color);
    }
    &::-webkit-progress-value {
      border-radius: 7px;
      background-color: var(--color);
    }
    &::after {
      content: attr(value) '%';
      font-weight: bold;
      position: absolute;
      right: 0;
    }
  }
  & footer {
    width: 100%;
    border-top: thin solid var(--p-bg-color);
    padding: 16px 25px;
    display: flex;
    align-items: center;
    font-size: 12px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  & .pointer {
    cursor: pointer;
  }
}
</style>
