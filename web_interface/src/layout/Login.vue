<template>
  <el-row style="width: 80%" justify="left" :gutter="20">
    <el-col :span="18" :offset="6">
      <el-card style="background-color: #fcfcfc">
        <template #header>
          <div class="card-header">
            <span style="font-weight: bold; font-size: 20px">Se connecter</span>
          </div>
        </template>
        <el-form label-position="top" :model="formInline" label-width="100px">
          <el-form-item label="Email">
            <el-input
              v-model="formInline.email"
              placeholder="adresse email ..."
            ></el-input>
          </el-form-item>
          <el-form-item label="Mot de passe">
            <el-input
              v-model="formInline.password"
              placeholder="Mot de passe ..."
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">Valider</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      formInline: {
        email: "",
        password: "",
      },
    };
  },
  setup() {
    const open4 = (arg) => {
      ElMessage.error(arg);
    };
    return {
      open4,
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      //   let email = this.email;
      //   let password = this.password;
      this.$store
        .dispatch("requestlogin", { url: `users?email=test` })
        .then(() => {
          this.$router.go("/");
        })
        .catch((err) => this.open4(err));
    },
  },
};
</script>
<style scoped>
.card-header {
  /* display: flex; */
  justify-content: space-between;
  align-items: center;
}
</style>
