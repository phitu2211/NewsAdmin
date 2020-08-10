<template>
  <div>
    <div
      class="col-md-12"
      style=" padding-left:0; padding-right:0; display:flex"
    >
      <div
        class="col-md-6"
        style="text-align:left; padding-left:0; margin-top:20px"
      >
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          @click="clearModalCreate"
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
                <h5 class="modal-title" id="exampleModalLabel">Create Menu</h5>
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
                    <span class="label-edit">Menu Name:</span>
                  </div>
                  <div class="input-group col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Menu Name"
                      v-model="menuCreate.menuName"
                    />
                  </div>
                </div>
                <div class="row row-margin">
                  <div class="input-group col-sm-2">
                    <span class="label-edit">Href:</span>
                  </div>
                  <div class="input-group col-sm-4">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="#/href"
                      v-model="menuCreate.href"
                    />
                  </div>
                  <div class="input-group col-sm-2">
                    <span class="label-edit">Icon:</span>
                  </div>
                  <div class="input-group col-sm-4">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="fa-icon"
                      v-model="menuCreate.icon"
                    />
                  </div>
                </div>
                <div class="row row-margin">
                  <div class="input-group col-sm-2">
                    <span class="label-edit">Parent Id:</span>
                  </div>
                  <div class="input-group col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Parent Id"
                      v-model="menuCreate.parentId"
                    />
                  </div>
                </div>
                <div class="row row-margin">
                  <div class="input-group col-sm-2">
                    <span class="label-edit">Role:</span>
                  </div>
                  <div class="input-group col-sm-10">
                    <multiselect
                      v-model="menuCreate.role"
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
                >
                  Cancel
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="createMenu"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-md-6"
        style="text-align:right; padding-right:0; margin-top:20px"
      >
        <button type="button" class="btn btn-danger" @click="deleteMenu">
          <i class="fa fa-trash-o" aria-hidden="true"></i> Delete
        </button>
        <button type="button" class="btn btn-secondary" @click="editMenu">
          <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
          {{ stringEdit }}
        </button>
      </div>
    </div>
    <div style="display:flex; margin-top: 10px">
      <div
        class="col-md-4"
        style="overflow: auto; text-align:left; padding-left:0; padding-right:0;"
      >
        <menu-tree
          :node="node"
          v-for="node in data"
          :key="node.id"
          @onClick="onClick"
          :selected="nodeSelected.id"
          :isEdited="isEdited"
        />
      </div>
      <div class="col-md-8" style="padding-left:0; padding-right:0;">
        <form>
          <div class="form-row">
            <div class="form-group col-md-2" style="text-align:right;">
              <label style="margin: 5px;" for="id">Id:</label>
            </div>
            <div class="form-group col-md-10">
              <input
                disabled
                v-model="nodeSelected.id"
                type="text"
                class="form-control"
                id="id"
                placeholder="Menu Id"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-2" style="text-align:right;">
              <label style="margin: 5px;" for="menuName">Name:</label>
            </div>
            <div class="form-group col-md-4">
              <input
                :disabled="isDisable"
                v-model="nodeSelected.menuName"
                type="text"
                class="form-control"
                id="menuName"
                placeholder="Menu Name"
              />
            </div>
            <div class="form-group col-md-1" style="text-align:right;">
              <label style="margin: 5px;">Role:</label>
            </div>
            <div class="form-group col-md-5">
              <multiselect
                :disabled="isDisable"
                v-model="nodeSelected.role"
                placeholder="Role"
                :options="roles"
                :multiple="true"
                :taggable="true"
              ></multiselect>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-2" style="text-align:right;">
              <label style="margin: 5px;" for="icon">Icon:</label>
            </div>
            <div class="form-group col-md-4">
              <input
                :disabled="isDisable"
                v-model="nodeSelected.icon"
                type="text"
                class="form-control"
                id="icon"
                placeholder="Icon"
              />
            </div>
            <div class="form-group col-md-1" style="text-align:right;">
              <label style="margin: 5px;" for="href">Href:</label>
            </div>
            <div class="form-group col-md-5">
              <input
                :disabled="isDisable"
                v-model="nodeSelected.href"
                type="text"
                class="form-control"
                id="href"
                placeholder="#/href"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-2" style="text-align:right;">
              <label style="margin: 5px;" for="parentId">Parent Id:</label>
            </div>
            <div class="form-group col-md-10">
              <input
                :disabled="isDisable"
                v-model="nodeSelected.parentId"
                type="text"
                class="form-control"
                id="parentId"
                placeholder="Parent Id"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-2" style="text-align:right;">
              <label style="margin: 5px;">Children:</label>
            </div>
            <div class="form-group col-md-10">
              <multiselect
                disabled
                v-model="nodeSelected.subMenus"
                placeholder="Children"
                label="menuName"
                :options="nodeSelected.subMenus"
                :multiple="true"
                :taggable="true"
              ></multiselect>
            </div>
          </div>
          <div class="form-row" style="text-align:right;">
            <div class="col-md-12">
              <button
                type="button"
                class="btn btn-primary"
                v-show="isEdited"
                @click="updateMenu"
              >
                <i class="fa fa-save" aria-hidden="true"></i> Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../untils/request";
