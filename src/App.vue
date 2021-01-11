<template>
  <div id="app">
    <Navbar />
    <Orders v-if="this.$store.state.loggedIn" />
    <Welcome v-if="!this.$store.state.loggedIn" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Orders from "./components/Orders";
import Welcome from "./components/Welcome";

export default {
  name: "App",
  components: {
    Navbar,
    Orders,
    Welcome,
  },
  created() {
    this.$store.state.loggedIn = true;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
