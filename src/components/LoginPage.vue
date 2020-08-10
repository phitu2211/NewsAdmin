<template>
  <div id="login" class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="text"
          v-model="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': submitted && !email }"
        />
        <div v-show="submitted && !email" class="invalid-feedback">
          Email is required
        </div>
      </div>
      <div class="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          v-model="password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && !password }"
        />
        <div v-show="submitted && !password" class="invalid-feedback">
          Password is required
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" :disabled="loginState.status.loggingIn">
          Login
        </button>
        <img v-show="loginState.status.loggingIn" />
        <router-link to="/register" class="btn btn-link">Register</router-link>
      </div>
    </form>
    <div>
      Email: admin@admin.com Password: Admin@123
    </div>
    <div>
      Email: guest@guest.com Password: Guest@123
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      submitted: false
    };
  },
  computed: {
    ...mapState("account", ["loginState"])
  },
  created() {},
  methods: {
    ...mapActions("account", ["login"]),
    handleSubmit(e) {
      this.submitted = true;
      const { email, password } = this;
      if (email && password) {
        this.login({ email, password });
      }
    }
  }
};
</script>

<style>
.login {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 30em;
  height: 17em;
  margin-top: -15em;
  margin-left: -15em;
}
</style>
