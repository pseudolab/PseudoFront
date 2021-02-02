<template>
  <svg width="800" height="120" class="activity-calender"></svg>
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

    const calenderContext = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'g'
    )
    calenderContext.setAttribute('transform', `translate(20, 20)`)

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
    this.$el.appendChild(calenderContext)

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
    const dateAcc = monthDayCntSet.reduce(
      (acc, cur, idx) => {
        const pre = acc[idx]
        acc.push(pre + cur)
        return acc
      },
      [0]
    )

    const firstOffset = new Date(`January 1, ${year}`).getDay()
    const lastOffset = isLeapYear ? firstOffset + 1 : firstOffset
    function makeDataDate(month, day) {
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      return `${year}-${month}-${day}`
    }

    let curMonth = 1
    let curDate = 1
    function makeWeekTile(col, startOffset = 0, endOffset = 6) {
      const weekTile = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'g'
      )
      weekTile.setAttribute('transform', `translate(${14 * col}, 0)`)
      for (let i = startOffset; i <= endOffset; i++) {
        const tile = document.createElementNS(
          'http://www.w3.org/2000/svg',
          'rect'
        )

        tile.setAttribute('width', 10)
        tile.setAttribute('height', 10)
        tile.setAttribute('x', 0)
        tile.setAttribute('y', 14 * i)
        tile.setAttribute('rx', 2)
        const curFullDate = makeDataDate(curMonthIdx, curDate)
        tile.setAttribute('data-date', curFullDate)
        if (calenderDataset[curFullDate]) {
          const gap = Math.ceil(100 / ColorPalette.length)
          const tileColor =
            ColorPalette[Math.floor(calenderDataset[curFullDate] / gap)]
          tile.setAttribute('fill', tileColor)
        } else {
          tile.setAttribute('fill', '#d0d0d0')
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

    let curMonthIdx = 0
    for (let i = 0; i <= 52; i++) {
      // render Month text
      const curAccTile = (i + 1) * 7 - firstOffset
      if (curAccTile > dateAcc[curMonthIdx]) {
        calenderContext.appendChild(
          addTextSVG(monthStringSet[curMonthIdx], i * 14, -10)
        )
        curMonthIdx += 1
      }

      // render Tile
      if (i === 0) {
        calenderContext.appendChild(makeWeekTile(i, firstOffset))
      } else if (i === 52) {
        calenderContext.appendChild(makeWeekTile(i, 0, lastOffset))
      } else {
        calenderContext.appendChild(makeWeekTile(i, 0, 6))
      }
    }
  },
}
</script>
<style lang="scss">
.activity-calender {
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
</style>
