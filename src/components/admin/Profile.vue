<template>
  <AdminLayout>
    <template #main>
      <div class="main-header">
        Main Header
      </div>
      <div class="main-content">
        Đây là trang profile
      </div>
    </template>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layouts/AdminLayout";
export default {
  name: "Profile",
  components:{
    AdminLayout
  }
}
</script>

<style scoped>

</style>