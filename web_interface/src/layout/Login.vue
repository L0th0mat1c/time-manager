<template>
  <el-row style="width: 80%" justify="left" :gutter="20">
    <el-col :span="18" :offset="6">
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
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      //   let email = this.email;
      //   let password = this.password;
      this.$store
        .dispatch("requestlogin", { url: `users?email=test` })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>
