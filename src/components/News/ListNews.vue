<template>
  <div class="table-responsive list-news">
    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-1" style="padding-left:15px;padding-right:0;padding-top:4px;">
        <label>Ngày Tạo:</label>
      </div>
      <div class="col-md-5">
        <date-range-picker
          :inputStyle="inputStyle"
          :value="createTime"
          @input="logCreateTime"
          min="2020-1-1"
          max="2030-01-01"
          :dayStr="dayStr"
          placeholder="Từ Ngày - Đến Ngày "
          :popperProps="popperProps"
          :rangeSeparator="rangeSeparator"
        />
      </div>
      <div class="col-md-6" style="padding-left:0; padding-right:0;">
        <input type="text" class="form-control" placeholder="Title" v-model="objFilter.title" />
      </div>
    </div>
    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-1" style="padding-left:15px;padding-right:0;padding-top:4px;">
        <label>Ngày Sửa:</label>
      </div>
      <div class="col-md-5">
        <date-range-picker
          :inputStyle="inputStyle"
          :value="updateTime"
          @input="logUpdateTime"
          min="2020-1-1"
          max="2030-01-01"
          :dayStr="dayStr"
          placeholder="Từ Ngày - Đến Ngày "
          :popperProps="popperProps"
          :rangeSeparator="rangeSeparator"
        />
      </div>
      <div class="col-md-6" style="padding-right:0px;padding-left:0px;">
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
    </div>
    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-6" style="text-align:left; padding-left:0;">
        <button type="button" class="btn btn-primary" @click="createNews">
          <i class="fa fa-plus" aria-hidden="true"></i> Create
        </button>
      </div>
      <div class="col-md-6" style="text-align:right; padding-right:0;">
        <button type="button" class="btn btn-primary" v-on:click="clear">
          <i class="fa fa-eraser" aria-hidden="true"></i> Clear
        </button>
        <button type="button" class="btn btn-primary" v-on:click="searchNews">
          <i class="fa fa-search" aria-hidden="true"></i> Search
        </button>
      </div>
    </div>
    <table class="table table-bordered">
      <tr>
        <th scope="col">Title</th>
        <th>Create Time</th>
        <th>Update Time</th>
        <th scope="col">Action</th>
      </tr>
      <news
        v-for="news in response.data"
        v-bind:key="news.id"
        v-bind:news="news"
        v-bind:newsSelected="newsSelected"
        v-on:deleteNews="deleteNews"
        v-on:getNews="getNews"
      ></news>
    </table>

    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-6" style="text-align:left; padding-left:0;">
        <ul class="pagination">
          <li class="page-item" v-bind:class="{ disabled: !response.hasPreviousPage }">
            <a class="page-link" aria-label="Previous" v-on:click="prePage">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-show="objFilter.pageNumber - 1 > 0">
            <a class="page-link" v-on:click="prePage">{{ objFilter.pageNumber - 1 }}</a>
          </li>
          <li class="page-item" style="color:blue;">
            <a class="page-link currentPage" style="cursor:context-menu;">
              {{
              objFilter.pageNumber
              }}
            </a>
          </li>
          <li class="page-item" v-show="objFilter.pageNumber + 1 <= response.totalPage">
            <a class="page-link" v-on:click="nextPage">{{ objFilter.pageNumber + 1 }}</a>
          </li>
          <li class="page-item" v-bind:class="{ disabled: !response.hasNextPage }">
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
import "../../../node_modules/@livelybone/vue-datepicker/lib/css/index.css";
import News from "./News.vue";
import { Datepicker, DateRangePicker } from "@livelybone/vue-datepicker";
import axios from "../../untils/request.js";
import "vue-select/dist/vue-select.css";
export default {
  name: "list-news",
  data() {
    return {
      prePageSize: 5,
      valueConsistsOf: "ALL",
      response: {},
      normalizer(node) {
        return {
          id: node.id,
          label: node.name,
          children: node.subCategories,
        };
      },
      newsSelected: {},
      optionsCategory: [],
      listCategory: [],
      objFilter: {
        title: "",
        pageNumber: 1,
        pageSize: 5,
      },
      rangeSeparator: "Đến",
      dayStr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      createTime: [],
      updateTime: [],
      inputStyle: { padding: "8px" },
      popperProps: {
        arrowPosition: "start",
        arrowOffsetScaling: 1,
        popperOptions: {
          placement: "bottom-start",
          positionFixed: true,
          // more options in https://popper.js.org
        },
      },
    };
  },
  methods: {
    logCreateTime: function (val) {
      this.createTime = val;
      console.log(val);
    },
    logUpdateTime: function (val) {
      this.updateTime = val;
      console.log(val);
    },
    createNews() {
      document.getElementById("e73b9608-d853-44d2-b73b-2ab6ff9e0424").click();
    },
    clear() {
      this.objFilter = {
        title: "",
        pageNumber: 1,
        pageSize: 5,
      };
      this.searchNews();
    },
    prePage() {
      this.objFilter.pageNumber--;
      this.searchNews();
    },
    nextPage() {
      this.objFilter.pageNumber++;
      this.searchNews();
    },
    searchNews() {
      this.objFilter.categoryIds = this.listCategory;
      let filter = JSON.stringify(this.objFilter);
      console.log(this.objFilter);
      axios
        .get("/news?filter=" + filter)
        .then((response) => {
          this.response = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    getNews(id) {
      axios
        .get("/news/" + id)
        .then((response) => {
          if (response.data.status == "Sucess") {
            this.newsSelected = response.data.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    deleteNews(id) {
      axios
        .delete("/news/" + id)
        .then((response) => {
          if (response.data.status == "Sucess") {
            this.response.data = this.response.data.filter(
              (post) => post.id != id
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    loadOptions({ action, parentNode, callback }) {
      if (action === LOAD_CHILDREN_OPTIONS) callback();
    },
  },
  components: {
    Treeselect,
    News,
    Datepicker,
    DateRangePicker,
  },
  mounted() {
    axios
      .get("/news?filter={pageNumber: 1,pageSize: 5}")
      .then((response) => {
        this.response = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
    axios
      .get("/categories?filter={}")
      .then((response) => {
        this.optionsCategory = response.data.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  computed: {},
};
</script>
<style>
.list-news {
  margin-top: 20px;
  text-align: center;
}
.currentPage:hover {
  background-color: transparent;
}
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
