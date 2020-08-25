<template>
  <section style="width:100vw; display:flex; justify-content:center">
    <div style="width:70%">
      <h1 style="font-size: 50px">Orders</h1>
      <b-table
        v-if="orders"
        ref="mytable"
        :data="orders"
        :columns="columns"
        :checked-rows.sync="checkedRows"
        checkable
      ></b-table>
      <div class="has-text-center" v-if="checkedRows.length">
        <button class="button field is-danger" @click="deleteSelected">
          Delete Selected Orders
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    this.$root.$on("newOrder", () => {
      this.newOrder();
    });
  },
  async created() {
    const response = await axios.get("http://localhost:4000/api/orders");
    this.orders = response.data;
  },

  methods: {
    async newOrder() {
      const response = await axios.get("http://localhost:4000/api/orders");
      this.orders = response.data;
    },
    getSelected() {
      console.log(this.checkedRows);
    },
    async deleteSelected() {
      let ids = [];
      this.checkedRows.forEach((order) => ids.push(order._id));
      try {
        Promise.all(
          ids.map((id) =>
            axios.delete(`http://localhost:4000/api/orders/${id}`)
          )
        )
          .then(() => axios.get("http://localhost:4000/api/orders"))
          .then((response) => (this.orders = response.data));
        while (this.checkedRows.length > 0) {
          this.checkedRows.splice(0, 1);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },

  data() {
    const orders = [];
    return {
      checkboxPosition: "left",
      checkedRows: [],
      orders,
      columns: [
        {
          field: "_id",
          label: "ID",
          width: "100",
          numeric: true,
          searchable: true,
        },
        {
          field: "name",
          label: "Name",
          searchable: true,
        },
        {
          field: "streetAddress",
          label: "Street Address",
          searchable: true,
        },
        {
          field: "city",
          label: "City",
          searchable: true,
        },
        {
          field: "state",
          label: "State",
          searchable: true,
        },
        {
          field: "postcode",
          label: "Postcode / Zip",
          searchable: true,
        },
        {
          field: "selectedSticker",
          label: "Selected Sticker",
          searchable: true,
        },
      ],
    };
  },
};
</script>
