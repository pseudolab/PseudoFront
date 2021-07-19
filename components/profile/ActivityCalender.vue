<template>
  <div class="activity-calender">
    <svg
      ref="calender"
      width="500"
      height="150"
      class="activity-calender--calender"
    ></svg>
    <div class="activity-calender--bottom">
      <a href="">Learn how we count contributions.</a>
      <svg ref="palette" width="200" height="15"></svg>
    </div>
  </div>
</template>
<script>
import { ColorPalette } from '@/fixture/profile/activityCalender.js'
export default {
  props: {
    year: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
    calenderDataset: {
      type: Object,
      default: () => ({}),
    },
    maxMonth: {
      type: Number,
      default: 6,
    },
  },
  computed: {
    isLeapYear() {
      if (this.year % 400 === 0) return true
      if (this.year % 100 === 0) return false
      if (this.year % 4 === 0) return true
      return false
    },
  },
  mounted() {
    const { year, isLeapYear, calenderDataset } = this
    const tileSize = 15
    const gap = tileSize + 3

    const calenderContext = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    )
    calenderContext.setAttribute('transform', `translate(40, 20)`)

    // tile click event
    let selectedTile = null
    calenderContext.addEventListener('click', (e) => {
      const { tagName } = e.target
      if (tagName === 'rect') {
        if (selectedTile) {
          selectedTile.classList.remove('active')
        }
        if (selectedTile === e.target) {
          selectedTile = null
          calenderContext.classList.remove('opacity')
        } else {
          calenderContext.classList.add('opacity')
          selectedTile = e.target
          selectedTile.classList.add('active')
        }
      }
    })
    this.$refs.calender.appendChild(calenderContext)

    const dayStringSet = ['Mon', 'Wed', 'Fri']
    const monthStringSet = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const monthDayCntSet = [
      31,
      isLeapYear ? 29 : 28,
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ]

    function makeDataDate(month, day) {
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      return `${year}-${month}-${day}`
    }

    const endMonth = new Date().getMonth() + 1
    const beginMonth =
      endMonth - this.maxMonth + 1 <= 1 ? 1 : endMonth - this.maxMonth + 1
    let curMonth = beginMonth
    let curMonthIdx = 0
    const firstMonthDay = new Date(
      `${monthStringSet[beginMonth - 1]} 1, ${year}`
    ).getDay()
    let curDate = 1
    const firstOffset = firstMonthDay
    const lastOffset = new Date().getDay()
    const dateAcc = [0]
    for (let i = beginMonth; i <= endMonth; ++i) {
      const pre = dateAcc[dateAcc.length - 1]
      const cur = monthDayCntSet[i - 1]
      dateAcc.push(pre + cur)
    }
    const totalDateCnt = dateAcc[dateAcc.length - 2] + new Date().getDate()
    const totalWeekCnt = Math.floor(totalDateCnt / 7)

    function makeWeekTile(col, startOffset = 0, endOffset = 6) {
      const weekTile = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      )
      weekTile.setAttribute('transform', `translate(${gap * col}, 0)`)
      for (let i = startOffset; i <= endOffset; i++) {
        const tile = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'rect'
        )

        tile.setAttribute('width', tileSize)
        tile.setAttribute('height', tileSize)
        tile.setAttribute('x', 0)
        tile.setAttribute('y', gap * i)
        tile.setAttribute('rx', 2)
        const curFullDate = makeDataDate(curMonth, curDate)
        tile.setAttribute('data-date', curFullDate)
        if (calenderDataset[curFullDate]) {
          const interval = Math.ceil(100 / ColorPalette.length)
          let step = Math.floor((calenderDataset[curFullDate] - 1) / interval)
          if (step >= ColorPalette.length) {
            step = ColorPalette.length - 1
          }
          const tileColor = ColorPalette[step]
          tile.setAttribute('fill', tileColor)
        } else {
          tile.setAttribute('fill', '#E8E7E7')
        }

        curDate += 1
        if (curDate > monthDayCntSet[curMonth - 1]) {
          curMonth += 1
          curDate = 1
        }
        weekTile.appendChild(tile)
      }
      return weekTile
    }

    function addTextSVG(string, x, y) {
      const textSVG = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'text'
      )
      textSVG.setAttribute('transform', `translate(${x}, ${y})`)
      textSVG.textContent = string
      return textSVG
    }

    // render day text
    dayStringSet.forEach((val, idx) => {
      calenderContext.appendChild(addTextSVG(val, -20, 22 + idx * 28))
    })

    for (let i = 0; i <= totalWeekCnt; i++) {
      // render Month text
      const curAccTile = (i + 1) * 7 - firstOffset
      if (curAccTile > dateAcc[curMonthIdx]) {
        calenderContext.appendChild(
          addTextSVG(monthStringSet[curMonthIdx + beginMonth - 1], i * gap, -10)
        )
        curMonthIdx += 1
      }

      // render Tile
      if (i === 0) {
        calenderContext.appendChild(makeWeekTile(i, firstOffset))
      } else if (i === totalWeekCnt) {
        calenderContext.appendChild(makeWeekTile(i, 0, lastOffset))
      } else {
        calenderContext.appendChild(makeWeekTile(i, 0, 6))
      }
    }
    this.$refs.palette.appendChild(addTextSVG('LESS', 0, 9))
    for (let i = 0; i < ColorPalette.length; i++) {
      const tile = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'rect'
      )
      tile.setAttribute('width', tileSize)
      tile.setAttribute('height', tileSize)
      tile.setAttribute('fill', ColorPalette[i])
      tile.setAttribute('x', gap * i + 30)
      tile.setAttribute('y', 0)

      this.$refs.palette.appendChild(tile)
    }
    this.$refs.palette.appendChild(
      addTextSVG('MORE', gap * ColorPalette.length + 35, 9)
    )
  },
}
</script>
<style lang="scss">
.activity-calender {
  padding: 30px 10px;
  background-color: white;
  &--calender {
    & text {
      font-size: 9px;
      text-anchor: start;
      fill: #333;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    & .opacity {
      & rect {
        opacity: 0.5;
      }
    }
    & rect {
      cursor: pointer;
      &.active {
        opacity: 1;
      }
    }
  }
  &--bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 40px;
    a {
      color: #0077a3;
      text-decoration: none;
      font-size: 10px;
    }
    & text {
      font-size: 9px;
      text-anchor: start;
      fill: #333;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
  }
}
</style>
