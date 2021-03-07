<template>
  <div class="pop-over is-shown" :style="{left: offset.left+'px', top: offset.top+'px'}" data-elevation="2">
    <div class="no-back">
      <div class="pop-over-header js-pop-over-header">
        <a href="#" v-if="showAddLabel" @click="showAddLabel=false"
           class="pop-over-header-back-btn icon-sm icon-back is-shown">
          <i class="el-icon-arrow-left"></i>
        </a>
        <span class="pop-over-header-title">{{ showAddLabel ? 'Tạo nhãn mới' : 'Nhãn' }}</span>
        <a @click="closeLabelModal" class="pop-over-header-close-btn icon-sm icon-close">
          <i class="el-icon-close"></i>
        </a>
      </div>
      <div>
        <div class="pop-over-content js-pop-over-content u-fancy-scrollbar js-tab-parent" style="max-height: 368px;">
          <div>
            <div>
              <div class="edit-label">
                <label for="labelName">Tên</label>
                <input id="labelName"
                       class="js-autofocus js-label-name"
                       type="text" name="name" value="">
                <label>Chọn một màu</label>
                <div class="u-clearfix">
                  <DetailLabel :color="green"/>
                  <DetailLabel :color="yellow"/>
                  <DetailLabel :color="orange"/>
                  <DetailLabel :color="green"/>
                  <DetailLabel :color="green"/>
                  <DetailLabel :color="green"/>
                  <DetailLabel :color="green"/>
                  <DetailLabel :color="green"/>
                  <DetailLabel :color="green"/>
                  <DetailLabel :color="green"/>
                  <DetailLabel :color="green"/>
                </div>
                <div class="edit-labels-no-color-section u-clearfix">
                  <div class="edit-labels-no-color-section-color"><span
                      class="card-label mod-edit-label mod-clickable card-label-null palette-color js-palette-color"
                      data-color=""><span
                      class="card-label-color-select-icon icon-sm icon-check light hide js-palette-select"></span></span>
                  </div>
                </div>
                <div class="u-clearfix"><input class="nch-button nch-button--primary wide js-submit" type="submit"
                                               value="Tạo mới">
                  <div class="u-float-right js-accessory-view-holder"></div>
                </div>
              </div>
              <div class="pop-over-section"><h4>Nhãn</h4>
                <ul class="edit-labels-pop-over js-labels-list">
                  <li><a class="card-label-edit-button"><i class="el-icon-edit"></i></a>
                    <DetailLabel/>
                  </li>
                </ul>
                <div>
                  <button class="button full js-add-label" @click="showAddLabel=true">Tạo nhãn mới</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailLabel from "@/components/include/DetailLabel";

export default {
  name: "Label",
  props: ['offset'],
  components:{
    DetailLabel
  },
  methods: {
    closeLabelModal() {
      this.$emit('closeLabelModal')
    }
  },
  data() {
    return {
      showAddLabel: false
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/card_color";
@import "src/assets/scss/label";
</style>