<template>
  <span class="card-label" :class="['card-label-'+color]">
    <span class="icon-sm icon-check card-label-selectable-icon">
      <i class="el-icon-check"></i>
    </span>
  </span>
</template>

<script>
export default {
  name: "DetailLabel",
  props:['color']
}
</script>

<style scoped>

</style>