import Multiselect from "vue-multiselect";
import MenuTree from "./MenuTree.vue";
export default {
  components: {
    MenuTree,
    Multiselect
    // TreeViewPlugin
  },
  name: "list-menu",
  data() {
    return {
      menuCreate: {
        href: "",
        icon: "",
        menuName: "",
        parentId: "",
        role: []
      },
      roles: [],
      undo: {},
      stringEdit: "Edit",
      isEdited: false,
      nodeSelected: { role: [], subMenus: [], id: "" },
      data: []
      //   fields: {},
      //   checkedNodes: []
    };
  },
  methods: {
    clearModalCreate() {
      this.menuCreate = {
        menuName: "",
        parentId: "",
        role: []
      };
    },
    createMenu() {
      axios
        .post("/menu", this.menuCreate)
        .then(response => {
          if (response.data.status == "Sucess") {
            alert("Creat menu sucess");
            document.getElementById("btn-close").click();
            this.getMenu();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteMenu() {
      axios
        .delete("/menu/" + this.nodeSelected.id)
        .then(response => {
          console.log(response);
          if (response.data.status == "Sucess") {
            this.getMenu();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMenu() {
      axios
        .get("/menus?filter={}")
        .then(response => {
          this.data = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateMenu() {
      var updateData = {
        menuName: this.nodeSelected.menuName,
        href: this.nodeSelected.href,
        icon: this.nodeSelected.icon,
        parentId: this.nodeSelected.parentId,
        addRoles: this.nodeSelected.role,
        removeRoles: this.roles.filter(
          r => this.nodeSelected.role.indexOf(r) < 0
        )
      };
      axios
        .put("/menu/" + this.nodeSelected.id, updateData)
        .then(response => {
          if (response.data.status == "Sucess") {
            alert("Edit Menu Sucess");
            this.getMenu();
            this.isEdited = !this.isEdited;
            this.stringEdit = this.isEdited ? "Undo" : "Edit";
            document.getElementsByClassName(
              "multiselect__select"
            )[0].style.display = this.isEdited ? "block" : "none";
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    editMenu() {
      if (this.nodeSelected.id != "") {
        if (this.stringEdit == "Undo")
          this.nodeSelected = JSON.parse(JSON.stringify(this.undo));
        else this.undo = JSON.parse(JSON.stringify(this.nodeSelected));

        this.isEdited = !this.isEdited;
        this.stringEdit = this.isEdited ? "Undo" : "Edit";

        document.getElementsByClassName(
          "multiselect__select"
        )[0].style.display = this.isEdited ? "block" : "none";
      }
    },
    onClick(node) {
      if (!this.isEdited) {
        this.nodeSelected = node;
        this.nodeSelected.subMenus =
          this.nodeSelected.subMenus == null ? [] : this.nodeSelected.subMenus;
      }
    }
  },
  computed: {
    isDisable() {
      return !this.isEdited;
    }
  },
  mounted() {
    axios
      .get("/menus?filter={}")
      .then(response => {
        this.data = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
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
.multiselect__select {
  display: none;
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
.row-margin {
  margin-bottom: 10px;
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
