<template>
  <div>
    <button class="button is-primary is-medium" @click="logout">
      Logout
    </button>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.state.loggedIn = false;
      this.$store.state.user = null;
      this.$cookies.remove("auth");
    },
  },
};
</script>

<style>
.button {
  margin: 10px;
}
</style>
