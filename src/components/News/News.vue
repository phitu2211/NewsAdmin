<template>
  <tr>
    <td>{{ news.title }}</td>
    <td>{{ formatTime(news.createTime) }}</td>
    <td>{{ formatTime(news.updateTime) }}</td>
    <td>
      <button
        type="button"
        class="btn btn-info"
        @click="getNews"
        data-toggle="modal"
        data-target="#detailsModal"
      >
        <i class="fa fa-info" aria-hidden="true"></i> Details
      </button>

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
              <h5 class="modal-title" id="exampleModalLabel">
                Details News
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
                <div class="input-group col-sm-12">
                  <div class="editor-content" v-html="newsSelected.content" />
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
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <button type="button" class="btn btn-secondary" @click="editNews">
        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit
      </button>

      <button type="button" class="btn btn-danger" @click="deleteNews">
        <i class="fa fa-trash-o" aria-hidden="true"></i> Delete
      </button>
    </td>
  </tr>
</template>

<script>
import Multiselect from "vue-multiselect";
import axios from "../../untils/request.js";

export default {
  name: "news",
  props: {
    news: Object,
    newsSelected: Object
  },
  data() {
    return {
      roles: []
    };
  },
  methods: {
    editNews() {
      this.$router.push("/news/edit/" + this.news.id);
    },
    getNews() {
      this.$emit("getNews", this.news.id);
    },
    deleteNews() {
      this.$emit("deleteNews", this.news.id);
    },
    formatTime(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let dt = date.getDate();

      if (dt < 10) {
        dt = "0" + dt;
      }
      if (month < 10) {
        month = "0" + month;
      }

      return dt + "-" + month + "-" + year;
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
