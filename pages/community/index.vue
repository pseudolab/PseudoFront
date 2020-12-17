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
  export default {
    components: {
      TextEditor,
    },
    data () {
      return {}
    },
  }
</script>
 