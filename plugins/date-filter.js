import Vue from 'vue'

Vue.filter('dayAgo', (val) => {
  val /= 1000
  if (val < 60) return `${Math.floor(val)}초`
  val /= 60
  if (val < 60) return `${Math.floor(val)}분`
  val /= 60
  if (val < 24) return `${Math.floor(val)}시간`
  val /= 24
  if (val < 30) return `${Math.floor(val)}일`
  val /= 30
  if (val < 12) return `${Math.floor(val)}개월`
  val /= 12
  return `${Math.floor(val)}년`
})
