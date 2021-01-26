<template>
  <AdminLayout>
    <template #main>
      <div class="main-header">
        Main Header
      </div>
      <div class="main-content">
        <div class="listTodo">
          <div class="todo"></div>
        </div>
      </div>
    </template>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layouts/AdminLayout";

export default {
  name: "Admin",
  components: {
    AdminLayout
  }
}
</script>

<style scoped lang="scss">
.main-header{
  min-height: 40px;
  max-height: 40px;
  overflow: hidden;
  padding: 0;
  background-color: rgba(0, 0, 0, .32);
}

.listTodo{
  background: red;
  width: 250px;
  height: 500px;
}
</style>