<template>
  <article class="table">
    <v-btn-toggle mandatory group dense class="table--sort d-flex justify-end">
      <v-btn class="table--sort__btn">최신순</v-btn>
      <v-btn class="table--sort__btn">추천순</v-btn>
    </v-btn-toggle>
    <hr
      :style="{
        border: 'none',
        height: '1px',
        backgroundColor: 'rgba(0,0,0,0.12)',
      }"
    />
    <v-data-table
      hide-default-header
      :headers="headers"
      :items="tableData"
      :items-per-page="5"
      :loading="false"
      @click:row="clickRow"
    >
      <template v-slot:[`item.info`]="{ item }">
        <div class="table--item--top mb-2">
          <h4 class="mr-1">
            {{ item.info.title }}
          </h4>
          <span class="grey--text">
            {{ calcDayAgo(item.info.date) | dayAgo }}
          </span>
        </div>
        <v-icon v-if="item.info.isLiked">mdi-thumb-up</v-icon>
        <v-icon v-else>mdi-thumb-up-outline</v-icon>
        <span class="font-weight-bold">{{ item.info.likes }}</span>
        <v-icon class="ml-2">mdi-comment-processing-outline</v-icon>
        <span class="font-weight-bold">{{ item.info.comments }}</span>
        <v-icon class="ml-2">mdi-format-quote-open-outline</v-icon>
        <span class="font-weight-bold">{{ item.info.quotations }}</span>
        <v-chip
          v-for="badge in item.info.badges"
          :key="badge"
          class="ms-2"
          label
          x-small
          text-color="white"
        >
          {{ badge }}
        </v-chip>
      </template>

      <template v-slot:[`item.writer`]="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-row no-gutters justify="end">
              <v-col
                class="d-flex justify-center"
                :cols="5"
                v-bind="attrs"
                v-on="on"
              >
                <UserProfile
                  :img-url="require('~/assets/img/test.png')"
                  exp-color="#3cb043"
                  :exp="item.writer.exp"
                  :remain-exp="item.writer.accumulation"
                  :width="40"
                  :is-animation="true"
                />
              </v-col>
              <v-col
                class="table--contributer d-flex justify-start"
                :cols="3"
                v-bind="attrs"
                v-on="on"
              >
                <div
                  v-for="({ icon, name }, idx) in item.contributer"
                  :key="name"
                  class="table--contributer__profile"
                >
                  <UserProfile
                    v-if="idx < 4"
                    :img-url="require(`~/assets/img/${icon}`)"
                    exp-color="#3cb043"
                    :exp="item.writer.exp"
                    :remain-exp="item.writer.accumulation"
                    :width="30"
                    :is-animation="false"
                  />
                </div>
              </v-col>
            </v-row>
            <v-row no-gutters justify="end">
              <v-col class="text-center font-weight-bold" :cols="5">
                {{ item.writer.name }}
              </v-col>
              <v-col :cols="3" />
            </v-row>
          </template>
          <div>
            <h4 class="block">작성자</h4>
            <div class="d-flex align-center">
              <UserProfile
                :img-url="require('~/assets/img/test.png')"
                exp-color="#3cb043"
                :exp="item.writer.exp"
                :remain-exp="item.writer.accumulation"
                :width="40"
                :is-animation="false"
              />
              <span class="ml-3">
                {{ item.writer.name }}
              </span>
            </div>
          </div>
          <h5 v-if="item.contributer">참여자</h5>
          <div
            v-for="{ icon, name } in item.contributer"
            :key="name"
            class="d-flex align-center"
          >
            <UserProfile
              :img-url="require(`~/assets/img/${icon}`)"
              exp-color="#3cb043"
              :exp="item.writer.exp"
              :remain-exp="item.writer.accumulation"
              :width="40"
              :is-animation="false"
            />
            <span class="ml-3">
              {{ name }}
            </span>
          </div>
        </v-tooltip>
      </template>
    </v-data-table>
  </article>
</template>
<script>
/*
  Table은 단순히 보여주는 용도로만 사용 됨.
*/
// TODO: pagenation하는 부분을 밖으로 빼내야 함
import UserProfile from '@/components/common/UserProfile.vue'
export default {
  components: {
    UserProfile,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headers: [
        { value: 'info', sortable: false },
        { value: 'writer', sortable: false },
      ],
      // TODO: fixture로 빼야 함 - 나중에 api로 받아올 부분
      chips: [{ name: 'Levdfa' }, { name: 'Rucode' }, { name: 'bubule' }],
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
  & .v-data-table {
    background-color: transparent !important;
    & tbody tr td {
      padding-top: 10px !important;
      padding-bottom: 10px !important;
    }
  }
  &--item {
    &--top {
      display: flex;
    }
  }
  &--contributer {
    position: relative;
    left: -20px;
    &__profile {
      display: flex;
      align-items: center;
      @for $i from 1 to 5 {
        &:nth-child(#{$i}) {
          position: relative;
          left: calc(10px - 10px * #{$i});
        }
      }
    }
  }
  &--sort {
    &__btn {
      margin: 0 3px 0 0 !important;
      padding: 0 !important;
      height: 20px !important;
    }
    & .v-btn--active > .v-btn__content {
      color: #000;
    }
    &
      .v-btn:not(.v-btn--text):not(.v-btn--outlined):not(:hover).v-btn--active:before {
      opacity: 0;
    }
  }
  & .v-tooltip__content {
    background-color: #fff;
  }
}
</style>
