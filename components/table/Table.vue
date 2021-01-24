<template>
  <v-data-table
    hide-default-header
    :headers="headers"
    :items="tableData"
    :items-per-page="5"
    class="table"
    :loading="false"
    @click:row="clickRow"
  >
    <template v-slot:[`item.info`]="{ item }">
      <div class="table--item--top">
        <h4 class="mr-1">
          {{ item.info.title }}
        </h4>
        <span>
          {{ calcDayAgo(item.info.date) | dayAgo }}
        </span>
      </div>
      <v-icon>mdi-thumb-up-outline</v-icon>
      {{ item.info.likes }}
      <v-icon>mdi-comment-processing-outline</v-icon>
      {{ item.info.comments }}
      <v-icon>mdi-format-quote-open-outline</v-icon>
      {{ item.info.quotations }}
      <v-chip v-for="badge in item.info.badges" :key="badge" class="mr-1" label>
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
  &--item {
    &--top {
      display: flex;
    }
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
