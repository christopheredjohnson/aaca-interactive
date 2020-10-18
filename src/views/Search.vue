<template>
  <div class="search">

    <div class="filters">
      <span class="filter-item" :class="{active: filterBy == 'name'}">Search by Name</span>
      <span>or</span>
      <span class="filter-item" :class="{active: filterBy == 'award'}">Search by Award</span>
    </div>

    <div v-for="key in Object.keys(inputs)" :key="key">
      <Input
        :inputs="inputs"
        :inputName="key"
        @onInputFocus="onInputFocus"
        @onInputChange="onInputChange"
      />
    </div>

    <button>Search</button>

    <Keyboard
      @onChange="onChange"
      @onKeyPress="onKeyPress"
      :input="inputs[inputName]"
      :inputName="inputName"
    />

  </div>
</template>

<script>
import Keyboard from "@/components/Keyboard";
import Input from "@/components/Input";

export default {
  name: "Search",
  components: {
    Keyboard,
    Input
  },
  data: () => ({
    /**
     * We define the inputs here
     */
    inputs: {
      firstName: "",
      lastName: "",
      AwardName: ""
    },
    inputName: "firstName",
    filterBy: "name"
  }),
  methods: {
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
    }
  }
};
</script> 

<style lang="scss" scoped>
.filters {
  .filter-item {
    text-transform: uppercase;
    color: #0E3E4E;
    &.active {
      color: #EF4823;
    }
  }
}
</style>