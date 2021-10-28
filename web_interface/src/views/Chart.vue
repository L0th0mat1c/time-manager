<template>
  <div class="chart">
    <ChartComponent msg="ChartComponent" />
  </div>
</template>

<script>
import ChartComponent from "@/components/ChartComponent.vue";

export default {
  name: "Chart",
  components: {
    ChartComponent,
  },
};
</script>
