<template>
  <div class="checklist-item no-assignee no-due">
    <div class="checklist-item-checkbox enabled js-toggle-checklist-item"
         data-test-id="checklist-item-checkbox">
      <el-checkbox></el-checkbox>
    </div>
    <div class="checklist-item-details  editable" attr="name">
      <div class="checklist-item-row">
        <div class="checklist-item-text-and-controls" v-if="!showEditCheckListChild"
             @click="showEditCheckListChild = !showEditCheckListChild"><span
            class="checklist-item-details-text">cv1</span>
          <div class="checklist-item-controls">
            <div class="checklist-item-menu"
                 data-elevation="1">
              <div class="js-react-root"><a class="_1OXMHvUOoBqn1D" role="button" tabindex="0"
                                            data-test-id="checklist-item-overflow-menu-button"><span
                  class="icon-sm icon-overflow-menu-horizontal"></span></a></div>
            </div>
          </div>
        </div>
        <div class="edit check-item-options-menu" v-if="showEditCheckListChild">
          <textarea-autosize
              :value="checkList"
              placeholder="Thêm mô tả chi tiết hơn..."
              ref="descriptionCard"
              :min-height="30"
          />
          <p class="edits-error error"></p></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckListChild",
  data() {
    return {
      showEditCheckListChild: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/child_check_list";
</style>