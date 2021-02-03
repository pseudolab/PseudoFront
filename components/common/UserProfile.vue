<template>
  <svg :width="width" :height="width" viewBox="0 0 100 100">
    <clipPath id="clip-circle">
      <circle cx="50" cy="50" r="33" />
    </clipPath>
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="#dddddd"
      stroke-width="5"
      fill="#fff"
    />
    <path
      class="exp"
      :d="drawArc({ x: 50, y: 50, radius: 40, degree: exp })"
      :stroke="expColor"
      :stroke-width="strokeWidth"
      fill="transparent"
    />
    <path
      class="remain-exp"
      :d="drawArc({ x: 50, y: 50, radius: 40, degree: remainExp }, exp)"
      :stroke="makePaleColor(expColor)"
      :stroke-width="strokeWidth"
      fill="transparent"
    />
    <image
      id="user-profile-img"
      :href="imgUrl"
      alt="icon img"
      width="100%"
      height="100%"
      clip-path="url(#clip-circle)"
    />
  </svg>
</template>
<script>
// NOTE: 300개 이상으로 사용시 page 전환 할 때 조금 시간이 소요됨
/*
props:
  exp, remainExp:
    360을 기준으로 각도로 대입해야 한다. 만일
    exp + remainExp 값이 360을 초과할 경우 360까지만 그려지도록 되어있음
*/
import colorStringToHex from '@/fixture/common/colorStringToHex.js'

export default {
  props: {
    imgUrl: {
      // NOTE: 기본 이미지 받아서 기본 defualt에 넣는 작업 필요.
      isRequired: true,
      type: String,
    },
    exp: {
      type: Number,
      default: 0,
    },
    remainExp: {
      type: Number,
      default: 0,
    },
    width: {
      type: Number,
      default: 100,
    },
    expColor: {
      type: String,
      default: '#e0e0e0',
    },
    strokeWidth: {
      type: Number,
      default: 5,
    },
    isAnimation: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (!this.isAnimation) {
      return
    }
    const pathes = [...this.$el.getElementsByTagName('path')]
    pathes.reduce((acc, element) => {
      const pathLength = Math.ceil(element.getTotalLength())
      element.style.strokeDasharray = pathLength
      element.style.strokeDashoffset = pathLength
      element.animate(
        [{ strokeDashoffset: pathLength }, { strokeDashoffset: 0 }],
        {
          delay: acc,
          duration: 1000,
          fill: 'forwards',
        }
      )
      return acc + 1000
    }, 0)
  },
  methods: {
    makeHexToString(colorStr) {
      return colorStringToHex[colorStr]
    },
    makePaleColor(color) {
      if (!color) {
        return
      }
      if (color[0] !== '#') {
        color = this.makeHexToString(color)
      }
      return color + 'ad'
    },
    drawArc(props, startDegree = 0) {
      const { radius, degree } = props
      startDegree = startDegree > 359.99 ? 359.99 : startDegree
      const startCoord = this.getCoordsOnCircle({
        ...props,
        degree: startDegree,
      })
      props.degree =
        props.degree + startDegree > 359.99
          ? 359.99
          : props.degree + startDegree
      const finishCoord = this.getCoordsOnCircle(props)
      const isLargeArc = degree > 180 ? 1 : 0

      const d = `M ${startCoord.x} ${startCoord.y}
       A ${radius} ${radius} 0 ${isLargeArc} 1 ${finishCoord.x} ${finishCoord.y} `
      return d
    },
    getCoordsOnCircle({ x, y, radius, degree }) {
      const radian = ((degree + 90) / 180) * Math.PI
      return {
        x: x - radius * Math.cos(radian),
        y: y - radius * Math.sin(radian),
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
