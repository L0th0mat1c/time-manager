<template>
  <div class="about">
    <h1>This is an about page</h1>
    <WorkingTimes userID="2" />
    <WorkingTime userID="1" />
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
};
</script>