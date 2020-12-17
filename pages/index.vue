<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        Main Page
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import heads from "@/static/mockDatas/heads.js"
export default {
  head() {
    return heads.main
  }
}
</script>
