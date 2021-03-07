<template>
  <div class="window-sidebar">
    <div class="window-module u-clearfix">
      <h3 class="mod-no-top-margin js-sidebar-add-heading">Thêm vào thẻ</h3>
      <div class="u-clearfix">
        <a class="button-link js-edit-labels" ref="label" @click="showControl($event,'label')" title="Nhãn">
          <span class="icon-sm icon-label"><i class="el-icon-price-tag"></i></span>
          <span class="js-sidebar-action-text">Nhãn</span>
        </a>
        <a class="button-link js-add-checklist-menu" @click="showControl($event,'checkList')" title="Việc cần làm">
          <span class="icon-sm icon-checklist"><i class="el-icon-folder-checked"></i></span>
          <span class="js-sidebar-action-text">Việc cần làm</span>
        </a>
        <a class="button-link datetime-btn" href="#"
           title="Thời gian hết hạn" style="position: relative">
          <span class="icon-sm"> <i class="el-icon-alarm-clock"></i></span>
          <span class="js-sidebar-action-text">Thời gian hết hạn</span>
          <el-date-picker
              type="datetime">
          </el-date-picker>
        </a>
        <a class="button-link js-attach" href="#" title="Đính kèm">
          <span class="icon-sm icon-attachment"><i class="el-icon-paperclip"></i></span>
          <span class="js-sidebar-action-text">Đính kèm</span>
        </a>
      </div>
    </div>
    <div class="window-module u-clearfix"><h3 class="mod-no-top-margin">Thao tác</h3>
      <div class="u-clearfix">
        <hr>
        <a class="button-link js-delete-card remove-sidebar hide negate" href="#" title="Xoá">
          <span class="icon-sm icon-remove"><i class="el-icon-minus"></i></span>
          <span class="js-sidebar-action-text">Xoá</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "DialogSibar",
  data(){
    return{
    }
  },
  methods:{
    showControl(e,type){
      let rect = e.target.getBoundingClientRect();
      let data = {
        left: rect.left - 571,
        top: rect.top - 110,
        type: type
      };
      this.$emit('showControl',data)
    },
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/dialog_sibar";
</style>