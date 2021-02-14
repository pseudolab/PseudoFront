<template>
  <section class="following">
    <v-chip class="mb-4" label color="primary"> Following </v-chip>
    <article>
      <v-card
        v-for="{ name, description, followers } in followings"
        :key="name"
        class="pa-4"
        outlined
      >
        <h2>{{ name }}</h2>
        <p class="ma-0">
          {{ description }}
        </p>
        <div>
          <v-icon x-small color="#989898">mdi-account</v-icon>
          Followers&nbsp;
          {{ followers }}
        </div>
      </v-card>
    </article>
  </section>
</template>
<script>
export default {
  data() {
    return {
      followings: [
        {
          name: 'AI Competition Break',
          description: '스터디에 대한 한 줄 설명 추가',
          followers: 80,
        },
        {
          name: 'KaggleMastger가 되기 위한 몸부림',
          description: '스터디에 대한 한 줄 설명 추가',
          followers: 80,
        },
        {
          name: '확률론 기초 한 방울',
          description: '스터디에 대한 한 줄 설명 추가',
          followers: 40,
        },
        {
          name: '논문미식회(Computer Vision)',
          description: '스터디에 대한 한 줄 설명 추가',
          followers: 80,
        },
        {
          name: 'Kubeflow 발만 담가보기',
          description: '스터디에 대한 한 줄 설명 추가',
          followers: 80,
        },
        {
          name: '모두가 한걸음씩 성장하는 PyTorch',
          description: '스터디에 대한 한 줄 설명 추가',
          followers: 80,
        },
        {
          name: 'PyTorch를 활용한 딥러닝 튜토리얼',
          description: '스터디에 대한 한 줄 설명 추가',
          followers: 80,
        },
      ],
    }
  },
}
</script>
<style lang="scss" scoped>
.following {
  & article {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    & h2 {
      color: $p-b-blue;
      font-size: 14px;
    }
    & p,
    div {
      color: #989898;
      font-size: 10px;
    }
  }
}
</style>
