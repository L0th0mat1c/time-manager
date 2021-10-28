<template>
  <div>
    <el-table stripe :data="values" :empty-text="statusText">
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="start" label="Start"> </el-table-column>
      <el-table-column prop="end" label="End"> </el-table-column>
      <el-table-column fixed="right" label="Edit">
        <template #default="scope">
          <el-button
            type="primary"
            circle
            disabled
            v-on:click="openWorkingTimeEditor(scope.$index)"
            v-if="btnDisable"
            ><fa icon="pencil-alt" size="lg"
          /></el-button>
          <el-button
            type="primary"
            circle
            v-on:click="openWorkingTimeEditor(scope.$index)"
            v-else
            ><fa icon="pencil-alt" size="lg"
          /></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "WorkingTimes",
  props: {
    userID: [String, Number],
    btnDisable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      values: [],
      statusText: "Loading ...",
    };
  },
  methods: {
    getWorkingTimes() {
      console.log("Get workingtimes of userID " + this.userID);
      fetch("http://localhost:4000/api/workingtimes/" + this.userID)
        .then((rep) => rep.json())
        .then((data) => {
          this.values = data.data;
          this.statusText = "No data for this user";
        });
    },
    openWorkingTimeEditor(index) {
      let id = this.values[index].id;
      this.$router.push({
        name: "WorkEdit",
        params: { userID: this.userID, wtID: id },
      });
    },
  },
  mounted() {
    this.getWorkingTimes();
  },
};
</script>