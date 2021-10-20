<template>
  <the-toaster ref="toaster" timer="5000" manual-delete />
  <p>
    <button @click="success">Add Success Message</button>
    <button @click="error">Add Error Message</button>
  </p>
</template>

<script>
import TheToaster from './components/TheToaster';

export default {
  name: 'App',

  components: { TheToaster },

  methods: {
    success() {
      this.$refs.toaster.success('Success ' + new Date().toLocaleTimeString());
    },

    error() {
      this.$refs.toaster.error('Error ' + new Date().toLocaleTimeString());
    },
  },
};
</script>

<style></style>
