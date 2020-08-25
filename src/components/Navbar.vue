<template>
  <div id="app">
  <template>
    <b-navbar>
        <template slot="brand">
            <b-navbar-item>
                <h1 style="font-size:20px; font-weight:bold">Sticker Orders</h1>
            </b-navbar-item>
        </template>

        <template slot="end">
            <b-navbar-item tag="div">
                <div class="buttons">
                    <addOrder v-if="this.$store.state.loggedIn" />
                    <Logout v-if="this.$store.state.loggedIn"/>
                    <Login2 v-if="!this.$store.state.loggedIn"/>
                    <Register v-if="!this.$store.state.loggedIn"/>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>
  </div>
</template>

<script>
//import axios from "axios";
import addOrder from './addOrder'
import Logout from './Logout'
import Login2 from './Login2'
import Register from './Register'
export default {
  name: 'Navbar',
  components: {
      addOrder,
      Logout,
      Login2,
      Register
  }
}
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
