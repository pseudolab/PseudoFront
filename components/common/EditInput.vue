<template>
  <div
    class="edit-input"
    :class="{ inline: iconUrl !== null && !isEdited && inputValue }"
  >
    <label v-if="isEdited || iconUrl === null">{{ label }}</label>
    <input
      v-if="isEdited"
      ref="input"
      v-model="editInputValue"
      :placeholder="placeholder"
    />
    <img
      v-else-if="iconUrl !== null && inputValue"
      class="icon"
      :src="iconUrl"
    />
    <div v-if="iconUrl === null && !isEdited" class="content">
      <p>{{ textValue }}</p>
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
    isEdited: {
      type: Boolean,
      required: true,
    },
    iconUrl: {
      type: [String, null],
      default: null,
    },
  },
  data() {
    return {
      editInputValue: '',
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
    isEdited() {
      this.$emit('changeInput', this.editInputValue)
    },
  },
  mounted() {
    this.editInputValue = this.inputValue
  },
}
</script>
<style lang="scss" scoped>
.edit-input {
  &.inline {
    display: inline;
    margin-right: 8px;
  }
  p {
    font-size: 12px;
    margin: 0;
  }
  input {
    font-size: 12px;
    width: 100%;
    border: 1px solid #000;
    border-radius: 3px;
  }
  .icon {
    width: 20px;
    height: 20px;
  }
}
</style>
