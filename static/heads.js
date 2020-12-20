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

import { primitiveRules } from "@/static/validations.js"

export const metaMixin = {
  /*
  1. 모든 페이지는 pageName 데이터를 반환 해야 합니다
  2. 만약 개별 페이지인 경우 메타 태그들 'title', 'category', 'content' 이 존재 해야만 합니다.  
  */
  head() {
    const pName = this.pageName
    if (primitiveRules.str(pName)) {
      alert("Page Name for Meta Tag is Required")
      return {}
    } else if (pName === 'indivisual') {
      let meta = general('indivisual')
      ['title', 'category', 'content'].forEach(k => {
        if (!primitiveRules.str(this[k])) {
          return alert("만약 개별 페이지인 경우 메타 태그가 존재 해야만 합니다.")
        }
      })
      meta.title = this.title
      meta.meta.push({
        hid: this.$route.params.id,
        name: this.category,
        content: this.content
      })
      return meta
    } else {
      return general(pName)
    }
  }
}

const htmlAttrs = {
  // 주 언어 명시
  lang: 'ko-KR',
  dir: 'ltr'
}
const charSet = 'utf-8'


const general = (pageName) => {
  switch (pageName) {
    case 'main': return {
      title: 'pseudo lab',
      htmlAttrs: htmlAttrs,
      meta: [
        { charset: charSet},
        {
          hid: 'google-site-verification',
          name: 'google-site-verification',
          content: 'dal5FRLPcu0fGm0RyDRg0anjcOwJhLRvEROdf0ZpHNQ'
        }
      ]    
    }
    case 'community': return {
      title: '가짜 연구소 커뮤니티 페이지',
      htmlAttrs: htmlAttrs,
      meta: [
        { charset: charSet },
        {
          hid: '가짜 연구소 커뮤니티 페이지 hid',
          name: '가짜 연구소 커뮤니티 페이지 name',
          content: '가짜 연구소 커뮤니티 페이지 content'
        }
      ]       
    }
    case 'query': return {
      title: '가짜 연구소 질문 페이지',
      htmlAttrs: htmlAttrs,
      meta: [
        { charset: charSet},
        {
          hid: '가짜 연구소 질문 페이지 hid',
          name: '가짜 연구소 질문 페이지 name',
          content: '가짜 연구소 질문 페이지 content'
        }
      ]        
    }
    case 'indivisual': return {
      title: null,
      htmlAttrs: htmlAttrs,
      meta: [
        { charset: charSet},
      ]        
    }    
    default: console.log(`Not Matched ${pageName} in general switch`)
  }
}
