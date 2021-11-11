<template>
  <div class="blog card m-3">
    <h3 class="m-3 text-center">{{ blog.title }}</h3>
    <p class="m-3">{{ blog.body }}</p>
    <div class="">
      <button
        v-if="account.id === blog.creatorId"
        class="btn btn-danger"
        @click="removeBlog"
      >
        <i class="mdi mdi-close" />
      </button>
    </div>
  </div>
</template>


<script>
import { computed } from "@vue/reactivity";
import { blogsService } from "../services/BlogsService";
import Pop from "../utils/Pop";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async removeBlog() {
        try {
          if (await Pop.confirm()) {
            await blogsService.removeBlog(props.blog.id);
            Pop.toast("Deleted", "success");
          }
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style lang="scss" scoped>
</style>