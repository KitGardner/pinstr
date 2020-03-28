<template>
  <div class="card p-2 pin shadow">
    <h4>{{pin.title}}</h4>
    <p>{{pin.description}}</p>
    <hr />
    <div class="d-flex justify-content-between align-items-center">
      <user-avatar :user="pin.creator" height="40" rounded show-name />
      <i
        class="fa fa-trash text-muted mr-2"
        v-if="$auth.isAuthenticated && $auth.user.email == pin.creatorEmail"
        @click="deletePin"
      ></i>
    </div>
  </div>
</template>

<script>
import UserAvatar from "./UserAvatar";
export default {
  name: "Pin",
  props: {
    pin: { type: Object, required: true }
  },
  components: {
    UserAvatar
  },
  methods: {
    async deletePin() {
      let yes = await this.$confirm("Delete the pin?");
      if (!yes) {
        return;
      }
      this.$store.dispatch("removePin", this.pin.id);
    }
  }
};
</script>

<style>
</style>