<template>
  <el-container v-if="user && user.email" style="height: 100vh">
    <el-aside width="250px">
      <img
        style="height: 150px; width: 150px; margin: 10px"
        alt="Vue logo"
        src="../assets/time_manager_logo.png"
      />

      <el-menu id="v-for-object">
        <el-submenu
          v-for="(list, index) in listRoutes"
          :key="list.route"
          :index="index + 1"
        >
          <router-link :to="list.route">
            <el-menu-item :index="index + 1">
              <el-row justify="center" :gutter="20">
                <el-col :span="8"><fa :icon="list.icon" size="lg" /></el-col>
                <el-col :span="8"
                  ><span style="font-size: 18px">{{
                    list.name.charAt(0).toUpperCase() + list.name.slice(1)
                  }}</span></el-col
                >
              </el-row>
            </el-menu-item>
          </router-link>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 18px">
        <fa icon="cog" />
        <span style="margin-left: 20px">{{ user.email }}</span>
        <el-button
          style="margin-left: 20px"
          v-if="user && user.email"
          type="primary"
          v-on:click="logout"
          >Logout</el-button
        >
      </el-header>

      <el-main><router-view /> </el-main>
    </el-container>
  </el-container>
  <el-container style="margin: 20%" v-else>
    <Login />
  </el-container>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Login from "./Login.vue";

export default {
  components: { Login },
  el: "#v-for-object",
  setup() {
    const store = useStore();
    const user = computed(
      () => store.state.user && JSON.parse(store.state.user)
    );

    return {
      user,
    };
  },
  data: () => ({
    listRoutes: [
      { route: "/", name: "home", icon: "home" },
      { route: "/workingtimes/1", name: "work", icon: "business-time" },
      { route: "/about", name: "about", icon: "question" },
      { route: "/clock/test", name: "Clock", icon: "clock" },
      { route: "/chartManager/test", name: "Charts", icon: "star" },
    ],
  }),
  mounted() {
    console.log(this.listRoutes);
    console.log(this.user);
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.el-header {
  background-color: #545c64;
  color: var(--el-text-color-primary);
  line-height: 60px;
}
.el-aside {
  color: var(--el-text-color-primary);
  font-size: 30;
  background-color: #545c64;
  height: 100vh;
}
a {
  text-decoration: none;
  color: white;
}
.el-menu-item {
  background-color: #545c64;
  height: 100px;
}
</style>
