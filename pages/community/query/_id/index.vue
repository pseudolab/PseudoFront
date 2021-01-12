<template>
  <div>page by id</div>
</template>

<script>
import headMixin from '@/mixins/common/head.js'
export default {
  mixins: [headMixin],
  data() {
    return {
      title: 'Temp Title',
      category: 'Temp Category',
      content: 'Temp Contetn',
    }
  },
  head() {
    return this.getHead({
      pageName: 'indivisual',
      title: this.title,
      category: this.category,
      content: this.content,
    })
  },
}
</script>
