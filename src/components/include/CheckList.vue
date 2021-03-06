<template>
  <div class="checklist">
    <div class="window-module-title"><span
        class="window-module-title-icon icon-lg icon-checklist"><i
        class="el-icon-folder-checked"></i></span>
      <div class="editable" attr="name" >
        <h3 class="current" dir="auto" v-if="!showEditCheckList" @click="showEditCheckList = !showEditCheckList" >cv1</h3>
        <div class="window-module-title-options" v-if="!showEditCheckList">
          <a class="nch-button confirm-delete"
             href="#" style="margin: 0">Xóa</a>
        </div>
        <div class="edit edit-heavy" v-if="showEditCheckList">
          <textarea-autosize
              :value="checkList"
              class="description-draft"
              placeholder="Thêm mô tả chi tiết hơn..."
              ref="descriptionCard"
              :min-height="30"
          />
          <div class="checklist-title-edit-controls u-clearfix"><input
              class="nch-button nch-button--primary confirm mod-submit-edit js-save-checklist-title"
              type="submit" value="Lưu">
            <a class="icon-lg icon-close dark-hover cancel js-cancel-checklist-title" @click="showEditCheckList = !showEditCheckList">
            <i class="el-icon-close"></i>
          </a></div>
        </div>
      </div>
    </div>
    <div class="checklist-progress">
      <el-progress :percentage="50"></el-progress>
    </div>
    <div class="checklist-items-list js-checklist-items-list js-no-higher-edits ui-sortable">
      <CheckListChild/>
    </div>
    <div class="editable checklist-new-item u-gutter js-new-checklist-item" attr="newItem">
      <button class="new-checklist-item-button nch-button mt-4 hide-on-edit">Thêm một mục</button>
    </div>

  </div>
</template>

<script>

import CheckListChild from "@/components/include/CheckListChild";
export default {
  name: "CheckList",
  props:['checkList'],
  components:{
    CheckListChild
  },
  methods:{

  },
  data(){
    return{
      showEditCheckList: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/check_list";
</style>