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
                <h5 class="modal-title" id="exampleModalLabel">
                  Create Category
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
                    <span class="label-edit">Category Name:</span>
                  </div>
                  <div class="input-group col-sm-10">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Category Name"
                      v-model="categoryCreate.name"
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
                      v-model="categoryCreate.parentId"
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
                  @click="createCategory"
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
        <button type="button" class="btn btn-danger" @click="deleteCategory">
          <i class="fa fa-trash-o" aria-hidden="true"></i> Delete
        </button>
        <button type="button" class="btn btn-secondary" @click="editCategory">
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
        <category-tree
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
              <label style="margin: 5px;" for="categoryName">Name:</label>
            </div>
            <div class="form-group col-md-4">
              <input
                :disabled="isDisable"
                v-model="nodeSelected.name"
                type="text"
                class="form-control"
                id="categoryName"
                placeholder="Name Category"
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
                v-model="nodeSelected.subCategories"
                placeholder="Children"
                label="name"
                :options="nodeSelected.subCategories"
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
                @click="updateCategory"
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
import CategoryTree from "./CategoryTree.vue";
export default {
  components: {
    Multiselect,
    CategoryTree
  },
  name: "list-category",
  data() {
    return {
      categoryCreate: {
        name: "",
        parentId: ""
      },
      undo: {},
      stringEdit: "Edit",
      data: [],
      isEdited: false,
      nodeSelected: {
        subCategories: [],
        parentId: "",
        name: "",
        id: ""
      }
    };
  },
  methods: {
    clearModalCreate() {
      this.categoryCreate = {
        name: "",
        parentId: ""
      };
    },
    getCategory() {
      axios
        .get("/categories?filter={}")
        .then(response => {
          this.data = response.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    createCategory() {
      axios
        .post("/category", this.categoryCreate)
        .then(response => {
          if (response.data.status == "Sucess") {
            alert("Creat category sucess");
            document.getElementById("btn-close").click();
            this.getCategory();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    editCategory() {
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
    deleteCategory() {
      axios
        .delete("/category/" + this.nodeSelected.id)
        .then(response => {
          console.log(response);
          if (response.data.status == "Sucess") {
            this.getCategory();
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateCategory() {
      var updateData = {
        name: this.nodeSelected.name,
        parentId: this.nodeSelected.parentId
      };
      axios
        .put("/category/" + this.nodeSelected.id, updateData)
        .then(response => {
          if (response.data.status == "Sucess") {
            alert("Edit Menu Sucess");
            this.getCategory();
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
    onClick(node) {
      if (!this.isEdited) {
        this.nodeSelected = node;
        this.nodeSelected.subCategories =
          this.nodeSelected.subCategories == null
            ? []
            : this.nodeSelected.subCategories;
      }
    }
  },
  mounted() {
    axios
      .get("/categories?filter={}")
      .then(response => {
        this.data = response.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  computed: {
    isDisable() {
      return !this.isEdited;
    }
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
