<template>
  <!-- src="/v.png" -->
  <v-row>
    <v-col>
      <text-editor />
    </v-col>
  </v-row>
</template>
 
<script>
  import TextEditor from "@/components/api/quil/TextEditor.vue"
  export default {
    components: {
      TextEditor
    },
    data () {
      return {
        
      }
    },
  }
</script>
 
