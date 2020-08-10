<template>
  <div id="edit-news" class="edit-news">
    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-12" style="padding-left:0; padding-right:0;">
        <input type="text" class="form-control" placeholder="Title" v-model="title" />
      </div>
    </div>
    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-12" style="padding-left:0; padding-right:0;">
        <input type="text" class="form-control" placeholder="Url Image" v-model="urlImage" />
      </div>
    </div>
    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-10" style="padding-left:0; magrin-bottom:10px;">
        <treeselect
          placeholder="Category"
          v-model="listCategory"
          :loadOptions="loadOptions"
          :multiple="true"
          :options="optionsCategory"
          :normalizer="normalizer"
          :value-consists-of="valueConsistsOf"
        />
      </div>
      <div class="col-md-1" style="padding-right:0;">
        <button class="btn btn-primary" @click="clear">Clear</button>
      </div>
      <div class="col-md-1" style="padding-right:0;">
        <button class="btn btn-primary" @click="updateNews">Update</button>
      </div>
    </div>
    <tinymce
      apiKey="7vez42oahmah9c01h9quh4s9yq8yxs8thh64lqumdvbc3vt5"
      v-model="content"
      :init="{
        height: 500,
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap',
          'searchreplace visualblocks code fullscreen',
          'print preview anchor insertdatetime media',
          'paste code help wordcount table'
        ],
        toolbar:
          'undo redo | formatselect | bold italic | \
        alignleft aligncenter alignright | \
        bullist numlist outdent indent | help'
      }"
    ></tinymce>

    <button type="button" class="btn btn-primary" @click="back" style="margin-top:10px;">Back</button>
  </div>
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { LOAD_CHILDREN_OPTIONS } from "@riophae/vue-treeselect";
import axios from "../../untils/request";
import Tinymce from "@tinymce/tinymce-vue";
export default {
  components: {
    tinymce: Tinymce,
    Treeselect,
  },
  name: "edit-news",
  data() {
    return {
      id: "",
      title: "",
      urlImage: "",
      valueConsistsOf: "ALL",
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.subCategories,
        };
      },
      optionsCategory: [],
      listCategory: [],
      removeCategory: [],
      content: `<h1 style="text-align: center;">Create News!</h1>`,
    };
  },
  methods: {
    back() {
      document.getElementById("bb3f6a6b-ae62-4a78-81e4-0eb8a4a033e3").click();
    },
    updateNews() {
      var postData = {
        addCategoryIds: this.listCategory,
        removeCategoryIds: this.removeCategory.filter(
          (x) => this.listCategory.indexOf(x) < 0
        ),
        title: this.title,
        content: this.content,
        urlImage: this.urlImage,
      };

      axios
        .put("/news/" + this.id, postData)
        .then((response) => {
          console.log(response);
          if (response.data.status == "Sucess") {
            alert("Update news sucess");
            document
              .getElementById("bb3f6a6b-ae62-4a78-81e4-0eb8a4a033e3")
              .click();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    clear() {
      this.title = "";
      this.listCategory = [];
      this.content = "";
    },
    loadOptions({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) callback();
    },
    getNews() {
      this.id = this.$route.params.id;
      axios
        .get("/news/" + this.id)
        .then((response) => {
          this.listCategory = response.data.data.categories.map((x) => x.id);
          this.removeCategory = JSON.parse(JSON.stringify(this.listCategory));
          this.content = response.data.data.content;
          this.title = response.data.data.title;
          this.urlImage = response.data.data.urlImage;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  created() {
    this.getNews();
  },
  mounted() {
    axios
      .get("/categories?filter={}")
      .then((response) => {
        this.optionsCategory = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.edit-news {
  margin-top: 20px;
}
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
</style>
