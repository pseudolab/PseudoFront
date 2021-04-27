<template>
  <v-card
    :style="colorVariable"
    class="category-card pa-4"
    rounded="xl"
    @click="cardClicked"
  >
    <div class="icon">
      <slot name="icon" :changeTone="changeTone"></slot>
    </div>
    <slot name="period"></slot>
    <div class="text-center my-9">
      <slot name="title" :changeTone="changeTone"></slot>
      <slot name="description" :changeTone="changeTone"></slot>
    </div>
    <slot name="progress">
      <h3>Progress</h3>
      <progress max="100" :value="progress" />
    </slot>
    <footer>
      <strong>Builder&nbsp;</strong>
      <UserProfile :img-url="builderProfileImg" :width="20" />
      <span class="builder mr-auto"> {{ builder }} </span>
      <slot name="footer-rd-corner" :changeTone="changeTone"></slot>
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
    progress: {
      type: Number,
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
    hasClickEvent: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    colorVariable() {
      return {
        '--color': this.makeColorCode(this.color),
        '--bg-color': this.isPale()
          ? this.changeTone(0.1, true)
          : this.changeTone(0.7),
        '--p-bg-color': this.isPale() ? '#efefef' : '#fff',
      }
    },
  },
  methods: {
    isPale() {
      const [red, green, blue] = this.color
      if (red + green + blue > 600) {
        return true
      }
      return false
    },
    changeTone(level, darkness = false) {
      const direction = darkness ? -1 : 1
      const color = this.color.map((val) => {
        const gap = darkness ? val : 255 - val
        return Math.floor(val + direction * gap * level)
      })
      return this.makeColorCode(color)
    },
    makeColorCode(color) {
      return color.reduce((acc, cur) => {
        let colorCode = cur.toString(16)
        if (colorCode.length < 2) {
          colorCode = '0' + colorCode
        }
        return acc + colorCode
      }, '#')
    },
    cardClicked() {
      this.$emit('cardClicked')
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
  & .icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: var(--color);
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
}
</style>
