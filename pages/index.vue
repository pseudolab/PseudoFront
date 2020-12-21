<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        Main Page
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // TODO: MIXIN으로 부터 통합 필요.
  head () {
    return {
      title: 'pseudo lab',
      htmlAttrs: {
        // 주 언어 명시
        lang: 'ko-KR',
        dir: 'ltr'
      },
      meta: [
        { charset: 'utf-8'},
        {
          hid: 'google-site-verification',
          name: 'google-site-verification',
          content: 'dal5FRLPcu0fGm0RyDRg0anjcOwJhLRvEROdf0ZpHNQ'
        },
        {
          hid: 'naver-site-verification',
          name: 'naver-site-verification',
          content: 'd957f2cee00f0423b89dc47efa113ba5f83a9c2f'
        }        
      ]    
    }
  },
  data() {
    return {
      pageName: 'main'
    }
  }
}
</script>
