<template>
  <div>
    page by id
  </div>
</template>

<script>
import heads from "@/static/mockDatas/heads.js"
export default {
  head() {
    const head = heads.queryId
    const id = this.$route.params.id
    head.title += id
    head.meta.push(
          {
            hid: '가짜 연구소 질문 개별 페이지 hid !!!!!!!' + id,
            name: '가짜 연구소 질문 개별 페이지 name' + id, 
            content: '가짜 연구소 질문 개별 페이지 content + id'
          }      
    )
    return head
  },
}
</script>
