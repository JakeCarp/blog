<template>
  <div class="blog card m-3">
    <h3 class="m-3 text-center">{{ blog.title }}</h3>
    <p class="m-3">{{ blog.body }}</p>
  </div>
</template>


<script>
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>