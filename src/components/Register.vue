<template>
  <div>
    <b-dropdown
      position="is-bottom-left"
      append-to-body
      aria-role="menu"
      trap-focus
      ref="reg"
    >
      <a class="navbar-item" slot="trigger" role="button">
        <span>Register</span>
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
            <b-field label="Name">
                <b-input type="name" placeholder="Your Name" v-model="name" required>
                </b-input>
              </b-field>
              <b-field label="Email">
                <b-input type="email" placeholder="Your email" v-model="email" required>
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

            </section>
            <footer class="modal-card-foot">
              <button class="button is-primary" @click="register">Register</button>
            </footer>
          </div>
        </form>
      </b-dropdown-item>
    </b-dropdown>
  </div> 
  </template>

<script>

const axios = require('axios')

export default {
    data() {
    return {
      name: null,
      email: null,
      password: null,
    };
  },
  methods: {
    async register() {
      event.preventDefault();
      let name = this.name;
      let email = this.email;
      let password = this.password;
      await axios
        .post("http://localhost:4000/api/user/register", {
          name: name,
          email: email,
          password: password,
        })
        .then(() => {
            this.$refs.reg.toggle();
            this.success()
        })
        .catch((error) => {
          if (error.response) {
            this.danger()
          }
        });
    },
    success() {
      this.$buefy.notification.open({
        message: "Registered",
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
        message: `Email or password is wrong or the email may already exist`,
        position: "is-bottom-right",
        type: "is-danger",
        hasIcon: true,
        closable: true,
      });
    },
  },
}
  </script>
