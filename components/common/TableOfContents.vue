<template class="toc">
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
</template>
<script>
export default {}
</script>
<style lang="scss" scoped></style>
