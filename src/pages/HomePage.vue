<template>
  <div class="container-fluid bg-dark">
    <div class="row justify-content-center">
      <div class="col-12">
    <search class="pt-3" />
    <div class="m-2">
    <thread />
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "@vue/runtime-core";
import { blogsService } from "../services/BlogsService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import Thread from "../components/Thread.vue";
import Search from "../components/Search.vue";
export default {
  components: { Thread, Search },
  setup() {
    onMounted(async () => {
      try {
        await blogsService.getAll("");
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {};
  },
};
</script>

<style scoped lang="scss">
</style>
