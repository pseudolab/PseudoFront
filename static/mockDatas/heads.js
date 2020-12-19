// head() {
//     return {
//       title: this.title,
//       meta: [
//         {
//           hid: 'description',
//           name: 'description',
//           content: 'Home page description'
//         }
//       ]
//     }
//   }

const htmlAttrs = {
  // 주 언어 명시
  lang: 'ko-KR',
  dir: 'ltr'
}

export default {
    main: {
        title: 'pseudo lab',
        htmlAttrs: htmlAttrs,
        meta: [
          { charset: 'utf-8' },
          {
            hid: 'google-site-verification',
            name: 'google-site-verification',
            content: 'dal5FRLPcu0fGm0RyDRg0anjcOwJhLRvEROdf0ZpHNQ'
          }
        ]        
    },   
    community: {
        title: '가짜 연구소 커뮤니티 페이지',
        htmlAttrs: htmlAttrs,
        meta: [
          { charset: 'utf-8' },
          {
            hid: '가짜 연구소 커뮤니티 페이지 hid',
            name: '가짜 연구소 커뮤니티 페이지 name',
            content: '가짜 연구소 커뮤니티 페이지 content'
          }
        ]        
    },   
    query: {
        title: '가짜 연구소 질문 페이지',
        htmlAttrs: htmlAttrs,
        meta: [
          { charset: 'utf-8' },
          {
            hid: '가짜 연구소 질문 페이지 hid',
            name: '가짜 연구소 질문 페이지 name',
            content: '가짜 연구소 질문 페이지 content'
          }
        ]        
    },   
    queryId:{
        title: '가짜 연구소 질문 개별 페이지',
        htmlAttrs: htmlAttrs,
        meta: [
          { charset: 'utf-8' },
          {
            hid: '가짜 연구소 질문 개별 페이지 hid',
            name: '가짜 연구소 질문 개별 페이지 name',
            content: '가짜 연구소 질문 개별 페이지 content'
          }
        ]        
    },   
}