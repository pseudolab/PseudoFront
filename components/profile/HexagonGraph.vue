<template>
  <canvas class="hexagon-graph" :width="width" :height="width"></canvas>
</template>
<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300,
    },
    fontSize: {
      type: Number,
      default: 12,
    },
    entries: {
      type: Array,
      default: () => [
        'Post',
        'Vote',
        'Comment',
        'Study Group',
        'Answer',
        'Question',
      ],
    },
    activityScoreDataSet: {
      type: Array,
      default: () => [0, 0, 0, 0, 0, 0],
    },
    fontColor: {
      type: String,
      default: '#333',
    },
    color: {
      type: String,
      default: '#e0e0e0',
    },
    hasAnimation: {
      type: Boolean,
      defualt: false,
    },
  },
  mounted() {
    const ctx = this.$el.getContext('2d')
    const {
      width,
      fontSize,
      entries,
      activityScoreDataSet,
      hasAnimation,
    } = this

    const { calcPointPosition, calcInnerPointPosition } = this
    ctx.font = `${fontSize}px Arial`
    if (entries.length !== 6 || activityScoreDataSet.length !== 6) {
      return console.warn('hexagonGraph component needs six entry.')
    }
    if (activityScoreDataSet.some((val) => val > 100)) {
      return console.warn(
        "hexagonGraph component's activityScoreDataSet values must be less than 100."
      )
    }
    const maxDataVal = activityScoreDataSet.reduce(
      (acc, cur) => (acc < cur ? cur : acc),
      0
    )
    const space =
      entries.reduce((acc, cur) => {
        const curTextWidth = ctx.measureText(cur).width
        if (acc < curTextWidth) return curTextWidth
        return acc
      }, 0) + 5
    const sideLen = (width - 2 * space) / Math.sqrt(3)
    const pointPositions = calcPointPosition(space, sideLen)
    const quaterPointPositions = calcInnerPointPosition(
      sideLen,
      Array(6).fill(25)
    )
    const halfPointPositions = calcInnerPointPosition(
      sideLen,
      Array(6).fill(50)
    )
    const threeQuaterPointPositions = calcInnerPointPosition(
      sideLen,
      Array(6).fill(75)
    )

    const curVal = hasAnimation ? 0 : maxDataVal
    this.render(
      sideLen,
      pointPositions,
      quaterPointPositions,
      halfPointPositions,
      threeQuaterPointPositions,
      maxDataVal,
      curVal
    )
  },
  methods: {
    render(
      sideLen,
      pointPositions,
      quaterPointPositions,
      halfPointPositions,
      threeQuaterPointPositions,
      maxDataVal,
      curVal
    ) {
      const ctx = this.$el.getContext('2d')
      const { width, entries, activityScoreDataSet, color, fontColor } = this
      const { calcInnerPointPosition } = this
      ctx.clearRect(0, 0, width, width)
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, width, width)
      // draw outline
      ctx.fillStyle = '#E9EFF1'
      ctx.strokeStyle = '#737373'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(pointPositions[0][0], pointPositions[0][1])
      for (let i = 1; i < 6; i++) {
        const [x, y] = pointPositions[i]
        ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // draw text
      ctx.fillStyle = fontColor
      const textState = [
        {
          textAlign: 'center',
          textBaseline: 'bottom',
          paddingX: 0,
          paddingY: -5,
        },
        {
          textAlign: 'left',
          textBaseline: 'middle',
          paddingX: 10,
          paddingY: 0,
        },
        {
          textAlign: 'left',
          textBaseline: 'middle',
          paddingX: 10,
          paddingY: 0,
        },
        { textAlign: 'center', textBaseline: 'top', paddingX: 0, paddingY: 5 },
        {
          textAlign: 'right',
          textBaseline: 'middle',
          paddingX: -10,
          paddingY: 0,
        },
        {
          textAlign: 'right',
          textBaseline: 'middle',
          paddingX: -10,
          paddingY: 0,
        },
      ]
      pointPositions.forEach(([x, y], idx) => {
        ctx.textAlign = textState[idx].textAlign
        ctx.textBaseline = textState[idx].textBaseline
        ctx.fillText(
          entries[idx],
          textState[idx].paddingX + x,
          textState[idx].paddingY + y
        )
      })

      const innerPointPositions = calcInnerPointPosition(
        (sideLen / 100) * 95,
        activityScoreDataSet.map((val) => (val > curVal ? curVal : val))
      )
      // fill inner graph
      ctx.beginPath()
      ctx.moveTo(innerPointPositions[0][0], innerPointPositions[0][1])
      ctx.fillStyle = color
      for (let i = 1; i < 6; i++) {
        const [x, y] = innerPointPositions[i]
        ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
      ctx.stroke()

      // draw innerline
      pointPositions.forEach(([x, y]) => {
        ctx.beginPath()
        ctx.moveTo(width / 2, width / 2)
        ctx.lineTo(x, y)
        ctx.stroke()
      })

      ctx.beginPath()
      ctx.moveTo(quaterPointPositions[0][0], quaterPointPositions[0][1])
      for (let i = 1; i < 6; i++) {
        const [x, y] = quaterPointPositions[i]
        ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(halfPointPositions[0][0], halfPointPositions[0][1])
      for (let i = 1; i < 6; i++) {
        const [x, y] = halfPointPositions[i]
        ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(
        threeQuaterPointPositions[0][0],
        threeQuaterPointPositions[0][1]
      )
      for (let i = 1; i < 6; i++) {
        const [x, y] = threeQuaterPointPositions[i]
        ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.stroke()

      if (maxDataVal > curVal)
        window.requestAnimationFrame(
          this.render.bind(
            this,
            sideLen,
            pointPositions,
            quaterPointPositions,
            halfPointPositions,
            threeQuaterPointPositions,
            maxDataVal,
            curVal + 1
          )
        )
    },
    calcInnerPointPosition(sideLen, activityScoreDataSet) {
      const sqrt3 = Math.sqrt(3)
      const { width } = this
      const [originX, originY] = [width / 2, width / 2]
      const datasetsRate = activityScoreDataSet.map(
        (val) => sideLen * (val / 100)
      )
      return [
        [originX, originY - datasetsRate[0]],
        [
          originX + (datasetsRate[1] / 2) * sqrt3,
          originY - datasetsRate[1] / 2,
        ],
        [
          originX + (datasetsRate[2] / 2) * sqrt3,
          originY + datasetsRate[2] / 2,
        ],
        [originX, originY + datasetsRate[3]],
        [
          originX - (datasetsRate[4] / 2) * sqrt3,
          originY + datasetsRate[4] / 2,
        ],
        [
          originX - (datasetsRate[5] / 2) * sqrt3,
          originY - datasetsRate[5] / 2,
        ],
      ]
    },
    calcPointPosition(space, sideLen) {
      const { width } = this
      return [
        [width / 2, width / 2 - sideLen],
        [width - space, width / 2 - sideLen / 2],
        [width - space, width / 2 + sideLen / 2],
        [width / 2, width / 2 + sideLen],
        [space, width / 2 + sideLen / 2],
        [space, width / 2 - sideLen / 2],
      ]
    },
  },
}
</script>
<style lang="scss" scoped></style>
