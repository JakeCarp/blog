<template>
  <div class="Thread">
    <blog v-for="b in blogs" :key="b.id" :blog="b" />
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import Blog from "./Blog.vue";
export default {
  components: { Blog },
  setup() {
    return {
      blogs: computed(() => AppState.blogs),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>