<template>
  <aside class="toc">
    <nav v-show="showToc">
      <ol>
        <li
          v-for="{ style, id, label, type } in pageList"
          :key="id"
          :style="style"
          :class="{ impress: id === `#${h2toc}` || id === `#${h3toc}` }"
          @click="clickedtoc(type, id)"
        >
          <a :href="id"> {{ label }} </a>
        </li>
      </ol>
    </nav>
  </aside>
</template>
<script>
export default {
  props: {
    showToc: {
      type: Boolean,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    h2toc: {
      type: String,
      required: true,
    },
    h3toc: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    gap: { 2: 0, 3: 30 },
  }),
  computed: {
    pageList() {
      const headerTags = this.extractHeaderTag(this.content)
      const tocList = this.makeArrayToc(headerTags)
      if (tocList === null) {
        return []
      }
      return tocList
    },
  },
  methods: {
    extractHeaderTag(content) {
      const matches = content.matchAll(
        /<h([2-3]) id="(toc-[0-9]{2}-[0-9]{3})">(.*)<\/h[2-3]>/g
      )
      const headerTag = []
      for (const match of matches) {
        headerTag.push({
          type: match[1],
          id: `#${match[2]}`,
          label: match[3],
        })
      }
      return headerTag
    },
    makeArrayToc(headerTag) {
      return headerTag?.map(({ type, id, label }) => {
        return {
          label,
          id,
          style: { marginLeft: `${this.gap[type]}px` },
          type,
        }
      })
    },
    clickedtoc(type, id) {
      if (type === '3') {
        this.$emit('clickedH3toc', id.slice(1))
        return
      }
      this.$emit('clickedH2toc', id.slice(1))
    },
  },
}
</script>
<style lang="scss" scoped>
.toc {
  @media screen and (max-width: 768px) {
    display: none;
  }
  background-color: white;
  border-left: 1px solid #e0e0e0;
  position: absolute;
  right: 10px;
  padding-left: 15px;
  max-height: calc(100vh - 94px);
  width: 20%;
  overflow-wrap: break-word;
  overflow: auto;
  li {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    color: grey;
  }
  .impress > a {
    color: #2b14b3;
    transform: scale(1.3);
  }
}
</style>
