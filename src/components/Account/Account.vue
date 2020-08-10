<template>
  <tr>
    <td>{{ account.firstName }}</td>
    <td>{{ account.lastName }}</td>
    <td>{{ account.email }}</td>
    <td>{{ account.age }}</td>
    <td>{{ account.address }}</td>
    <td>
      <button
        type="button"
        class="btn btn-info"
        v-on:click="getAccount"
        data-toggle="modal"
        data-target="#detailsModal"
      >
        <i class="fa fa-info" aria-hidden="true"></i> Detail
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        data-toggle="modal"
        data-target="#editModal"
        v-on:click="getAccount"
      >
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
      </button>
      <button type="button" class="btn btn-danger" v-on:click="deleteAccount">
        <i class="fa fa-trash-o" aria-hidden="true"></i> Delete
      </button>
    </td>

    <div
      class="modal fade"
      id="detailsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Details Account</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">Email:</span>
              </div>
              <div class="input-group col-sm-10">
                <input
                  disabled
                  type="text"
                  class="form-control"
                  placeholder="Email"
                  v-bind:value="accountSelected.email"
                />
              </div>
            </div>
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">First Name:</span>
              </div>
              <div class="input-group col-sm-2">
                <input
                  disabled
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                  v-bind:value="accountSelected.firstName"
                />
              </div>
              <div class="input-group col-sm-2">
                <span class="label-edit">Last Name:</span>
              </div>
              <div class="input-group col-sm-3">
                <input
                  disabled
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                  v-bind:value="accountSelected.lastName"
                />
              </div>
              <div class="input-group col-sm-1">
                <span class="label-edit">Age:</span>
              </div>
              <div class="input-group col-sm-2">
                <input
                  disabled
                  type="number"
                  min="10"
                  max="100"
                  class="form-control"
                  v-bind:value="accountSelected.age"
                />
              </div>
            </div>
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">Address:</span>
              </div>
              <div class="input-group col-sm-10">
                <input
                  disabled
                  type="text"
                  class="form-control"
                  placeholder="Address"
                  v-bind:value="accountSelected.address"
                />
              </div>
            </div>
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">Role:</span>
              </div>
              <div class="input-group col-sm-10" id="role">
                <multiselect
                  disabled
                  v-model="accountSelected.role"
                  placeholder="Choose role"
                  :options="roles"
                  :multiple="true"
                  :taggable="true"
                ></multiselect>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              id="btn-close"
            >Close</button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="editModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Edit Account</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">Email:</span>
              </div>
              <div class="input-group col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email"
                  v-bind:value="accountSelected.email"
                />
              </div>
            </div>
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">Password:</span>
              </div>
              <div class="input-group col-sm-10">
                <input type="password" class="form-control" />
              </div>
            </div>
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">First Name:</span>
              </div>
              <div class="input-group col-sm-2">
                <input
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                  v-bind:value="accountSelected.firstName"
                />
              </div>
              <div class="input-group col-sm-2">
                <span class="label-edit">Last Name:</span>
              </div>
              <div class="input-group col-sm-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                  v-bind:value="accountSelected.lastName"
                />
              </div>
              <div class="input-group col-sm-1">
                <span class="label-edit">Age:</span>
              </div>
              <div class="input-group col-sm-2">
                <input
                  type="number"
                  min="10"
                  max="100"
                  class="form-control"
                  v-bind:value="accountSelected.age"
                />
              </div>
            </div>
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">Address:</span>
              </div>
              <div class="input-group col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Address"
                  v-bind:value="accountSelected.address"
                />
              </div>
            </div>
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">Role:</span>
              </div>
              <div class="input-group col-sm-10">
                <multiselect
                  v-model="accountSelected.role"
                  placeholder="Choose role"
                  :options="roles"
                  :multiple="true"
                  :taggable="true"
                ></multiselect>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              id="btn-close-edit"
            >Close</button>
            <button type="button" class="btn btn-primary" v-on:click="editAccount">Save</button>
          </div>
        </div>
      </div>
    </div>
  </tr>
</template>

<script>
import Multiselect from "vue-multiselect";
import axios from "../../untils/request.js";

export default {
  name: "account",
  props: {
    account: Object,
    accountSelected: Object
  },
  data() {
    return {
      roles: []
    };
  },
  methods: {
    getAccount() {
      this.$emit("getAccount", this.account.id);
    },
    editAccount() {
      var data = {
        password: this.accountSelected.password,
        firstName: this.accountSelected.firstName,
        lastName: this.accountSelected.lastName,
        address: this.accountSelected.address,
        age: this.accountSelected.age,
        addRoles: this.accountSelected.role,
        removeRoles: this.roles.filter(
          r => this.accountSelected.role.indexOf(r) < 0
        )
      };
      this.$emit("editAccount", this.accountSelected.id, data);
    },
    deleteAccount() {
      this.$emit("deleteAccount", this.account.id);
    }
  },
  components: {
    Multiselect
  },
  mounted() {
    axios
      .get("/roles?filter={}")
      .then(response => {
        this.roles = response.data.data.map(r => r.roleName);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
#role .multiselect .multiselect__select {
  display: none;
}
.row-margin {
  margin-bottom: 10px;
}
.multiselect__tags {
  height: 38px;
  display: block;
  padding: 6px 40px 0 8px;
  border-radius: 5px;
  border: 1px solid #e8e8e8;
  background: #fff;
  font-size: 14px;
}
.label-edit {
  display: -webkit-box;
  position: absolute;
  right: 0;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: right;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: center;
  white-space: nowrap;
  border-radius: 0.25rem;
}
</style>
