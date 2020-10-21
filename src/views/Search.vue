<template>
  <div class="search">
    <div class="filters">
      <span class="filter-item" @click="filterBy = 'name'" :class="{ active: filterBy == 'name' }"
        >Search by Name</span
      >
      <span>or</span>
      <span class="filter-item" @click="filterBy = 'award'" :class="{ active: filterBy == 'award' }"
        >Search by Award</span
      >
    </div>

    <div v-for="key in Object.keys(inputs)" :key="key" v-show="shouldhideInput(key)">
      <Input
        :inputs="inputs"
        :inputName="key"
        @onInputFocus="onInputFocus"
        @onInputChange="onInputChange"
      />
    </div>

    <button @click="search">Search</button>

    <Keyboard
      @onChange="onChange"
      @onKeyPress="onKeyPress"
      :input="inputs[inputName]"
      :inputName="inputName"
    />

    <ul>
      <li v-for="(result, index) in results" :key="`fruit-${index}`">
        {{ result.winners }} - {{ result.year }} - {{ result.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import _ from "lodash";
import Keyboard from "@/components/Keyboard";
import Input from "@/components/Input";

export default {
  name: "Search",
  components: {
    Keyboard,
    Input,
  },
  data: () => ({
    /**
     * We define the inputs here
     */
    inputs: {
      firstName: "",
      lastName: "",
      awardName: "",
    },
    isSearching: false,
    inputName: "firstName",
    filterBy: "award",
    results: [],
  }),
  methods: {
    shouldhideInput(key) {
      if(this.filterBy == "name" && key == "firstName") return true
      if(this.filterBy == "name" && key == "lastName") return true
      if(this.filterBy == "award" && key == "awardName") return true
      return false
    },
    search() {
      if (this.filterBy == "name") {
        this.results = _.filter(this.$root.awards, (value) => {
          return (
            value.winners
              .toLowerCase()
              .includes(this.inputs.firstName.toLowerCase()) &&
            value.winners
              .toLowerCase()
              .includes(this.inputs.lastName.toLowerCase())
          );
        });
      } else {
        this.results = _.filter(this.$root.awards, (value) => {
          return (
            value.title.toLowerCase()
              .includes(this.inputs.awardName.toLowerCase())
          );
        });
      }
      console.log(this.results)
    },
    onChange(input) {
      this.inputs[this.inputName] = input;
    },
    onKeyPress(button) {
      console.log("button", button);
    },
    onInputChange(input) {
      console.log("Input changed directly:", input.target.id);
      this.inputs[input.target.id] = input.target.value;
    },
    onInputFocus(input) {
      console.log("Focused input:", input.target.id);
      this.inputName = input.target.id;
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  .filter-item {
    text-transform: uppercase;
    color: #0e3e4e;
    &.active {
      color: #ef4823;
    }
  }
}
</style>
