import { typeValidationMixin } from './validations.js' 
export default {
  mixins: [typeValidationMixin],
  methods: {
    getHead ({ pageName, title = null, category = null, content = null }) {
      if (!this.validStr(pageName)) {
        return {} 
      } else if (pageName === 'indivisual') {
        [title, category, content].forEach((k) => {
          if (!this.validStr(k)) {
            console.log(`개별 페이지인 경우 메타 태그가 존재 해야만 합니다. key: ${k} page: ${pageName}`)
            return {}
          }
        })
        const meta = general('indivisual')
        meta.title = title
        meta.meta.push({
          hid: this.$route.params.id,
          name: category,
          content
        })
        return meta
      } else {
        return general(pageName)
      }
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
      title: '가짜 연구소 pseudo lab',
      htmlAttrs,
      meta: [
        { charset: charSet },
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
    case 'community': return {
      title: '가짜 연구소 커뮤니티 페이지',
      htmlAttrs,
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
      htmlAttrs,
      meta: [
        { charset: charSet },
        {
          hid: '가짜 연구소 질문 페이지 hid',
          name: '가짜 연구소 질문 페이지 name',
          content: '가짜 연구소 질문 페이지 content'
        }
      ]        
    }
    case 'indivisual': return {
      title: null,
      htmlAttrs,
      meta: [
        { charset: charSet },
      ]        
    }    
    default: console.log(`Not Matched ${pageName} in general switch`)
  }
}
