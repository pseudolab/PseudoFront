<template>
  <!-- src="/v.png" -->
  <div>
    <v-row>
      <v-col>
        질문 공간
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
      return {
        heads: [
          {
            title: '가짜 연구소 ',
            meta: [
              {
                hid: 'description',
                name: 'description',
                content: 'Home page description'
              }
            ],
          }          
        ]        
      }
    },
  }
</script>
 