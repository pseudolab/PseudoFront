<template>
  <section class="user-info">
    <label for="profile-upload" class="profile-img">
      <img width="250px" :src="profileUrl" />
    </label>
    <input
      id="profile-upload"
      type="file"
      accept="image/png, image/jpeg"
      @change="uploadImage(e)"
    />
    <article class="information pa-3">
      <v-btn x-small depressed class="edit-button" @click="toggleIsEdited">{{
        isEdited ? '저장' : '수정'
      }}</v-btn>
      <h3 class="mb-3">{{ userName }}</h3>
      <EditInput
        label="한 줄 소개"
        placeholder="간단한 소개글을 작성해주세요."
        :input-value="description"
        :is-edited="isEdited"
        @changeInput="setDescription"
      />
      <EditInput
        label="지역"
        placeholder="거주 지역을 입력해주세요."
        :input-value="region"
        :is-edited="isEdited"
        @changeInput="setRegion"
      />
      <EditInput
        label="메일 주소"
        placeholder="이메일을 입력해주세요."
        :input-value="userMail"
        :is-edited="isEdited"
        @changeInput="setUserMail"
      />
      <EditInput
        label="깃허브 주소"
        placeholder="깃허브 주소를 입력해주세요."
        :input-value="github"
        :is-edited="isEdited"
        :icon-url="require('../../assets/img/github.png')"
        @changeInput="setGithub"
      />
      <EditInput
        label="링크드인 주소"
        placeholder="링크드인 주소를 입력해주세요."
        :input-value="linkedin"
        :is-edited="isEdited"
        :icon-url="require('../../assets/img/linkedin.png')"
        @changeInput="setLinkedin"
      />
      <EditInput
        label="페이스북 주소"
        placeholder="페이스북 주소를 입력해주세요."
        :input-value="facebook"
        :is-edited="isEdited"
        :icon-url="require('../../assets/img/facebook.png')"
        @changeInput="setFacebook"
      />
      <EditInput
        label="구글 스칼라 주소"
        placeholder="구글 스칼라 주소를 입력해주세요."
        :input-value="googleScholar"
        :is-edited="isEdited"
        :icon-url="require('../../assets/img/googleScholar.png')"
        @changeInput="setGooglescholar"
      />
      <EditInput
        label="웹사이트 주소"
        placeholder="웹사이트/블로그 주소를 입력해주세요."
        :input-value="website"
        :is-edited="isEdited"
        :icon-url="require('../../assets/img/website.png')"
        @changeInput="setWebsite"
      />
    </article>
  </section>
</template>
<script>
import EditInput from '@/components/common/EditInput.vue'
import { mapMutations } from 'vuex'

export default {
  components: {
    EditInput,
  },
  props: {
    userName: {
      type: String,
      required: true,
    },
    profileImgUrl: {
      type: [String, null],
      default: null,
    },
  },
  data: () => ({
    isEdited: false,
    tempProfileValue: '',
  }),
  computed: {
    userMail() {
      return this.$store.state.profile.userMail
    },
    description() {
      return this.$store.state.profile.description
    },
    region() {
      return this.$store.state.profile.region
    },
    github() {
      return this.$store.state.profile.github
    },
    linkedin() {
      return this.$store.state.profile.linkedin
    },
    facebook() {
      return this.$store.state.profile.facebook
    },
    googleScholar() {
      return this.$store.state.profile.googleScholar
    },
    website() {
      return this.$store.state.profile.website
    },
    profileUrl() {
      if (this.profileImgUrl === null) {
        return require('../../assets/img/test.png')
      }
      return this.profileImgUrl
    },
  },
  beforeDestroy() {
    if (this.isEdited) {
      const response = confirm(
        '아직 저장되지 않은 수정 사항이 있습니다. 저장하시겠습니까?'
      )
      if (response) {
        this.isEdited = false
      }
    }
  },
  methods: {
    ...mapMutations({
      setUserMail: 'profile/SET_USER_MAIL',
      setDescription: 'profile/SET_DESCRIPTION',
      setRegion: 'profile/SET_REGION',
      setGithub: 'profile/SET_GITHUB',
      setLinkedin: 'profile/SET_LINKEDIN',
      setFacebook: 'profile/SET_FACEBOOK',
      setGooglescholar: 'profile/SET_GOOGLESCHOLAR',
      setWebsite: 'profile/SET_WEBSITE',
    }),
    toggleIsEdited() {
      this.isEdited = !this.isEdited
    },

    uploadImage(e) {
      // const URL = 'http://foobar.com/upload'
      // const data = new FormData()
      // data.append('name', 'my-picture')
      // data.append('file', e.target.files[0])
      // const config = {
      //   header: {
      //     'Content-Type': 'image/png',
      //   },
      // }
      // axios.put(URL, data, config).then((response) => {
      //   console.log('image upload response > ', response)
      // })
    },
  },
}
</script>
<style lang="scss" scoped>
.user-info {
  flex: 0 0 250px;
  .information {
    border: 1px solid #797979;
    border-radius: 5px;
  }
  .profile-img {
    position: relative;
    display: block;
    width: 250px;
    height: 250px;
    margin-bottom: 20px;
    border-radius: 8px;
    overflow: hidden;
    &:hover {
      opacity: 0.7;
      cursor: pointer;
      &::before {
        position: absolute;
        content: 'EDIT';
        color: white;
        z-index: 3;
        font-size: 15px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  input[type='file'] {
    opacity: 0;
    z-index: -1;
    position: absolute;
  }
}
</style>
