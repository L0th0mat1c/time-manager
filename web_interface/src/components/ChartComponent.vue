<template>
  <div class="chartcomponent">
    <line-chart :curve="false" :data="{'2021-01-01': 11, '2021-01-04': 6,'2021-01-06': 13, '2021-01-10': 7}"></line-chart><br>
    <pie-chart :donut="true" :data="[['Temps travaillé', 44], ['Temps de repos', 23]]"></pie-chart><br>
    <bar-chart :data="[['Work', 805], ['Play', 1492]]"></bar-chart>
  </div>
</template>

<script>
export default {
  name: "ChartComponent",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
