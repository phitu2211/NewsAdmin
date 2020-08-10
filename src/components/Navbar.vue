<template>
  <div>
    <nav
      class="navbar navbar-expand-lg border-bottom"
      style="
    padding-bottom: 4px;
    padding-top: 4px;"
    >
      <button class="btn btn-primary" id="menu-toggle" v-on:click="toggle">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              style="color:black"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {{ infoAccount.userName }}
            </a>
            <div
              class="dropdown-menu dropdown-menu-right"
              aria-labelledby="navbarDropdown"
            >
              <a class="dropdown-item" href="#">Infomation</a>
              <div class="dropdown-divider"></div>
              <button
                style="cursor:pointer"
                class="dropdown-item"
                href="#"
                @click="logOut"
              >
                Logout
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      infoAccount: {}
    };
  },
  props: {},
  mounted() {
    this.infoAccount = JSON.parse(localStorage.getItem("user"));
  },
  methods: {
    toggle() {
      this.$emit("toggle");
    },
    logOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      location.reload();
    }
  }
};
</script>

<style>
#wrapper {
  overflow-x: hidden;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style>
