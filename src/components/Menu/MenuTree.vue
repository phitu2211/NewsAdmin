<template>
  <div>
    <div
      :style="{ 'margin-left': `${depth * 25}px` }"
      class="node cursor-pointer"
      :class="{ active: node.id == selected }"
      @click="nodeClicked"
    >
      <span>
        <i
          v-if="hasChildren"
          class="fa"
          :class="{ 'fa-caret-right': !expanded, 'fa-caret-down': expanded }"
          aria-hidden="true"
        ></i>
        {{ node.menuName }}
      </span>
    </div>
    <menu-tree
      :node="child"
      v-for="child in node.subMenus"
      :key="child.id"
      :selected="selected"
      :isEdited="isEdited"
      :depth="depth + 1"
      v-show="expanded"
      @onClick="node => $emit('onClick', node)"
    />
  </div>
</template>

<script>
export default {
  name: "menu-tree",
  data() {
    return {
      expanded: false
    };
  },
  props: {
    node: Object,
    depth: {
      type: Number,
      default: 0
    },
    checked: {
      type: Boolean,
      default: false
    },
    selected: {
      type: String,
      default: ""
    },
    isEdited: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    nodeClicked() {
      if (!this.isEdited) {
        this.expanded = !this.expanded;
        this.$emit("onClick", this.node);
      }
    }
  },
  computed: {
    isParent() {
      return this.node.parentId == null ? true : false;
    },
    hasChildren() {
      return this.node.subMenus != null && this.node.subMenus.length > 0;
    }
  }
};
</script>

<style>
.active {
  background-color: rgb(185, 185, 185);
  color: blue;
}
.node {
  padding: 9px;
  border-radius: 4px;
  margin-bottom: 5px;
}
.node:hover {
  background-color: #eee;
  border-radius: 4px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
