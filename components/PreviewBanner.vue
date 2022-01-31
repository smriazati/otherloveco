<template>
  <div class="container container-no-grid container-no-margin">
    <button @click="refresh"><span>Refresh Page Data</span></button>
  </div>
</template>

<script>
export default {
  asyncData() {
    const msg = { content: "Created at: " + new Date() };
    console.log(msg);
    return msg;
  },
  methods: {
    refresh() {
      console.log("refreshing nuxt");
      this.$nuxt.refresh();
    },
  },
};
</script>