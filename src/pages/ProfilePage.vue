<template>
  <div class=" col-12 about text-center justify-content-center d-flex flex-column bg-dark">

    <div class="card cardshape border-0 color elevation-3 text-light">
    <h3 class="mt-2">Welcome {{ account.name }}</h3>
    <div class=" d-flex flex-row align-items-center mb-3">
    <img height="35" class="rounded ms-5" :src="account.picture" alt="" />
    <p class="m-0">{{ account.email }}</p>
    </div>
      </div>
  </div>
  <div class="col-12 d-flex justify-content-end ">
      <div class="card text-light elevation-3 border-0 color p-5 d-flex cardform">
        <h3 class="text-center">Post Something!</h3>
    <form v-if="account.id" @submit.prevent="createBlog">
      <div class="mb-3">
        <label for="blogTitle" class="form-label mt-1">Title</label>
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
        <label for="blogBody" class="form-label">Post:</label>
        <textarea
          required
          v-model="state.editable.body"
          class="form-control"
          name="blogBody"
          id=""
          rows="3"
        ></textarea>
        <button class="btn selectable btn-outline-light my-3" type="submit">Create</button>
      </div>
    </form>
    </div>
    </div>
    <thread />
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
.color{
  background-color: rgb(15, 106, 160);
}
.cardshape{
  width: 40%;
  margin-top: 5vh;
  border-top-right-radius: 25%;
  border-bottom-right-radius: 25%;
  border-top-left-radius: 0%;
  border-bottom-left-radius: 0%;
}
.cardform{
width: 50%;
  margin-top: 5vh;
  border-top-right-radius: 0%;
  border-bottom-right-radius: 0%;
  border-top-left-radius: 25%;
  border-bottom-left-radius: 25%;
  
}
</style>
