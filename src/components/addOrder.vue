<template>
  <section>
    <button
      class="button is-primary is-medium"
      @click="isComponentModalActive = true"
    >
      Add an order
    </button>

    <b-modal
      :active.sync="isComponentModalActive"
      has-modal-card
      full-screen
      :can-cancel="false"
    >
      <modal-form></modal-form>
    </b-modal>
  </section>
</template>

<script>
import axios from "axios";
import "es6-promise/auto";
const ModalForm = {
  template: `
            <div class="modal-card" style="width: auto; background-color:white">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add an order</p>
                </header>
                <section class="modal-card-body" style="width: 50%; margin: auto">
                    <b-field label="Name">
                        <b-input
                            v-model="name"
                            ref="name"
                            type="text"
                            placeholder="Name & Twitch Handler"
                            required>
                        </b-input>
                    </b-field>
                    
                    <b-field label="Street-Address">
                        <b-input
                            v-model="streetAddress"
                            ref="streetAddress"
                            type="text"
                            placeholder="Street address"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="City">
                        <b-input
                            v-model="city"
                            ref="city"
                            type="text"
                            placeholder="City"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="State">
                        <b-input
                            v-model="state"
                            ref="state"
                            type="text"
                            placeholder="State"
                            required>
                        </b-input>
                    </b-field>

                    <b-field label="Postcode">
                        <b-input
                            v-model="postcode"
                            ref="postcode"
                            type="text"
                            placeholder="Postcode | ZIP Code"
                            required>
                        </b-input>
                    </b-field>
                    
                    <b-field label="Sticker" >
                            <b-select placeholder="Select a sticker" v-model="selectedSticker" expanded required>
                            <option value="firstSticker">First sticker</option>
                            <option value="secondSticker">Second Sticker</option>
                        </b-select>
                    </b-field>
                    <br>
                    <button class="button" type="button" @click="addOrder">Add</button>
                    <b-notification
                    v-if="error"
            type="is-danger"
            has-icon
            aria-close-label="Close notification"
            role="alert">
            Please check all inputs have been filled correctly.
        </b-notification>

        <b-notification
        v-if="success"
            type="is-success"
            has-icon
            aria-close-label="Close notification">
            Order has been added
        </b-notification>
                </section>
                
                <footer class="modal-card-foot">
                    <button class="button" type="button" @click="$parent.close()">Close</button>
                </footer>
            </div>

        `,
  data() {
    return {
      name: null,
      streetAddress: null,
      city: null,
      state: null,
      postcode: null,
      selectedSticker: null,
      orders: [],
      error: false,
      success: false,
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:4000/api/orders");
    this.orders = response.data;
  },
  methods: {
    async addOrder() {
      this.error = false;
      this.success = false;
      event.preventDefault();
      let name = this.name;
      let streetAddress = this.streetAddress;
      let city = this.city;
      let state = this.state;
      let postcode = this.postcode;
      let selectedSticker = this.selectedSticker;

      await axios
        .post("http://localhost:4000/api/orders", {
          name: name,
          streetAddress: streetAddress,
          city: city,
          state: state,
          postcode: postcode,
          selectedSticker: selectedSticker,
        })
        .then((response) => {
          if (!response.data.errors) {
            this.error = false;
            this.success = true;
            this.$root.$emit("newOrder");
          } else {
            this.error = true;
            this.success = false;
          }
        })
        .catch(() => {
          this.success = false;
          this.error = true;
        });
    },
  },
};

export default {
  components: {
    ModalForm,
  },
  methods: {
    danger() {
      this.$buefy.notification.open({
        duration: 5000,
        message: `Please check all the inputs`,
        position: "is-bottom-right",
        type: "is-danger",
        hasIcon: true,
      });
    },

    success() {
      this.$buefy.notification.open({
        message: "Order added!",
        type: "is-success",
      });
    },
  },
  data() {
    return {
      isComponentModalActive: false,
    };
  },
};
</script>
