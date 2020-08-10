import { userService } from "../../services";
import router from "../../router";

const token = localStorage.getItem("token");
const state = {
  loginState: token
    ? { status: { loggedIn: true }, token }
    : { status: {}, token: null },
  infoAccount: {}
};

const getters = {
  loginState: state => state.loginState,
  infoAccount: state => state.infoAccount
};

const actions = {
  login({ dispatch, commit }, { email, password }) {
    commit("loginRequest", { email });

    userService.login(email, password).then(
      response => {
        commit("loginSuccess", response.data.data);
        router.push("/dashboard");
        location.reload();
      },
      error => {
        commit("loginFailure", error);
      }
    );
  }
};

const mutations = {
  loginRequest(state, token) {
    state.loginState.status = { loggingIn: true };
    state.loginState.token = token;
  },
  loginSuccess(state, response) {
    state.loginState.status = { loggedIn: true };
    state.loginState.token = response.token;
    state.infoAccount = response.infoAccount;
  },
  loginFailure(state) {
    state.loginState.status = {};
    state.loginState.token = null;
  }
};

export const account = {
  namespaced: true,
  getters,
  state,
  actions,
  mutations
};
