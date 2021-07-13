<template>
  <section class="archive-content">
    <LeftDrawer class="main">
      <template #aside>
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
        <article v-html="content"></article>
      </template>
    </LeftDrawer>
    <TableOfContents ref="toc" :content="content" :show-toc="showToc" />
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
    let headerIdIndex = 0
    let replacedConstent = contentMockData
      .replace(/<h2/g, `<h2 id="toc-000"`)
      .replace(/<h3/g, `<h3 id="toc-000"`)
    let startIndex = replacedConstent.indexOf('toc-000')
    while (startIndex >= 0) {
      const indexStr = String(headerIdIndex)
      headerIdIndex++
      replacedConstent =
        replacedConstent.substring(0, startIndex + 7 - indexStr.length) +
        indexStr +
        replacedConstent.substring(startIndex + 7)
      startIndex = replacedConstent.indexOf('toc-000', startIndex + 1)
    }
    this.content = replacedConstent
  },
  methods: {
    handleResize() {
      this.tocWidth = this.$refs.toc.clientWidth
    },
  },
}
</script>
<style lang="scss">
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
</style>
<style lang="scss" scoped>
.archive-content {
  display: flex;
  & .main {
    flex: 0 0 80%;
    margin: 0 auto;
  }
}
</style>
