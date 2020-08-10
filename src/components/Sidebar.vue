<template>
  <div class="sidebar">
    <div class="border-right" id="sidebar-wrapper">
      <div class="list-group list-group-flush">
        <ItemSideBar
          v-for="menu in response.data"
          :key="menu.id"
          :menu="menu"
          :selected="selected"
          @itemClicked="itemClicked"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../untils/request";
import ItemSideBar from "./ItemSideBar.vue";
export default {
  components: { ItemSideBar },
  name: "sidebar",
  data() {
    return {
      selected: "",
      response: {}
    };
  },
  methods: {
    itemClicked(menu) {
      this.selected = menu.id;
    }
  },
  mounted() {
    var postData = { roleNames: JSON.parse(localStorage.getItem("user")).role };
    axios
      .get("/menus?filter={}")
      .then(response => {
        this.response = response.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
.sidebar {
  background-color: rgb(48, 65, 86);
}

.menu-icon {
  margin-right: 16px;
}

.menu {
  display: block;
  color: #bfcbd9;
  padding-left: 20px;
  font-size: 14px;
  line-height: 56px;
  height: 56px;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
  transition-property: border-color, background-color, color;
  transition-duration: 0.3s, 0.3s, 0.3s;
  transition-timing-function: ease, ease, ease;
  transition-delay: 0s, 0s, 0s;
}

.menu:hover {
  color: #bfcbd9;
  background-color: #263445;
  text-decoration: none;
  border-radius: 3px;
}
</style>
