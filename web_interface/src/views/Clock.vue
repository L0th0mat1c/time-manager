<template>
  <div class="home">
    <ClockComponent msg="Clock Component" />
  </div>
</template>

<script>
import ClockComponent from "@/components/ClockComponent.vue";

export default {
  name: "Clock",
  components: {
    ClockComponent,
  },
};
</script>
