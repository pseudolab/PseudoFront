<template>
  <section class="archive-content">
    <LeftDrawer class="main">
      <template #aside>
        <v-btn
          v-if="false"
          color="light-blue lighten-1"
          class="archive-content-enroll"
        >
          아카이브 참여하기
        </v-btn>
        <v-btn
          v-else
          color="light-blue lighten-1"
          class="archive-content-enroll"
          @click="enrollDialog = true"
        >
          아카이브 참여 인원 관리
        </v-btn>
        <nav>
          <ol v-for="(pageInfo, index) in pageList" :key="index">
            <div v-if="typeof pageInfo === 'object'" class="classified">
              <h3>{{ pageInfo.subject }}</h3>
              <li v-for="title in pageInfo.titleList" :key="title">
                <nuxt-link v-slot="{ href, navigate }" to="/">
                  <a :href="href" @click="navigate">{{ title }}</a>
                </nuxt-link>
              </li>
            </div>
            <li v-else>
              <nuxt-link to="/">
                {{ pageInfo }}
              </nuxt-link>
            </li>
          </ol>
        </nav>
      </template>
      <template #content>
        <article class="content" v-html="content"></article>
      </template>
    </LeftDrawer>
    <TableOfContents
      ref="toc"
      :content="content"
      :show-toc="showToc"
      :h2toc="h2toc"
      :h3toc="h3toc"
      @clickedH3toc="clickedH3toc"
      @clickedH2toc="clickedH2toc"
    />
    <v-dialog
      v-model="enrollDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card>
        <v-toolbar dark color="point">
          <v-btn icon dark @click="enrollDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>아카이브 참여 인원 관리</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="enrollDialog = false"> Save </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>참여 승인 관리</v-subheader>
          <v-list-item v-for="(val, index) in 5" :key="index">
            <v-list-item-action>
              <v-btn color="point" text> 승인 </v-btn>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>이름</v-list-item-title>
              <v-list-item-subtitle> 사용자 간단 정보 </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>멤버 목록</v-subheader>
          <v-list-item v-for="(val, index) in 5" :key="index">
            <v-list-item-content>
              <v-list-item-title>이름</v-list-item-title>
              <v-list-item-subtitle> 사용자 간단 정보 </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </section>
</template>
<script>
import contentMockData from '@/mock/archive/content.js'
import LeftDrawer from '@/components/common/LeftDrawer.vue'
import TableOfContents from '@/components/archive/TableOfContents.vue'

export default {
  components: { LeftDrawer, TableOfContents },
  data: () => ({
    content: '',
    // TODO: 좌측 테이블 구현 방식 변경
    pageList: [
      {
        subject: 'GET STARTED',
        titleList: [
          'Overview',
          'Build your book',
          'Publish your book online',
          'Configure book settings',
          'Table of contents structure',
          'Types of content source files',
        ],
      },
      {
        subject: 'WRITE BOOK CONTENT',
        titleList: [
          'MyST Markdown overview',
          'Special content blocks',
          'References and citations',
          'Math and equations',
          'Images and figures',
          'Control the page layout',
          'Execute and cache your pages',
          'Formatting code outputs',
        ],
      },
      {
        subject: 'MAKE YOUR BOOK INTERACTIVE',
        titleList: [
          'Launch buttons for interactivity',
          'Hide or remove content',
          'Interactive data visualizations',
          'Commenting and annotating',
        ],
      },
      {
        subject: 'ADVANCED AND MISCELLANEOUS',
        titleList: [
          'PDFs for your book',
          'Custom Sphinx configuration',
          'How-to and FAQ',
          'Contribute to Jupyter Book',
        ],
      },
    ],
    tocWidth: 0,
    h2toc: '',
    h3toc: '',
    tocClicked: false,
    enrollDialog: false,
  }),
  computed: {
    showToc() {
      if (this.tocWidth < 135) {
        return false
      }
      return true
    },
  },
  mounted() {
    global.addEventListener('resize', this.handleResize)
    this.handleResize()
    let replacedConstent = contentMockData
      .replace(/<h2/g, `<h2 id="toc-00-000"`)
      .replace(/<h3/g, `<h3 id="toc-00-000"`)
    let startIndex = replacedConstent.indexOf('toc-00-000')
    let parentIdIndex = 0
    let childIdIndex = 0
    while (startIndex >= 0) {
      const type = replacedConstent[startIndex - 6]
      if (type === '2') {
        ++parentIdIndex
        childIdIndex = 0
      } else {
        ++childIdIndex
      }
      const parentStr = this.zeroPrefix(String(parentIdIndex), 2)
      const childStr = this.zeroPrefix(String(childIdIndex), 3)
      replacedConstent =
        replacedConstent.substring(0, startIndex + 4) +
        parentStr +
        '-' +
        childStr +
        replacedConstent.substring(startIndex + 10)
      startIndex = replacedConstent.indexOf('toc-00-000', startIndex + 1)
    }
    this.content = replacedConstent
    const observerOption = { rootMargin: '0px 0px -80% 0px' }
    const h3Observe = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting & !this.tocClicked) {
          const parent = entry.target.id.slice(4, 6)
          this.h3toc = entry.target.id
          if (this.h2toc.slice(4, 6) > parent) {
            this.h2toc = `toc-${parent}-000`
          }
        }
      }
      this.tocClicked = false
    }, observerOption)
    const h2Observe = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting & !this.tocClicked) {
          const parent = entry.target.id.slice(4, 6)
          this.h2toc = entry.target.id
          if (this.h3toc.slice(4, 6) > parent) {
            this.h3toc = `toc-${parent}-001`
          }
        }
      }
      this.tocClicked = false
    }, observerOption)
    this.$nextTick(() => {
      const conentEl = this.$el.querySelector('.content')
      conentEl.querySelectorAll('h2').forEach((el) => {
        h2Observe.observe(el)
      })
      conentEl.querySelectorAll('h3').forEach((el) => {
        h3Observe.observe(el)
      })
    })
  },
  methods: {
    handleResize() {
      this.tocWidth = this.$refs.toc.clientWidth
    },
    clickedH3toc(id) {
      this.tocClicked = true
      this.h3toc = id
      const parent = id.slice(4, 6)
      this.h2toc = `toc-${parent}-000`
    },
    clickedH2toc(id) {
      this.tocClicked = true
      this.h2toc = id
      const parent = id.slice(4, 6)
      this.h3toc = `toc-${parent}-001`
    },
    zeroPrefix(str, len) {
      while (str.length < len) {
        str = '0' + str
      }
      return str
    },
  },
}
</script>
<style lang="scss">
.archive-content {
  h1 {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1rem;
  }
  h2,
  h3 {
    padding-top: 10rem;
    margin-top: -10rem;
  }
}
</style>
<style lang="scss" scoped>
.archive-content {
  display: flex;
  & .main {
    flex: 0 0 90%;
  }
}
</style>
