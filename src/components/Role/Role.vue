<template>
  <tr>
    <td>{{ role.roleName }}</td>
    <td>{{ role.description }}</td>
    <td>
      <button
        type="button"
        class="btn btn-secondary"
        data-toggle="modal"
        data-target="#editModal"
        v-on:click="getRole"
      >
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
      </button>
      <button type="button" class="btn btn-danger" v-on:click="deleteRole">
        <i class="fa fa-trash-o" aria-hidden="true"></i> Delete
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        data-toggle="modal"
        data-target="#setRoleMenuModal"
        v-on:click="getRole('menu')"
      >
        <i class="fa" aria-hidden="true">
          <img
            src="../../assets/menu-plus.svg"
            style="width:18px; margin-bottom:2px;"
          />
        </i>
        Add menu to role
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        data-toggle="modal"
        data-target="#setRoleUserModal"
        v-on:click="getRole('user')"
      >
        <i class="fa fa-user-plus" aria-hidden="true"></i> Add user to role
      </button>
    </td>

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
            <h5 class="modal-title" id="exampleModalLabel">Edit Role</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">Role Name:</span>
              </div>
              <div class="input-group col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Role Name"
                  v-model="roleSelected.roleName"
                />
              </div>
            </div>
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">Description:</span>
              </div>
              <div class="input-group col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Description"
                  v-model="roleSelected.description"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              id="btn-close-edit"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" v-on:click="editRole">
              Save
            </button>
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
  name: "role",
  props: {
    role: Object,
    roleSelected: Object
  },
  data() {
    return {
      roles: []
    };
  },
  methods: {
    getRole(name) {
      this.$emit("getRole", this.role.id, name);
    },
    editRole() {
      var data = {
        roleName: this.roleSelected.roleName,
        description: this.roleSelected.description
      };
      this.$emit("editRole", this.roleSelected.id, data);
    },
    deleteRole() {
      this.$emit("deleteRole", this.role.id);
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
