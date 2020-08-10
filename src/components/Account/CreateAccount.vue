<template>
  <div class="create-account">
    <form>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputEmail">Email</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="Email"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPassword">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="inputPasswor4"
            placeholder="Password"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="firstName">First Name</label>
          <input
            v-model="firstName"
            type="text"
            class="form-control"
            id="firstName"
            placeholder="First Name"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="lastName">Last Name</label>
          <input
            v-model="lastName"
            type="text"
            class="form-control"
            id="lastName"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="address">Address</label>
          <input
            type="text"
            v-model="address"
            class="form-control"
            id="address"
            placeholder="Address"
          />
        </div>
        <div class="form-group col-md-2">
          <label for="age">Age</label>
          <input
            v-model="age"
            placeholder="Age"
            type="number"
            class="form-control"
            id="age"
            min="10"
            max="100"
          />
        </div>
        <div class="form-group col-md-4">
          <label class>Role</label>
          <multiselect
            v-model="role"
            placeholder="Choose role"
            label="roleName"
            track-by="id"
            :options="options"
            :multiple="true"
            :taggable="true"
            @tag="addTag"
          ></multiselect>
        </div>
      </div>
    </form>
    <button v-on:click="createAccount" class="btn btn-primary">Create</button>
    <a href="#/account">
      <button class="btn btn-primary" id="back">Back</button>
    </a>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";
import axios from "../../untils/request.js";

export default {
  name: "create-account",
  components: { Multiselect },
  data() {
    return {
      email: null,
      password: null,
      firstName: null,
      lastName: null,
      address: null,
      age: null,
      role: [],
      options: []
    };
  },
  methods: {
    createAccount() {
      axios
        .post("/register", {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          age: this.age,
          role: this.role.map(r => r.roleName)
        })
        .then(function(response) {
          console.log(response.data);
          if (response.data.status == "Sucess") {
            alert("Tạo tài khoản thành công");
            document.getElementById("back").click();
          }
        })
        .catch(function(error) {
          alert("Tạo tài khoản thất bại");
          console.log(error);
        });
    },
    addTag(newTag) {
      this.role.push(newTag.roleName);
    }
  },
  mounted() {
    axios
      .get("/roles?filter={}")
      .then(response => {
        this.options = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
.create-account {
  margin-top: 20px;
}
.multiselect__tags {
  height: 38px;
  min-height: 38px;
  display: block;
  padding: 6px 40px 0 8px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  background: #fff;
  font-size: 14px;
}
</style>
