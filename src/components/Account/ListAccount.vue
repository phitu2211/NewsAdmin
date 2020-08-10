<template>
  <div class="table-responsive list-account">
    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-3" style="padding-left:0;">
        <input
          type="email"
          class="form-control"
          placeholder="Email"
          v-model="objFilter.email"
        />
      </div>
      <div class="col-md-2" style="padding-left:0;">
        <input
          type="text"
          class="form-control"
          placeholder="First Name"
          v-model="objFilter.firstName"
        />
      </div>
      <div class="col-md-2" style="padding-left:0;">
        <input
          type="text"
          class="form-control"
          placeholder="Last Name"
          v-model="objFilter.lastName"
        />
      </div>
      <div class="col-md-1" style="padding-left:0;">
        <input
          type="number"
          min="10"
          max="100"
          class="form-control"
          placeholder="Age"
          v-model="objFilter.age"
        />
      </div>
      <div class="col-md-4" style="padding-right:0; padding-left:0; ">
        <input
          type="text"
          class="form-control"
          placeholder="Address"
          v-model="objFilter.address"
        />
      </div>
    </div>
    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-6" style="text-align:left; padding-left:0;">
        <button type="button" class="btn btn-primary" @click="createMenu">
          <i class="fa fa-plus" aria-hidden="true"></i> Create
        </button>
      </div>
      <div class="col-md-6" style="text-align:right; padding-right:0;">
        <button type="button" class="btn btn-primary" v-on:click="clear">
          <i class="fa fa-eraser" aria-hidden="true"></i> Clear
        </button>
        <button
          type="button"
          class="btn btn-primary"
          v-on:click="searchAccount"
        >
          <i class="fa fa-search" aria-hidden="true"></i> Search
        </button>
      </div>
    </div>
    <table class="table table-bordered">
      <tr>
        <th scope="col">First Name</th>
        <th scope="col">Last Name</th>
        <th scope="col">Email</th>
        <th scope="col">Age</th>
        <th scope="col">Address</th>
        <th scope="col">Action</th>
      </tr>
      <account
        v-for="account in response.data"
        v-bind:key="account.id"
        v-bind:account="account"
        v-bind:accountSelected="accountSelected"
        v-on:deleteAccount="deleteAccount"
        v-on:getAccount="getAccount"
        v-on:editAccount="editAccount"
      ></account>
    </table>

    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-6" style="text-align:left; padding-left:0;">
        <ul class="pagination">
          <li
            class="page-item"
            v-bind:class="{ disabled: !response.hasPreviousPage }"
          >
            <a class="page-link" aria-label="Previous" v-on:click="prePage">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-show="objFilter.pageNumber - 1 > 0">
            <a class="page-link" v-on:click="prePage">
              {{ objFilter.pageNumber - 1 }}
            </a>
          </li>
          <li class="page-item" style="color:blue;">
            <a class="page-link currentPage" style="cursor:context-menu;">{{
              objFilter.pageNumber
            }}</a>
          </li>
          <li
            class="page-item"
            v-show="objFilter.pageNumber + 1 <= response.totalPage"
          >
            <a class="page-link" v-on:click="nextPage">
              {{ objFilter.pageNumber + 1 }}
            </a>
          </li>
          <li
            class="page-item"
            v-bind:class="{ disabled: !response.hasNextPage }"
          >
            <a class="page-link" aria-label="Next" v-on:click="nextPage">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="col-md-6" style="text-align:right; padding-right:0;">
        <span>Page Size:</span>
        <select
          v-model="objFilter.pageSize"
          style="line-height: 1.25;color: #007bff; background-color: #fff; border: 1px solid #dee2e6;
          padding: 7px"
        >
          <option>1</option>
          <option>5</option>
          <option>10</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import Account from "./Account.vue";
import axios from "../../untils/request.js";
import "vue-select/dist/vue-select.css";
export default {
  name: "list-account",
  data() {
    return {
      prePageSize: 5,
      response: {},
      accountSelected: {},
      objFilter: {
        email: "",
        firstName: "",
        lastName: "",
        age: undefined,
        address: "",
        pageNumber: 1,
        pageSize: 5
      }
    };
  },
  methods: {
    createMenu() {
      document.getElementById("b45c2a24-3b29-427d-9530-badf66d62288").click();
    },
    clear() {
      this.objFilter = {
        email: "",
        firstName: "",
        lastName: "",
        age: undefined,
        address: "",
        pageNumber: 1,
        pageSize: 5
      };
      this.searchAccount();
    },
    prePage() {
      this.objFilter.pageNumber--;
      this.searchAccount();
    },
    nextPage() {
      this.objFilter.pageNumber++;
      this.searchAccount();
    },
    searchAccount() {
      let filter = JSON.stringify(this.objFilter);
      axios
        .get("/accounts?filter=" + filter)
        .then(response => {
          this.response = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAccount(id) {
      axios
        .get("/account/" + id)
        .then(response => {
          if (response.data.status == "Sucess") {
            this.accountSelected = response.data.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editAccount(id, data) {
      axios
        .put("/account/" + id, data)
        .then(response => {
          if (response.data.status == "Sucess") {
            alert("Update sucess");
            document.getElementById("btn-close-edit").click();
          }
        })
        .catch(function(error) {
          console.log(error);
          alert("Update failed " + error);
        });
    },
    deleteAccount(id) {
      axios
        .delete("/account/" + id)
        .then(response => {
          if (response.data.status == "Sucess") {
            this.response.data = this.response.data.filter(
              post => post.id != id
            );
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    Account
  },
  mounted() {
    axios
      .get("/accounts?filter={pageNumber: 1,pageSize: 5}")
      .then(response => {
        this.response = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  computed: {}
};
</script>

<style>
.list-account {
  margin-top: 20px;
  text-align: center;
}
.currentPage:hover {
  background-color: transparent;
}
</style>
