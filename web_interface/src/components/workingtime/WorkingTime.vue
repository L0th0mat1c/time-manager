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
        this.$store
          .dispatch("requestPOST", {
            url: "workingtimes/" + this.userID,
            body: { working_time: { start: this.date[0], end: this.date[1] } },
          })
          .then(() => console.log("Working time created !!!"))
          .catch((err) => console.log(err));
      }
    },
    updateWorkingTime() {
      if (this.date[0] !== null && this.date[1] !== null) {
        this.$store
          .dispatch("requestPUT", {
            url: "workingtimes/" + this.workingTimeID,
            body: { working_time: { start: this.date[0], end: this.date[1] } },
          })
          .then(() => console.log("Working time updated !!!"))
          .catch((err) => console.log(err));
      }
    },
    deleteWorkingTime() {
      this.$store
        .dispatch("requestDELETE", {
          url: "workingtimes/" + this.workingTimeID,
        })
        .then(() => console.log("Working time deleted !!!"))
        .catch((err) => console.log(err));
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