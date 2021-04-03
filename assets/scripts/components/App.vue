<template>
  <div id="app">
    <input placeholder="Enter your email id."
      v-model="message"
      type="text">
      <h2 class="message">{{ message }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
    };
  },
};
</script>

<style>

</style>