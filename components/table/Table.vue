<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    :items-per-page="5"
    class="table"
    :loading="false"
    @click:row="clickRow"
  >
    <template v-slot:[`item.icon`]="{ item }">
      <v-avatar>
        <img :src="require(`~/assets/img/${item.icon}`)" alt="icon img" />
      </v-avatar>
    </template>
    <template v-slot:[`item.medal`]="{ item }">
      <img v-if="item.medal" src="~/assets/img/test2.png" alt="medal img" />
    </template>
    <template v-slot:[`item.weight`]="{ item }">
      <div class="table__weight">
        <div>&#9650;</div>
        <div>
          {{ item.weight }}
        </div>
      </div>
    </template>
    <template v-slot:[`item.info`]="{ item }">
      <div>
        <div>
          {{ item.info.title }}
        </div>
        <v-icon>mdi-thumb-up-outline</v-icon>
        {{ item.info.likes }}
        <v-icon>mdi-comment-processing-outline</v-icon>
        {{ item.info.comments }}
        <v-icon>mdi-format-quote-open-outline</v-icon>
        {{ item.info.quotations }}
        <div>
          {{ calcDayAgo(item.info.date) | dayAgo }}
        </div>
      </div>
    </template>
    <template v-slot:[`item.badges`]="{ item }">
      <v-chip
        v-for="badge in item.badges"
        :key="badge"
        class="ma-2"
        :color="picChipColor(badge)"
        text-color="white"
      >
        {{ badge }}
      </v-chip>
    </template>

    <template v-slot:[`item.writer`]="{ item }">
      <div class="table__writer">
        <v-avatar>
          <img
            :src="require(`~/assets/img/${item.writer.icon}`)"
            alt="icon img"
          />
        </v-avatar>
        <div>
          <div>
            {{ item.writer.name }}
          </div>
          <div>
            {{ item.writer.level }}
          </div>
          <div>
            <v-progress-linear
              color="yellow"
              :value="item.writer.exp"
              rounded
            />
          </div>
          <div>
            <v-progress-linear
              color="indigo"
              :value="item.writer.accumulation"
              rounded
            />
          </div>
        </div>
      </div>
    </template>
    <template v-slot:[`item.contributer`]="{ item }">
      <div class="table__contributer">
        <v-avatar
          v-for="{ icon, name } in item.contributer"
          :key="name"
          size="30"
        >
          <img :src="require(`~/assets/img/${icon}`)" alt="icon img" />
        </v-avatar>
      </div>
    </template>
  </v-data-table>
</template>
<script>
/*
  Table은 단순히 보여주는 용도로만 사용 됨.
*/
// TODO: pagenation하는 부분을 밖으로 빼내야 함
export default {
  props: {
    tableData: {
      type: Array,
      isRequired: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headers: [
        { value: 'icon', sortable: false },
        { value: 'medal', sortable: false },
        { value: 'weight', sortable: false },
        { value: 'info', sortable: false },
        { value: 'badges', sortable: false },
        { value: 'writer', sortable: false },
        { value: 'contributer', sortable: false },
      ],
      // TODO: fixture로 빼야 함 - 나중에 api로 받아올 부분
      chips: [
        { name: 'Levdfa', color: 'deep-purple accent-4' },
        { name: 'Rucode', color: 'teal' },
        { name: 'bubule', color: 'amber darken-3' },
      ],
    }
  },
  methods: {
    calcDayAgo(date) {
      return Date.now() - date
    },
    picChipColor(name) {
      const color = this.chips.find((val) => val.name === name)
      if (color) return color.color
      return 'blue-grey'
    },
    clickRow() {
      // ref: https://vuetifyjs.com/en/api/v-data-table/#click:row
      /*
        클릭 이벤트
      */
    },
  },
}
</script>
<style lang="scss">
.table {
  &__weight {
    color: #78baca;
  }
  &__writer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__contributer {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    justify-items: center;
  }
}
</style>
