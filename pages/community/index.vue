<template>
  <!-- src="/v.png" -->
  <div>
    <v-row>
      <v-col>
        <text-editor />
      </v-col>
    </v-row>
  </div>
</template>
 
<script>
import TextEditor from "@/components/api/quil/TextEditor.vue"
import heads from "@/static/mockDatas/heads.js"
export default {
  head() {
    return heads.community
  },
  components: {
    TextEditor,
  },
  data () {
    return {}
  },
}
</script>
 