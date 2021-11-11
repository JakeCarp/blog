<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
    <form v-if="account.id" @submit.prevent="createBlog">
      <div class="mb-3">
        <label for="blogTitle" class="form-label">Title</label>
        <input
          required
          v-model="state.editable.title"
          type="text"
          name="blogTitle"
          id=""
          class="form-control"
          placeholder=""
          aria-describedby="helpId"
        />
      </div>
      <div class="mb-3">
        <label for="blogBody" class="form-label">Blog Body</label>
        <textarea
          required
          v-model="state.editable.body"
          class="form-control"
          name="blogBody"
          id=""
          rows="3"
        ></textarea>
        <button class="btn btn-primary my-3" type="submit">Create</button>
      </div>
    </form>
    <thread />
  </div>
</template>

<script>
import { computed, reactive, watchEffect } from "vue";
import { AppState } from "../AppState";
import Thread from "../components/Thread.vue";
import { useRoute } from "vue-router";
import { profileService } from "../services/ProfileService";
import { blogsService } from "../services/BlogsService";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
export default {
  components: { Thread },
  name: "Account",
  setup() {
    const state = reactive({
      editable: {},
    });
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profileService.getProfile(route.params.id);
          await blogsService.getAll("?creatorId=" + route.params.id);
        }
      } catch (error) {
        logger.error(error);
        Pop.toast(error.message, "error");
      }
    });
    return {
      state,
      async createBlog() {
        try {
          await blogsService.createBlog(state.editable);
        } catch (error) {}
      },

      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
