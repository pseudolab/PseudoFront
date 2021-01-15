<template>
  <v-card class="rank-board d-flex px-8 py-3">
    <article v-for="i in 3" :key="i" class="mr-10">
      <v-row class="font-weight-bold"> Q Rank </v-row>
      <v-row v-for="j in 3" :key="j" justify="center" class="mt-2">
        <v-btn depressed>
          <v-col> img </v-col>
          <v-col> name </v-col>
          <v-col> score </v-col>
        </v-btn>
      </v-row>
    </article>
  </v-card>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped></style>
