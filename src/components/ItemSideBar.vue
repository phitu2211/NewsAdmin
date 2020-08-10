<template>
  <div>
    <div
      style="cursor:pointer"
      v-if="hasChildren"
      @click="itemClick"
      class="menu"
      :class="{ child: depth > 0, activeSidebar: menu.id == selected }"
    >
      <i class="fa menu-icon" :class="menu.icon" aria-hidden="true"></i>
      <span>{{ menu.menuName }}</span>
      <div style="position: relative; float:right;">
        <i
          style="position: absolute; top:19px; right:20px;"
          v-if="hasChildren"
          class="fa"
          :class="{ 'fa-caret-down': !expanded, 'fa-caret-up': expanded }"
          aria-hidden="true"
        ></i>
      </div>
    </div>
    <router-link
      class="menu"
      :id="menu.id"
      :class="{ child: depth > 0, activeSidebar: menu.id == selected }"
      v-else
      :to="getTo"
    >
      <i class="fa menu-icon" :class="menu.icon" aria-hidden="true"></i>
      <span>{{ menu.menuName }}</span>
      <div style="position: relative; float:right;">
        <i
          style="position: absolute; top:19px; right:20px;"
          v-if="hasChildren"
          class="fa"
          :class="{ 'fa-caret-down': !expanded, 'fa-caret-up': expanded }"
          aria-hidden="true"
        ></i>
      </div>
    </router-link>
    <!-- <div 
      style="cursor:pointer"
      v-else
      @click="itemClick"
      class="menu"
      :class="{ child: depth > 0, activeSidebar: menu.id == selected }">
              <router-link v-else :to="getTo">{{menu.menuName}}</router-link>
    </div>-->

    <!-- <div
      style="cursor:pointer"
      v-if="hasChildren"
      class="menu"
      :class="{ child: depth > 0, activeSidebar: menu.id == selected }"
      @click="itemClick"
    >
      <i class="fa menu-icon" :class="menu.icon" aria-hidden="true"></i>
      <span>{{ menu.menuName }}</span>
      <div style="position: relative; float:right;">
        <i
          style="position: absolute; top:19px; right:20px;"
          v-if="hasChildren"
          class="fa"
          :class="{ 'fa-caret-down': !expanded, 'fa-caret-up': expanded }"
          aria-hidden="true"
        ></i>
      </div>
    </div>
    <a
      :id="menu.id"
      v-else
      v-bind:href="menu.href"
      class="menu"
      :class="{ child: depth > 0, activeSidebar: menu.id == selected }"
      @click="itemClick"
    >
      <i class="fa menu-icon" :class="menu.icon" aria-hidden="true"></i>
      <span>{{ menu.menuName }}</span>
      <div style="position: relative; float:right;">
        <i
          style="position: absolute; top:19px; right:20px;"
          v-if="hasChildren"
          class="fa"
          :class="{ 'fa-caret-down': !expanded, 'fa-caret-up': expanded }"
          aria-hidden="true"
        ></i>
      </div>
    </a>-->
    <item-sidebar
      v-show="expanded"
      v-for="menu in menu.subMenus"
      :selected="selected"
      :key="menu.id"
      :menu="menu"
      @itemClicked="menu => $emit('itemClicked', menu)"
      :depth="depth + 1"
    />
  </div>
</template>

<script>
export default {
  name: "item-sidebar",
  props: {
    menu: {
      type: Object,
      default: {},
    },
    depth: {
      type: Number,
      default: 0,
    },
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    itemClick() {
      this.expanded = !this.expanded;
      this.$emit("itemClicked", this.menu);
    },
  },
  computed: {
    hasChildren() {
      return this.menu.subMenus != null && this.menu.subMenus.length > 0;
    },
    getTo() {
      return {
        path: this.menu.href.split("#")[1],
        name: this.menu.menuName.replace(/\s/g, ""),
        params: { authorize: this.menu.role },
      };
    },
  },
};
</script>

<style>
.activeSidebar {
  background-color: rgb(48, 65, 86);
  color: rgb(64, 158, 255);
}
.activeSidebar:hover {
  color: rgb(64, 158, 255);
}
.child:hover {
  background-color: #001528 !important;
}
.child {
  background-color: #1f2d3d !important;
}
</style>
