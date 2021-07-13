<template>
  <aside class="toc">
    <nav v-show="showToc">
      <ol>
        <li v-for="{ style, id, label } in pageList" :key="id" :style="style">
          <a :href="id">{{ label }}</a>
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
        /<h([2-3]) id="(toc-[0-9]{3})">(.*)<\/h[2-3]>/g
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
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.toc {
  border-left: 1px solid #e0e0e0;
  position: absolute;
  right: 10px;
  padding-left: 15px;
  max-height: calc(100vh - 94px);
  width: 15%;
  overflow-wrap: break-word;
  overflow: auto;
  li {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    color: grey;
  }
}
</style>
