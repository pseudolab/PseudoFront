<template>
  <article class="table">
    <div
      class="table--sort d-flex justify-end mb-2"
      :class="{ 'mt-2': sortType.length === 0 }"
    >
      <button
        v-for="(type, idx) in sortType"
        :key="type"
        class="table--sort__btn"
        :class="{ 'font-weight-bold': sortTypeIdx === idx }"
        @click="changeSortType(idx)"
      >
        {{ type }}
      </button>
    </div>
    <v-card
      v-for="(item, idx) in tableData"
      :key="idx"
      class="mb-4 pa-3 d-flex"
      @click="clickRow"
    >
      <div class="d-flex flex-column justify-space-between">
        <div class="d-flex table--item--top">
          <h4 class="mr-1">
            {{ item.info.title }}
          </h4>
          <span class="grey--text">
            {{ calcDayAgo(item.info.date) | dayAgo }} 전
          </span>
        </div>
        <div>
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
            color="primary"
          >
            {{ badge }}
          </v-chip>
        </div>
      </div>
      <v-tooltip bottom content-class="table--tooltip">
        <template v-slot:activator="{ on, attrs }">
          <div class="ml-auto d-flex" v-bind="attrs" v-on="on">
            <div class="table--writer">
              <UserProfile
                :img-url="require('~/assets/img/test.png')"
                exp-color="red"
                :exp="item.writer.exp"
                :remain-exp="item.writer.accumulation"
                :width="40"
                :is-animation="true"
              />
              <div class="text-center font-weight-bold">
                {{ item.writer.name }}
              </div>
            </div>
            <div class="table--contributer d-flex justify-start" :cols="4">
              <div
                v-for="({ icon, name }, contributer_idx) in item.contributer"
                :key="name"
                class="table--contributer__profile"
              >
                <UserProfile
                  v-if="contributer_idx < 4"
                  :img-url="require(`~/assets/img/${icon}`)"
                  exp-color="#3cb043"
                  :exp="item.writer.exp"
                  :remain-exp="item.writer.accumulation"
                  :width="30"
                  :is-animation="false"
                />
              </div>
            </div>
          </div>
        </template>
        <div>
          <h4 class="block">작성자</h4>
          <div class="d-flex align-center">
            <UserProfile
              :img-url="require('~/assets/img/test.png')"
              exp-color="red"
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
    </v-card>
    <div class="text-center">
      <v-pagination
        v-model="pageIdx"
        :length="10"
        :total-visible="6"
        @input="changePage"
      ></v-pagination>
    </div>
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
      sortType: ['최신순', '추천순'],
      sortTypeIdx: 0,
      pageIdx: 1,
    }
  },
  mounted() {
    this.$emit('changeSortType', this.sortType[0])
    this.$emit('changePage', 1)
  },
  methods: {
    calcDayAgo(date) {
      return Date.now() - date
    },
    clickRow(e) {
      // NOTE: mouse-event가 parameter로 들어옵니다. 이에 따라 선택된 row가 무엇인지 data-set에 id값으로 저장하는것이 바람직할 것 같습니다.
    },
    changeSortType(idx) {
      this.sortTypeIdx = idx
      this.$emit('changeSortType', this.sortType[idx])
    },
    changePage(idx) {
      this.$emit('changePage', idx)
    },
  },
}
</script>
<style lang="scss">
.table {
  &--writer {
    width: 50px;
    white-space: nowrap;
    text-align: center;
  }
  &--contributer {
    margin-left: 20px;
    width: 80px;
    position: relative;
    left: -20px;
    padding-bottom: 24px;
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
      font-size: 12px;
      &:not(:last-child) {
        margin-right: 5px;
      }
    }
    & .v-btn--active > .v-btn__content {
      color: #000;
    }
    &
      .v-btn:not(.v-btn--text):not(.v-btn--outlined):not(:hover).v-btn--active:before {
      opacity: 0;
    }
  }
  &--tooltip.v-tooltip__content {
    background-color: #e8eced;
    color: #595959;
    &.menuable__content__active {
      opacity: 1 !important;
    }
  }
}
</style>
