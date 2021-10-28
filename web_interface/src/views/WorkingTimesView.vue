<template>
  <div>
    <el-button type="primary" disabled v-on:click="openCreateWt" v-if="edit">
      <fa icon="plus" size="m2" /> ADD
    </el-button>
    <el-button type="primary" v-on:click="openCreateWt" v-else>
      <fa icon="plus" size="m2" /> ADD
    </el-button>
    <WorkingTimes :userID="$route.params.userID" :btnDisable="edit" />
    <WorkingTime
      :userID="$route.params.userID"
      :workingTimeID="$route.params.wtID"
      v-if="edit"
    />
  </div>
</template>

<script>
import WorkingTimes from "../components/workingtime/WorkingTimes.vue";
import WorkingTime from "../components/workingtime/WorkingTime.vue";

export default {
  components: {
    WorkingTimes,
    WorkingTime,
  },
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
    values: {
      required: false,
      default: [null, null],
    },
  },
  methods: {
    openCreateWt() {
      this.$router.push({
        name: "WorkCreate",
        params: { userID: this.$route.params.userID },
      });
    },
  },
};
</script>