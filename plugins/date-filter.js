import Vue from 'vue'

Vue.filter('dayAgo', (val) => {
  val /= 1000
  if (val < 60) return `${Math.floor(val)}초 전`
  val /= 60
  if (val < 60) return `${Math.floor(val)}분 전`
  val /= 60
  if (val < 24) return `${Math.floor(val)}시간 전`
  val /= 24
  if (val < 30) return `${Math.floor(val)}일 전`
  val /= 30
  if (val < 12) return `${Math.floor(val)}개월 전`
  val /= 12
  return `${Math.floor(val)}년 전`
})
