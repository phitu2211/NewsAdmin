<template>
  <div class="table-responsive log">
    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-6" style="padding-left:0;">
        <select class="form-control" v-model="objFilter.level">
          <option selected disabled>Choose Level</option>
          <option>Warn</option>
          <option>Information</option>
        </select>
      </div>
      <div class="col-md-6" style="padding-right:0;padding-left:0;">
        <input type="text" class="form-control" placeholder="Message" v-model="objFilter.message" />
      </div>
    </div>
    <div style="display:flex; margin-bottom:10px;">
      <div class="col-md-6" style="text-align:left; padding-left:0;"></div>
      <div class="col-md-6" style="text-align:right; padding-right:0;">
        <button type="button" class="btn btn-primary" v-on:click="clear" id="btn-clear">
          <i class="fa fa-eraser" aria-hidden="true"></i> Clear
        </button>
        <button type="button" class="btn btn-primary" v-on:click="searchLog">
          <i class="fa fa-search" aria-hidden="true"></i> Search
        </button>
      </div>
    </div>
    <table class="table table-bordered">
      <tr>
        <th scope="col">Level</th>
        <th scope="col">Message</th>
      </tr>
      <tr v-for="log in response.data" :key="log.id">
        <td>{{log.level}}</td>
        <td>{{log.message}}</td>
      </tr>
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
import axios from "../../untils/request.js";
export default {
  name: "log",
  data() {
    return {
      scrollY: 0,
      response: {},
      objFilter: {
        level: "Choose Level",
        message: "",
        pageNumber: 1,
        pageSize: 50,
      },
    };
  },
  methods: {
    clear() {
      this.objFilter = {
        level: "",
        message: "",
        pageNumber: 1,
        pageSize: 50,
      };
      this.searchLog();
    },
    prePage() {
      this.objFilter.pageNumber--;
      this.searchLog();
    },
    nextPage() {
      this.objFilter.pageNumber++;
      this.searchLog();
    },
    searchLog() {
      let filter = JSON.stringify(this.objFilter);
      axios
        .get("/logs?filter=" + filter)
        .then((response) => {
          this.response = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    handleScroll(event) {
      console.log(event);
      console.log(document.getElementById("btn-clear"));
      this.scrollY = window.scrollY;
      console.log(this.scrollY);
      console.log(window.scrollY);
    },
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  components: {},
  mounted() {
    axios
      .get("/logs?filter={pageNumber: 1,pageSize: 5}")
      .then((response) => {
        this.response = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script>

<style>
.log {
  margin-top: 20px;
  text-align: center;
}
.currentPage:hover {
  background-color: transparent;
}
</style>