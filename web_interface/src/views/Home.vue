<template>
  <div v-if="this.worktimesForUser.length > 0">
    <line-chart :data="this.worktimesForUser" />
    <column-chart :data="this.worktimesForUser"></column-chart>
    <div v-for="time in worktimesForUser" :key="time.id">
      <span>{{ time.end }}</span>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import { computed } from "vue";
import { useStore } from "vuex";
import moment from "moment";

export default {
  name: "Home",

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
    worktimesForUser: [],
  }),
  mounted() {
    this.getWorkTimes();
  },
  methods: {
    getWorkTimes() {
      this.$store
        .dispatch("requestGET", { url: `workingtimes/${this.user.id}` })
        .then(
          (resp) =>
            (this.worktimesForUser = resp.map((ele) => [
              moment(ele.start).format("ddd DD -MM -YYYY"),
              moment(ele.end).diff(moment(ele.start), "hours"),
            ])),
          console.log(this.worktimesForUser)
        )

        .catch((err) => console.log(err));
    },
  },
};
</script>
