<template>
  <div class="pop-over is-shown" :style="{left: offset.left+'px', top: offset.top+'px'}">
    <div class="no-back">
      <div class="pop-over-header js-pop-over-header">
        <a href="#" v-if="showAddLabel" @click="showAddLabel=false"
           class="pop-over-header-back-btn icon-sm icon-back is-shown">
          <i class="el-icon-arrow-left"></i>
        </a>
        <span v-if="offset.type === 'label'" class="pop-over-header-title">{{ showAddLabel ? 'Tạo nhãn mới' : 'Nhãn' }}</span>
        <span v-else class="pop-over-header-title">Tạo mới công việc</span>
        <a @click="closeLabelModal" class="pop-over-header-close-btn icon-sm icon-close">
          <i class="el-icon-close"></i>
        </a>
      </div>
      <div>
        <div class="pop-over-content js-pop-over-content u-fancy-scrollbar js-tab-parent" style="max-height: 368px;">
          <div>
            <div>
              <div v-if="showAddLabel" class="edit-label">
                <label for="labelName">Tên</label>
                <input id="labelName"
                       class="js-autofocus js-label-name"
                       type="text" name="name" value="">
                <label>Chọn một màu</label>
                <div class="u-clearfix">
                  <DetailLabel class="label-item" :color="'green'"/>
                  <DetailLabel class="label-item" :color="'yellow'"/>
                  <DetailLabel class="label-item" :color="'orange'"/>
                  <DetailLabel class="label-item" :color="'red'"/>
                  <DetailLabel class="label-item" :color="'purple'"/>
                  <DetailLabel class="label-item" :color="'blue'"/>
                  <DetailLabel class="label-item" :color="'sky'"/>
                  <DetailLabel class="label-item" :color="'lime'"/>
                  <DetailLabel class="label-item" :color="'pink'"/>
                  <DetailLabel class="label-item" :color="'black'"/>
                </div>
                <div class="edit-labels-no-color-section u-clearfix">
                  <div class="edit-labels-no-color-section-color">
                    <DetailLabel class="label-item" :color="'default'"/>
                  </div>
                  <div class="edit-labels-no-color-section-text"><p class="u-bottom">Không có màu.</p>
                    <p class="u-bottom quiet">Điều này sẽ không hiển thị trên đầu thẻ.</p></div>
                </div>
                <div class="u-clearfix"><input class="nch-button nch-button--primary wide js-submit" type="submit"
                                               value="Tạo mới">
                  <div class="u-float-right js-accessory-view-holder"></div>
                </div>
              </div>
              <div v-if="!showAddLabel" class="pop-over-section"><h4>Nhãn</h4>
                <ul class="edit-labels-pop-over js-labels-list">
                  <li><a class="card-label-edit-button"><i class="el-icon-edit"></i></a>
                    <DetailLabel :color="'red'"/>
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
  name: "ModalSidebar",
  props: ['offset'],
  components: {
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