import { createStore } from "vuex";
import Axios from "axios";

export default createStore({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: localStorage.getItem("user") || null,
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
    authStatus: (state) => state.status,
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = "";
    },
  },
  actions: {
    login({ commit }) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        Axios.post("/login")
          .then((resp) => {
            const token = resp.data.token;
            const user = resp.data.user;
            localStorage.setItem("token", token);
            localStorage.setItem("user", user);
            Axios.defaults.headers.common["Authorization"] = token;
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    async requestlogin(_, { url }) {
      console.log(url);
      try {
        const { data } = await Axios.get(url);
        const user = data.data[0];
        localStorage.setItem("user", JSON.stringify(user));
        this.$router.push("/");
        // Axios.defaults.headers.common["Authorization"] = token;
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
      }
    },
    async requestGET(_, { url }) {
      try {
        const { data } = await Axios.get(url);
        return data.data;
        // Axios.defaults.headers.common["Authorization"] = token;
      } catch (err) {
        console.log(err);
        // localStorage.removeItem("token");
      }
    },
    async requestPOST(_, { url, body }) {
      try {
        await Axios.post(url, body);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
      }
    },
    async requestPUT(_, { url, body }) {
      try {
        await Axios.put(url, body);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
      }
    },
    async requestDELETE(_, { url }) {
      try {
        await Axios.delete(url);
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
      }
    },
    logout({ commit }) {
      commit("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete Axios.defaults.headers.common["Authorization"];
    },
  },
  modules: {},
});
