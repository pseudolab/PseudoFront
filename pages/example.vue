<template>
  <v-row justify="center">
    <v-col cols="5">
      {{ values }}
      
      <div v-show="isLoading">
        Loading list of countries...
      </div>
      
      <custom-select
        class="MultiSelect--bootstrap"
        :options="options"
        v-model="value"
        :select-values="true"
        placeholder="Choose a Source"
        ref="select"
        >
        <!-- <template slot="option" scope="props">
            {{ props.option.label }} ({{ props.option.value }})
          </template> -->
        </custom-select>
      <pre style="position: absolute; top: 0; right: 20px">{{ debug }}</pre>   
    </v-col>
    <v-col>
      <v-select
        v-model="model"
        :items="states"
        :menu-props="{ maxHeight: '400' }"
        label="Select"
        multiple
        hint="Pick your favorite states"
        persistent-hint
      ></v-select>      
    </v-col>
  </v-row>
</template>

<script>
import CustomSelect from "@/components/custom/CustomSelect.vue"
export default {
  components:{
    CustomSelect

  },
  data () {
    return {
      model: [],
      value: [],
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
      ],
      isLoading: false,
      options: [],
      values: [],
      debug: {}
    }
  },
  created () {
    this.options = [
      { value: 'direct', label: 'Direct', group: 'first' },
      { value: 'google-organic', label: 'Google Organic', group: 'google' },
      { value: 'google-adwords', label: 'Google AdWords', group: 'google' },
      { value: 'ask', label: 'Ask.com', group: 'first' },
      { value: 'bing', label: 'Bing', group: 'first' }
    ]
    // this.loadOptions()
    this.intervalId = setInterval(() => {
      const s = this.$refs.select || {}
      this.debug = {
        isFocused: s.isFocused,
        selectedItemIndex: s.selectedItemIndex,
        selectedOptionIndex: s.selectedOptionIndex,
        search: s.search,
        values: s.values,
        availableOptions: s.availableOptions
      }
    }, 100)
  },
  beforeDestroy () {
    clearInterval(this.intervalId)
  },
  methods: {
    loadOptions () {
      this.isLoading = true
      fetch('//restcountries.eu/rest/v2/all?fields=name;alpha2Code').then((res => {
        return res.json()
      })).catch((err) => {
        console.log('Error loading country list', err)
      }).then((list) => {
        this.isLoading = false
        this.options = list.map(function (item) {
          return {
            label: item.name,
            value: item.alpha2Code
          }
        })
      })
    }
  }        
}
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
}

.MultiSelect {
  position: relative;
  max-width: 300px;
}
.MultiSelect-control {
  min-height: 34px;
  padding: 6px;
  padding-bottom: 1px;
  border: 1px solid #000;
}

.MultiSelect-input {
  width: 4px;
  font-family: inherit;
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
}
.MultiSelect-inputGhost {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: auto;
  visibility: hidden;
}

.MultiSelect-placeholder {
  position: absolute;
  opacity: 0.5;
}

.MultiSelect-dropdown {
  position: absolute;
  top: 100%;
  z-index: 1;
  width: 100%;
  max-height: 200px;
  overflow: scroll;
  border: 1px solid #000;
}
.MultiSelect-noResults {
  padding: 3px 20px;
  font-style: italic;
  text-align: center;
}

.MultiSelectItem {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
  background: #eee;
}

.MultiSelectOption {
  &:hover {
    cursor: pointer;
  }
  &.s-selected {
    background: #eee;
  }
}

.MultiSelect--bootstrap {
  .MultiSelect-control {
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075);

    &.s-focused {
      border-color: #66afe9;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
    }
  }
  .MultiSelect-dropdown {
    margin-top: 2px;
    padding: 5px 0;
    border: 1px solid #d6d6d6;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 6px 12px rgba(0,0,0,.175);
  }
  .MultiSelectItem {
    margin-right: 5px;
    margin-bottom: 5px;
    padding: 3px 5px;
    border-radius: 3px;
    background: #eee;
    cursor: pointer;

    &.s-selected {
      background: #428bca;
      color: #fff;
    }
  }

  .MultiSelectOption {
    padding: 3px 20px;
    
    &.s-selected {
      background: #428bca;
      color: #fff;
    }
  }
}
</style>