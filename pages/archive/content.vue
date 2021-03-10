<template>
  <section class="archive-content">
    <aside>
      <h1>Kubeflow 발만 담가보기</h1>
      <v-text-field
        class="px-1 mb-3"
        prepend-inner-icon="mdi-magnify"
        placeholder="검색어를 입력하세요"
        color="primary"
      />
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
    </aside>
    <main>
      <article>
        <h1>Complex Sentence</h1>
        <div v-for="(contentInfo, index) in contentList" :key="index">
          <h2 v-if="contentInfo.title">{{ contentInfo.title }}</h2>
          <h2 v-else>{{ contentInfo }}</h2>
          <p>
            Complex Sentence Generator is a free content rewriter that can
            potentially rephrase, reword, paraphrase and/or rewrite sentences,
            paragraphs, articles, content, words and/or phrases into a more
            complex, unorthodox or convoluted alternative while delivering the
            same meaning. The vocabulary of this sentence paraphraser contains
            an abundance of rarely used words/phrases and can paraphrase
            sentences in a variety of ways that are chosen randomly. Aside from
            this web based software being used as a paraphrasing tool or a text
            spinner, it can also be used as a vocabulary improvement tool. The
            artificial intelligence of this paraphrase generator is so
            sophisticated that it is capable of understanding context. Use the
            dictionary or thesaurus to learn definitions for words or discover
            more synonyms.
          </p>
        </div>
      </article>
      <aside class="describtion">
        <nav v-show="true" class="content-nav ma-2">
          <ol v-for="(contentInfo, index) in contentList" :key="index">
            <div v-if="typeof contentInfo === 'object'">
              <li>
                <nuxt-link to="/">
                  {{ contentInfo.title }}
                </nuxt-link>
              </li>
              <li
                v-for="title in contentInfo.innerTitle"
                v-show="true"
                :key="title"
              >
                <nuxt-link to="/">
                  {{ title }}
                </nuxt-link>
              </li>
            </div>
            <li v-else>
              <nuxt-link to="/">
                {{ contentInfo }}
              </nuxt-link>
            </li>
          </ol>
        </nav>
      </aside>
    </main>
  </section>
</template>
<script>
export default {
  data: () => ({
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
      'Gallery of Jupyter Books ',
      'MyST cheat sheet',
      'The command-line interface',
      'Glossary',
      'Cite Jupyter Book',
      'Change log',
    ],
    contentList: [
      {
        title: 'The Jupyter Book command-line interface',
        innerTitle: ['What is interface', 'How can use interface brilliantly'],
      },
      'The book building process',
      'Anatomy of a Jupyter Book',
      {
        title: 'Create a template book',
        innerTitle: ['Error situation', 'Optional attributes'],
      },
      'Create a template book',
      'Next step: build your book',
    ],
  }),
}
// TODO: 왼쪽 nav와 오른쪽 컨텐츠의 scroll 분리를 위해 height를 고정시켜야함 - 전체 nav 디자인 수정 후 작업
</script>
<style lang="scss">
.container {
  max-width: 1400px;
}
</style>
<style lang="scss" scoped>
.archive-content {
  display: grid;
  grid-template-columns: 1fr 4fr;
  & > aside {
    padding: 30px 10px 10px 10px;
  }
  & main {
    padding: 30px 10px 10px 10px;
    display: grid;
    grid-template-columns: 3fr 1fr;

    & article {
      flex-grow: 1;
    }
    .content-nav {
      & li:not(:last-child),
      & > ol:not(:last-child) {
        margin-bottom: 5px;
      }
      & li {
        border-left: 2px blue solid;
        padding-left: 5px;
      }
    }
  }
  & ol {
    padding: 0;
  }
  & li {
    list-style-type: none;
    & a {
      color: #333;
    }
  }
  & .classified {
    margin-bottom: 20px;
  }
}
</style>
