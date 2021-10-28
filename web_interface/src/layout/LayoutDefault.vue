<template>
  <el-container style="height: 100vh">
    <el-aside width="220px">
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
                  ><span style="font-size: 20px">{{
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
        <span style="margin-left: 20px">Tom</span>
      </el-header>

      <el-main><router-view /> </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  el: "#v-for-object",
  data: () => ({
    listRoutes: [
      { route: "/", name: "home", icon: "home" },
      { route: "about", name: "about", icon: "question" },
    ],
  }),
  mounted() {
    console.log(this.listRoutes);
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
