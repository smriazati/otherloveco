<template>
  <div>
    <button @click="refresh">Refresh</button>
  </div>
</template>

<script>
export default {
  asyncData() {
    return { content: "Created at: " + new Date() };
  },
  methods: {
    refresh() {
      this.$nuxt.refresh();
    },
  },
};
</script>