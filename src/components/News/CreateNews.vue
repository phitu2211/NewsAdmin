<template>
  <div id="create-news" class="create-news">
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
        <button class="btn btn-primary" @click="createNews">Create</button>
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
  name: "create-news",
  data() {
    return {
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
      content: `<h1 style="text-align: center;">Create News!</h1>`,
    };
  },
  methods: {
    createNews() {
      var postData = {
        categoryIds: this.listCategory,
        title: this.title,
        content: this.content,
        urlImage: this.urlImage,
      };
      console.log(postData);

      axios
        .post("/news", postData)
        .then((response) => {
          console.log(response);
          if (response.data.status == "Sucess") {
            alert("Create news sucess");
            this.clear();
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
      this.urlImage = "";
    },
    loadOptions({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) callback();
    },
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
.create-news {
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
