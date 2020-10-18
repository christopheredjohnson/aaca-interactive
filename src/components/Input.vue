<template>
  <input
    :id="inputName"
    :value="inputValue"
    @focus="onInputFocus"
    @input="onInputChange"
  >
</template>

<script>
export default {
  name: "Input",
  props: {
    inputs: {
      type: Object
    },
    inputName: {
      type: String
    }
  },
  methods: {
    onInputChange(input) {
      this.$emit("onInputChange", input);
    },
    onInputFocus(input) {
      this.$emit("onInputFocus", input);
    }
  },
  computed: {
    inputValue: function () {
      return this.inputs[this.inputName];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>