<template>
  <div>
    <b-dropdown
      position="is-bottom-left"
      append-to-body
      aria-role="menu"
      trap-focus
    >
      <a class="navbar-item" slot="trigger" role="button">
        <span>Login</span>
        <b-icon icon="menu-down"></b-icon>
      </a>

      <b-dropdown-item
        aria-role="menu-item"
        :focusable="false"
        custom
        paddingless
      >
        <form action="">
          <div class="modal-card" style="width:300px;">
            <section class="modal-card-body">
              <b-field label="Email">
                <b-input
                  type="email"
                  placeholder="Your email"
                  v-model="email"
                  required
                >
                </b-input>
              </b-field>

              <b-field label="Password">
                <b-input
                  v-model="password"
                  type="password"
                  password-reveal
                  placeholder="Your password"
                  required
                >
                </b-input>
              </b-field>
              <b-checkbox v-model="remember">Remember me</b-checkbox>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-primary" @click="login">Login</button>
            </footer>
          </div>
        </form>
      </b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      email: "",
      password: "",
      remember: null
    };
  },
  async created() {
    let cookie = this.$cookies.get("auth");
    if (!cookie) {
      return;
    } else {
      await axios
        .post("http://localhost:4000/api/user/cookieCheck", {
          cookie: this.$cookies.get("auth"),
        })
        .then((response) => {
          this.$cookies.set("auth", response.data, 30);
          console.log('Cookie updated');
          this.$store.state.loggedIn = true;
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  },
  methods: {
    async login() {
      event.preventDefault();
      let email = this.email;
      let password = this.password;

      await axios
        .post("http://localhost:4000/api/user/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          this.$store.state.loggedIn = true;
          if(this.remember) {
            this.$cookies.set("auth", response.data, "1d");
          }
          this.success();
        })
        .catch((error) => {
          if (error.response) {
            this.danger();
          }
        });
    },
    success() {
      this.$buefy.notification.open({
        message: "Logged in!",
        type: "is-success",
        hasIcon: true,
        closable: true,
        duration: 5000,
        position: "is-bottom-right",
      });
    },
    danger() {
      this.$buefy.notification.open({
        duration: 5000,
        message: `Email or password is wrong`,
        position: "is-bottom-right",
        type: "is-danger",
        hasIcon: true,
        closable: true,
      });
    },
  },
};
</script>
