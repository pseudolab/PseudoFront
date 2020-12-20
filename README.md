# PseudoFront

## TODO
- 게시글 작성으로 부터 Api 완성 전까지 Store에 임시 저장 (mutation 이용)
    - 후에 커뮤니티 홈으로 부터 게시글 정보 Store로 부터 받아와 리스트 형태 저장
- eslint
- code auto-fix
- create .env files by mode(dev, prod)
- deploy neltify
- simple git action
- 로고, 배너 핸드폰 기종별 사이즈 조사
    - 사이즈별 이미지 요청
- 디자이너님께 작업물 요청
    - REF
        - instagram
            - welovewebdesign
            - uiuxcenter
            - interfacely
            - etc..
    - 소개 페이지
        - [https://dogstudio.co/](https://dogstudio.co/)
        - [https://renaudrohlinger.com](https://renaudrohlinger.com/)
        - [https://dreamhack.io/](https://dreamhack.io/)
    - 가짜연구소용 CSS 제작
        - 컬러별 CSS 컬러 받기
        - 한글 및 영문 폰트

## API 목록

**API 에 사용되는 기능  및 설정사항은 출처 Ref 페이지를 주석으로 남겨주시길 바랍니다.**

- 게시판 기능
    - [https://github.com/surmon-china/vue-quill-editor](https://github.com/surmon-china/vue-quill-editor)
    - [https://quilljs.com/](https://quilljs.com/)

## 특징

- View, Component 가 아닌 로직별로 폴더가 분리 되어 있습니다
    - ex) components/api1/ApiComponent1.vue, mixins/option1.js
    ex) components/api2/Api2Component1.vue, mixins/option1.js
- [https://github.com/seongpil0948/PseudoFront](https://github.com/seongpil0948/PseudoFront)
    - star 는 사랑입니다.

## 컨벤션

- indent: space(2)
- package manager: npm

## Setup Commands

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```