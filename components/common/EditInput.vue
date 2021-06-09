<template>
  <div class="edit-input">
    <label>{{ label }}</label>
    <input
      v-if="isEdited"
      ref="input"
      v-model="editInputValue"
      @blur="blurInput"
    />
    <div v-else class="content">
      <p>{{ textValue }}</p>
      <v-icon class="icon" small @click="editInput">mdi-pencil</v-icon>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: {
      default: '',
      type: String,
    },
    placeholder: {
      default: '',
      type: String,
    },
    inputValue: {
      default: '',
      type: String,
    },
  },
  data() {
    return {
      editInputValue: '',
      isEdited: false,
    }
  },
  computed: {
    textValue() {
      if (this.inputValue === '') {
        return this.placeholder
      }
      return this.inputValue
    },
  },
  watch: {
    inputValue(newVal) {
      this.editInputValue = newVal
    },
  },
  mounted() {
    this.editInputValue = this.inputValue
  },
  methods: {
    blurInput() {
      this.isEdited = false
      this.$emit('changeInput', this.editInputValue)
    },
    editInput() {
      this.isEdited = true
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.edit-input {
  & p {
    font-size: 12px;
    margin: 0;
  }
  & input {
    font-size: 12px;
    width: 100%;
  }

  & .content {
    position: relative;
    & .icon {
      position: absolute;
      top: 0;
      right: 0;
      visibility: hidden;
    }
    &:hover .icon {
      visibility: visible;
    }
  }
}
</style>
