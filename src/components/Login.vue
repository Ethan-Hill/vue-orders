<template>
    <section>
        <button class="button is-primary is-medium"
            @click="isComponentModalActive = true">
            Login
        </button>

        <b-modal :active.sync="isComponentModalActive"
            has-modal-card full-screen :can-cancel="false">
            <modal-form></modal-form>
        </b-modal>
    </section>
</template>

<script>
const axios = require('axios')

    const ModalForm = {
        template: `
            <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                    <p class="modal-card-title">Login</p>
                </header>
                <section class="modal-card-body">
                    <b-field label="Email">
                        <b-input
                            v-model="email"
                            type="email"
                            placeholder="Your email"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Password">
                        <b-input
                            v-model="password"
                            type="password"
                            password-reveal
                            placeholder="Your password"
                            required>
                        </b-input>
                    </b-field>

                    <b-checkbox>Remember me</b-checkbox>
                </section>
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                    <button class="button is-primary" @click="login">Login</button>
                </footer>
            </div>
        `,
  data() {
    return {
      email: "",
      password: "",
    };
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
            console.log(response.data)
          if (response.data[0]) {
              this.$store.state.loggedIn = true;
              this.$store.state.userEmail = response.data[0];
              console.log(this.$store.state.loggedIn);
              console.log(this.$store.state.userEmail);
          } else {
                this.$store.state.loggedIn = false;
          }
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
    success() {
      this.$buefy.notification.open({
        message: "Logged in!",
        type: "is-success",
        hasIcon: true,
        closable: false,
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
        closable: false,
      });
    },
  },
    }

    export default {
        components: {
            ModalForm
        },
        data() {
            return {
                isComponentModalActive: false,
            }
        }
    }
</script>