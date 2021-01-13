<template>
  <v-data-table
    :headers="headers"
    :items="tableData"
    :items-per-page="5"
    class="table"
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
      <v-chip v-for="badge in item.badges" :key="badge">
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
// TODO: grid로 작업되어있는부분 v-col v-row로 변경할 것
export default {
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
      tableData: [
        {
          icon: 'test.png',
          medal: true,
          weight: 24,
          info: {
            title: 'TabNet 논문 리뷰',
            likes: 17,
            comments: 5,
            quotations: 2,
            date: Date.now(),
          },
          badges: ['Levdfa', 'Rucode'],
          writer: {
            icon: 'test3.png',
            name: 'Duck',
            level: 99,
            exp: 30,
            accumulation: 50,
          },
          contributer: [
            {
              icon: 'test3.png',
              name: 'Duck',
              level: 99,
              exp: 30,
              accumulation: 50,
            },
            {
              icon: 'test3.png',
              name: 'Duck2',
              level: 99,
              exp: 30,
              accumulation: 50,
            },
            {
              icon: 'test3.png',
              name: 'Duck3',
              level: 99,
              exp: 30,
              accumulation: 50,
            },
          ],
        },
        {
          icon: 'test.png',
          medal: false,
          weight: 37,
          info: {
            title: 'TabNet 논문 리뷰',
            likes: 17,
            comments: 5,
            quotations: 2,
            date: Date.now(),
          },
          badges: ['Levdfa', 'Rucode', 'bubule'],
          writer: {
            icon: 'test3.png',
            name: 'Duck',
            level: 99,
            exp: 90,
            accumulation: 50,
          },
        },
      ],
    }
  },
  methods: {
    calcDayAgo(date) {
      return Date.now() - date
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
