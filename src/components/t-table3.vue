<template>
  <div class="calendar">
    <table>
      <tbody>
        <tr><td>{{day1}}</td><td>{{day2}}</td><td>{{day3}}</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['day1', 'day2', 'day3']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calendar table{
  border: 1px solid #ccc;
  border-collapse: collapse;
}
tbody{
  text-align: center;
}
th,td{
  width: 50px;
  height: 30px;
  border: 1px solid #ccc;
}
</style>
