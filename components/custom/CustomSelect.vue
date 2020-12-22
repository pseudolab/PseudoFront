<template>
  <div>
      <div class="MultiSelect">
    <!--     {{ selectedItemIndex }}, {{ selectedOptionIndex }} -->
        <div
          class="MultiSelect-control"
          :class="{ 's-focused': isFocused }"
          ref="control"
          @mousedown.prevent="onControlClick">
          <span
            class="MultiSelect-placeholder"
            v-show="showPlaceholder">{{ placeholder }}</span>
          <div
            v-for="(item, index) in items"
            :key="`${index}__items`"            
            class="MultiSelectItem"
            :class="{ 's-selected': selectedItemIndex === index }"
            @mousedown.prevent="selectedItemIndex = index">
            <slot name="item" :item="item">{{ item[labelProp] }}</slot>
          </div>
          <input
            ref="search"
            v-model="search"
            :style="searchStyle"
            @focus="isFocused = true"
            @blur="isFocused = false"
            type="text"
            class="MultiSelect-input" />
          <span ref="ghost" class="MultiSelect-input MultiSelect-inputGhost" v-html="ghostValue"></span>
        </div>
        <div
          class="MultiSelect-dropdown"
          v-show="showDropdown"
          ref="list">
          <div
            v-for="(group, idx) in optionGroups"
            :key="`${idx}__groups`"
            class="MultiSelectOptionGroup">
            <div
              v-for="(option, index) in group.options"
              :key="`${index}__options`"
              ref="options"
              class="MultiSelectOption"
              :class="{ 's-selected': selectedOptionIndex === index }"
              @mousedown.prevent="toggle(option)"
              @mouseenter="selectedOptionIndex = index">
              <slot name="option" :option="option">{{ option[labelProp] }}</slot>
            </div>
          </div>
          <slot name="noResults" v-if="search && !availableOptions.length">
            <div class="MultiSelect-noResults">
              No avaialbe results
            </div>
          </slot>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'values',
    event: 'change'
  },
  props: {
    values: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Array,
      default () {
        return []
      }
    },
    valueProp: {
      type: String,
      default: 'value'
    },
    labelProp: {
      type: String,
      default: 'label'
    },
    groupValueProp: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: 'Select a value'
    }
  },
  data () {
    return {
      search: '',
      searchWidth: 4,
      controlWidth: 100,
      selectedItemIndex: -1,
      selectedOptionIndex: -1,
      isFocused: false
    }
  },
  computed: {
    items () {
      return this.values.map((val) => {
        return val.find(this.options, { [this.valueProp]: val })
      })
    },
    optionGroups () {
      if (this.groupValueProp) {
        return _(this.availableOptions)
          .groupBy(this.groupValueProp)
          .map((options, group) => {
            return {
              label: group,
              options: options
            }
          })
          .value()
      }
      return [{
        options: this.availableOptions
      }]
    },
    availableOptions () {
      const search = this.search.toLowerCase().trim()
      const labelProp = this.labelProp
      return this.options.filter((opt) => {
        return this.items.indexOf(opt) === -1 && 
          (!search || opt[labelProp].toLowerCase().indexOf(search) >= 0)
      })
    },
    ghostValue () {
      return this.search.replace(/\s/g, '&nbsp;')
    },
    searchStyle () {
      return {
        width: (this.searchWidth + 4) + 'px',
        maxWidth: (this.controlWidth - 14) + 'px'
      }
    },
    showDropdown () {
      return this.isFocused && (this.availableOptions.length || this.search)
    },
    showPlaceholder () {
      return !this.search.trim() && !this.items.length
    }
  },
  watch: {
    search (text) {
      this.$nextTick(function () {
        this.searchWidth = this.$refs.ghost.offsetWidth
        this.controlWidth = this.$refs.control.offsetWidth
      })
    },
    isFocused (isFocused) {
      if (isFocused) {
        this.$nextTick(function () {
          this.$refs.list.scrollTop = 0
          this.selectedOptionIndex = 0  
        })
      } else {
        this.selectedItemIndex = -1
        this.selectedOptionIndex = -1
      }
    }
  },
  mounted() {
    document.addEventListener('keydown', this.docKeyDown)
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.docKeyDown)
  },
  methods: {
    toggle (option) {
      const list = this.values.slice()
      const value = this.getOptionValue(option)
      const index = this.getOptionIndex(this.items, option)
      if (index >= 0) {
        list.splice(index, 1)
      } else {
        list.push(value)
      }
      this.$emit('change', list)
    },
    getOptionValue (option) {
      return option[this.valueProp]
    },
    getOptionIndex (options, option) {
      const valueProp = this.valueProp
      const value = option[valueProp]
      for (let i = 0, len = options.length; i < len; i++) {
        if (options[i][valueProp] === value) {
          return i
        }
      }
      return -1
    },
    focusSearch () {
      this.$refs.search.focus()
    },
    onControlClick () {
      console.log('onControlClick')
      this.focusSearch()
    },
    onSearchFocus () {
      console.log('focus')
    },
    onSearchBlur () {
      console.log('blur')
    },
    scrollToSelected () {
      this.$nextTick(function () {
        const el = this.$refs.options[this.selectedOptionIndex]
        if (el && el.scrollIntoView) {
          el.scrollIntoView()
        }
      })
    },
    blur () {
      this.$refs.search.blur()
      this.search = ''      
    },
    docKeyDown (event) {
      // console.log('docKeyDown', event.key, event.keyCode)
      const itemCount = this.items.length
      const availableOptionCount = this.availableOptions.length
      
      if (this.selectedItemIndex >= 0) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
          this.toggle(this.items[this.selectedItemIndex])
          this.selectedItemIndex = -1
        } else if (event.key === 'ArrowLeft') {
          this.selectedItemIndex--
        } else if (event.key === 'ArrowRight') {
          this.selectedItemIndex++
        }
        
        if (this.selectedItemIndex < -1) {
          this.selectedItemIndex = -1
        } else if (this.selectedItemIndex >= itemCount) {
          this.selectedItemIndex = -1
          this.focusSearch()
        }
      }
      
      if (this.isFocused) {
        if (event.key === 'Escape') {
          this.blur()
          return
        }
      }

      // Only when the search input is focused.
      if (document.activeElement === this.$refs.search) {
        // Remove last item when BACKSPACE is pressed and there
        // is no search text.
        if (itemCount > 0 && event.key === 'Backspace' && !this.search) {
          this.toggle(this.items[itemCount - 1])
        }
        // Handle navigating up and down the available options
        // when the user presses the UP and DOWN arrow keys.
        if (availableOptionCount > 0) {
          if (event.key === 'ArrowUp') {
            if (this.selectedOptionIndex > 0) {
              this.selectedOptionIndex--
              this.scrollToSelected()
            }
          } else if (event.key === 'ArrowDown') {
            if (this.selectedOptionIndex < availableOptionCount - 1) {
              this.selectedOptionIndex++
              this.scrollToSelected()
            }
          }
        }
        // Handle ENTER key to select current option index.
        if (event.key === 'Enter' && this.selectedOptionIndex >= 0) {
          this.toggle(this.availableOptions[this.selectedOptionIndex])
          // Selected nothing if we selected the only remaining option.
          if (this.selectedOptionIndex === 0 && availableOptionCount === 1) {
            this.selectedOptionIndex = -1
          }
          // Update the selected option index to the previous available option
          // if the last option has been toggled.
          else if (this.selectedOptionIndex === availableOptionCount - 1) {
            // Update to the previous index or -1.
            this.selectedOptionIndex = Math.max(-1, this.selectedOptionIndex - 1)
          }
          this.search = ''
        }
      }
    }
  }


}
</script>
