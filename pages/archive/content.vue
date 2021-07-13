<template>
  <section class="archive-content">
    <LeftDrawer class="main">
      <template #aside>
        <nav>
          <ol v-for="(pageInfo, index) in pageList" :key="index">
            <div v-if="typeof pageInfo === 'object'" class="classified">
              <h3>{{ pageInfo.subject }}</h3>
              <li v-for="title in pageInfo.titleList" :key="title">
                <nuxt-link to="/">
                  {{ title }}
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
    <aside ref="toc" class="toc">
      <nav v-show="showToc">
        <ol v-for="(pageInfo, index) in pageList" :key="index">
          <div v-if="typeof pageInfo === 'object'" class="classified">
            <h3>{{ pageInfo.subject }}</h3>
            <li v-for="title in pageInfo.titleList" :key="title">
              <nuxt-link to="/">
                {{ title }}
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
    </aside>
  </section>
</template>
<script>
import contentMockData from '@/mock/archive/content.js'
import LeftDrawer from '@/components/common/LeftDrawer.vue'

export default {
  components: { LeftDrawer },
  data: () => ({
    content: contentMockData,
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
</style>
<style lang="scss" scoped>
.archive-content {
  display: flex;
  & .main {
    flex: 0 0 80%;
    margin: 0 auto;
  }
  & .toc {
    border-left: 1px solid #e0e0e0;
    position: absolute;
    right: 10px;
    padding-left: 15px;
    max-height: calc(100vh - 94px);
    width: 15%;
    overflow-wrap: break-word;
    overflow: auto;
  }
}
</style>
