<template>
<div class="row justify-content-center">
  <div class="  card cardshape border-0 color elevation-3 text-light">
    <h3 class="p-3 text-center">{{ blog.title }}</h3>
    <p class="p-4">{{ blog.body }}</p>
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
.cardshape{
  width: auto;
  margin-top: 5vh;
border-radius: 10px 100px / 120px;
}
.color{
  background-color: rgb(15, 106, 160);
}
</style>