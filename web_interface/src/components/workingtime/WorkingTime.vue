<template>
  <div>
    <el-date-picker
      type="datetimerange"
      range-separator="To"
      start-placeholder="Start date"
      end-placeholder="End date"
      v-model="date"
    >
    </el-date-picker>
    <el-button type="primary" v-on:click="createWorkingTime" v-if="create"
      >Create</el-button
    >
    <el-button type="primary" v-on:click="updateWorkingTime" v-else
      >Update</el-button
    >
    <el-button
      type="danger"
      v-on:click="deleteWorkingTime"
      v-if="create === false"
      >Delete</el-button
    >
    <el-button round v-on:click="closeEditor">Cancel</el-button>
  </div>
</template>

<script>
export default {
  name: "WorkingTimes",
  data() {
    return {
      date: [null, null],
      create: true,
    };
  },
  props: {
    userID: [String, Number],
    workingTimeID: {
      type: [String, Number],
      required: false,
      default: -1,
    },
  },
  methods: {
    createWorkingTime() {
      if (this.date[0] !== null && this.date[1] !== null) {
        let config = {
          method: "POST",
          body: JSON.stringify({
            working_time: {
              start: this.date[0],
              end: this.date[1],
            },
          }),
        };
        fetch("http://localhost:4000/api/workingtimes/" + this.userID, config);
      }
    },
    updateWorkingTime() {
      console.log("Update this workingtime");
    },
    deleteWorkingTime() {
      let config = {
        method: "DELETE",
      };
      fetch(
        "http://localhost:4000/api/workingtimes/" + this.workingTimeID,
        config
      );
    },
    initComponent() {
      if (this.workingTimeID > 0) {
        this.create = false;
        fetch(
          "http://localhost:4000/api/workingtimes/" +
            this.userID +
            "/" +
            this.workingTimeID
        )
          .then((rep) => rep.json())
          .then((data) => {
            console.log(data);
            this.date = [data.data.start, data.data.end];
          });
      }
    },
    closeEditor() {
      this.$router.push({ name: "Work", params: { userID: this.userID } });
    },
  },
  created() {
    this.initComponent();
  },
};
</script>