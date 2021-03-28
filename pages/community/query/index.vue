<template>
  <!-- src="/v.png" -->
  <div>
    <v-row justify="center">
      <v-col cols="1">
        <v-list id="sections">
          <v-subheader>Sections</v-subheader>
          <v-list-item v-for="(section, i) in sections" :key="i">
            <v-list-item-content @click="goSect(section)">
              <v-list-item-title v-text="section.id"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col cols="10">
        <query-form ref="qForm" />
      </v-col>
      <v-col cols="1" />
    </v-row>
  </div>
</template>

<script>
import headMixin from '@/mixins/common/head.js'
import QueryForm from '@/components/input/QueryForm.vue'
export default {
  components: {
    QueryForm,
  },
  mixins: [headMixin],
  data() {
    return {
      sections: [],
    }
  },
  computed: {
    sectionIds() {
      return this.sections.map((obj) => obj.id)
    },
  },
  mounted() {
    document.addEventListener('updateSections', this.updateSections)
  },
  methods: {
    updateSections() {
      console.log('updateSections')
      const txtArea = document.getElementById('txtArea')
      const idElements = txtArea.querySelectorAll("*[id]:not([id=''])")
      idElements.forEach((el) => {
        if (!this.sectionIds.includes(el.id)) {
          this.addSection(el.id)
        }
      })
    },
    addSection(id) {
      this.sections.push({ id })
    },
    goSect(section) {
      const id = section.id
      const txt = document.getElementById(id)
      if (txt.scrollIntoView) {
        txt.scrollIntoView({ block: 'start' })
      }
    },
  },
  head() {
    return this.getHead({ pageName: 'query' })
  },
}
</script>
<style lang="scss">
#sections {
  position: fixed;
  background-color: $p-b-grey;
  left: 5%;
}
</style>
