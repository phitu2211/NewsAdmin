<template>
  <div class="table-responsive list-role">
    <div
      class="modal fade"
      id="setRoleMenuModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Set Role For Menu
            </h5>
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
                  disabled
                  type="text"
                  class="form-control"
                  placeholder="Role Name"
                  v-model="roleSelected.roleName"
                />
              </div>
            </div>
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">List Menu:</span>
              </div>
              <div class="input-group col-sm-10">
                <treeselect
                  placeholder="Menu"
                  v-model="listMenu"
                  :loadOptions="loadOptions"
                  :multiple="true"
                  :options="optionsMenu"
                  :normalizer="normalizer"
                  :value-consists-of="valueConsistsOf"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              id="btn-close-set-role"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="setRoleForMenu"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="setRoleUserModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Set Role For User
            </h5>
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
                  disabled
                  type="text"
                  class="form-control"
                  placeholder="Role Name"
                  v-model="roleSelected.roleName"
                />
              </div>
            </div>
            <div class="row row-margin">
              <div class="input-group col-sm-2">
                <span class="label-edit">List User:</span>
              </div>
              <div class="input-group col-sm-10">
                <multiselect
                  v-model="listUser"
                  placeholder="User"
                  track-by="id"
                  label="userName"
                  :options="optionsUser"
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
              id="btn-close-set-role-account"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="setRoleForUser"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-6" style="padding-left:0;">
        <input
          type="text"
          class="form-control"
          placeholder="Role Name"
          v-model="objFilter.roleName"
        />
      </div>
      <div class="col-md-6" style="padding-right:0;">
        <input
          type="text"
          class="form-control"
          placeholder="Description"
          v-model="objFilter.description"
        />
      </div>
    </div>
    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-6" style="text-align:left; padding-left:0;">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#createModal"
        >
          <i class="fa fa-plus" aria-hidden="true"></i> Create
        </button>
        <div
          class="modal fade"
          id="createModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Create Role</h5>
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
                      v-model="createModal.roleName"
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
                      v-model="createModal.description"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  id="btn-close"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  v-on:click="createRole"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6" style="text-align:right; padding-right:0;">
        <button type="button" class="btn btn-primary" v-on:click="clear">
          <i class="fa fa-eraser" aria-hidden="true"></i> Clear
        </button>
        <button type="button" class="btn btn-primary" v-on:click="searchRole">
          <i class="fa fa-search" aria-hidden="true"></i> Search
        </button>
      </div>
    </div>
    <table class="table table-bordered">
      <tr>
        <th scope="col">Role Name</th>
        <th scope="col">Description</th>
        <th scope="col">Action</th>
      </tr>
      <role
        v-for="role in response.data"
        v-bind:key="role.id"
        v-bind:role="role"
        v-bind:roleSelected="roleSelected"
        v-on:deleteRole="deleteRole"
        v-on:getRole="getRole"
        v-on:editRole="editRole"
      ></role>
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
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import axios from "../../untils/request";
import Multiselect from "vue-multiselect";
import Role from "./Role.vue";
export default {
  name: "list-role",
  data() {
    return {
      optionsUser: [],
      listUser: [],
      nonMember: [],
      removeMenuIds: {},
      valueConsistsOf: "ALL",
      normalizer(node) {
        return {
          id: node.id,
          label: node.menuName,
          children: node.subMenus
        };
      },
      optionsMenu: [],
      listMenu: [],
      createModal: {
        roleName: "",
        description: ""
      },
      roleSelected: {},
      response: {},
      objFilter: {
        roleName: "",
        description: "",
        pageNumber: 1,
        pageSize: 5
      }
    };
  },
  computed: {},
  methods: {
    setRoleForMenu() {
      var postData = {
        addMenuIds: this.listMenu,
        removeMenuIds: this.removeMenuIds.filter(
          x => this.listMenu.indexOf(x) < 0
        )
      };
      axios
        .put("/role/menu/" + this.roleSelected.id, postData)
        .then(response => {
          console.log(response);
          if (response.data.status == "Sucess") {
            alert("Set Sucess");
            document.getElementById("btn-close-set-role").click();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    setRoleForUser() {
      var postData = {
        addAccountIds: this.listUser.map(x => x.id),
        removeAccountIds: this.nonMember.filter(
          x => this.listUser.map(y => y.id).indexOf(x) < 0
        )
      };
      console.log(postData);

      axios
        .put("/role/account/" + this.roleSelected.id, postData)
        .then(response => {
          console.log(response);
          if (response.data.status == "Sucess") {
            alert("Set Sucess");
            document.getElementById("btn-close-set-role-account").click();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadOptions({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) callback();
    },
    clear() {
      this.objFilter = {
        pageNumber: 1,
        pageSize: 5
      };
      this.searchRole();
    },
    prePage() {
      this.objFilter.pageNumber--;
      this.searchRole();
    },
    nextPage() {
      this.objFilter.pageNumber++;
      this.searchRole();
    },
    searchRole() {
      let filter = JSON.stringify(this.objFilter);
      axios
        .get("/roles?filter=" + filter)
        .then(response => {
          this.response = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getRole(id, name) {
      if (name == "menu")
        axios
          .get("/menu/role/" + id)
          .then(response => {
            this.removeMenuIds = response.data.data.role.map(x => x.id);
            this.listMenu = response.data.data.role.map(x => x.id);
          })
          .catch(function(error) {
            console.log(error);
          });
      else
        axios
          .get("/account/role/" + id)
          .then(response => {
            this.nonMember = response.data.data.members.map(x => x.id);
            this.listUser = response.data.data.members;
          })
          .catch(function(error) {
            console.log(error);
          });

      axios
        .get("/role/" + id)
        .then(response => {
          if (response.data.status == "Sucess") {
            this.roleSelected = response.data.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    editRole(id, data) {
      console.log(data);
      axios
        .put("/role/" + id, data)
        .then(response => {
          if (response.data.status == "Sucess") {
            alert("Update sucess");
            this.searchRole();
            document.getElementById("btn-close-edit").click();
          }
        })
        .catch(function(error) {
          console.log(error);
          alert("Update failed " + error);
        });
    },
    createRole() {
      axios
        .post("/role", this.createModal)
        .then(response => {
          if (response.data.status == "Sucess") {
            document.getElementById("btn-close").click();
            this.searchRole();
            alert("Create sucess");
          }
        })
        .catch(function(error) {
          console.log(error);
          alert("Update failed " + error);
        });
    },
    deleteRole(id) {
      axios
        .delete("/role/" + id)
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
    Role,
    Treeselect,
    Multiselect
  },
  mounted() {
    axios
      .get("/roles?filter={pageNumber: 1,pageSize: 5}")
      .then(response => {
        this.response = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get("/menus?filter={}")
      .then(response => {
        this.optionsMenu = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get("/accounts?filter={}")
      .then(response => {
        this.optionsUser = response.data.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style>
.vue-treeselect__multi-value-item {
  cursor: pointer;
  display: inline-table;
  background: #41b883;
  padding: 1px 4px;
  border: 1px solid transparent;
  border-radius: 5px;
  color: #fff;
  font-size: 12px;
  vertical-align: top;
}
.vue-treeselect__multi-value-item:hover .vue-treeselect__value-remove {
  color: #fff;
  background: #369a6e;
  border-radius: 5px;
}
.vue-treeselect__value-remove {
  color: #266d4d;
  padding-left: 5px;
  border: none;
  line-height: 0;
}
.list-role {
  margin-top: 20px;
  text-align: center;
}
.currentPage:hover {
  background-color: transparent;
}
</style>
