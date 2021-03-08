<template>
  <div class="pop-over is-shown" :style="{left: offset.left+'px', top: offset.top+'px'}">
    <div class="no-back">
      <div class="pop-over-header js-pop-over-header">
        <a href="#" v-if="showAddLabel" @click="showAddLabel=false"
           class="pop-over-header-back-btn icon-sm icon-back is-shown">
          <i class="el-icon-arrow-left"></i>
        </a>
        <span v-if="offset.type === 'label'" class="pop-over-header-title">{{
            showAddLabel ? 'Tạo nhãn mới' : 'Nhãn'
          }}</span>
        <span v-else class="pop-over-header-title">Tạo mới công việc</span>
        <a @click="closeLabelModal" class="pop-over-header-close-btn icon-sm icon-close">
          <i class="el-icon-close"></i>
        </a>
      </div>
      <div>
        <div v-if="offset.type === 'label'" class="pop-over-content js-pop-over-content u-fancy-scrollbar js-tab-parent"
             style="max-height: 368px;">
          <div>
            <div>
              <div v-if="showAddLabel" class="edit-label">
                <label for="labelName">Tên</label>
                <input id="labelName"
                       class="js-autofocus js-label-name"
                       type="text" name="name" v-model="titleLabel">
                <label>Chọn một màu</label>
                <div class="u-clearfix">
                  <DetailLabel class="label-item" v-for="(item,index) in arrayLabels" @activeLabel="activeLabel"
                               :key="index" :color="item"/>
                </div>
                <div class="edit-labels-no-color-section u-clearfix">
                  <div class="edit-labels-no-color-section-color">
                    <DetailLabel class="label-item" :color="'default'" @activeLabel="activeLabel"/>
                  </div>
                  <div class="edit-labels-no-color-section-text"><p class="u-bottom">Không có màu.</p>
                    <p class="u-bottom quiet">Điều này sẽ không hiển thị trên đầu thẻ.</p></div>
                </div>
                <div class="u-clearfix"><input class="nch-button nch-button--primary wide js-submit"
                                               @click="addLabelToCard" type="submit"
                                               value="Tạo mới">
                  <div class="u-float-right js-accessory-view-holder"></div>
                </div>
              </div>
              <div v-if="!showAddLabel" class="pop-over-section"><h4>Nhãn</h4>
                <ul class="edit-labels-pop-over js-labels-list">
                  <li v-for="(label,index) in labels" :key="index"><a class="card-label-edit-button"><i
                      class="el-icon-edit"></i></a>
                    <DetailLabel :color="label.color" @activeLabel="changeLable" :id="label.id" :card="card"
                                 :title="label.name"/>
                  </li>
                </ul>
                <div>
                  <button class="button full js-add-label" @click="openAddLabel">Tạo nhãn mới</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="pop-over-content js-pop-over-content u-fancy-scrollbar js-tab-parent"
             style="max-height: 451px;">
          <div>
            <div>
              <div class="edit-label">
                <label for="id-checklist">Tiêu đề</label>
                <input id="id-checklist"
                       type="text"
                       value="Việc cần làm"
                       data-default="Việc cần làm"
                       dir="auto">
                <input class="nch-button add-checklist" type="submit" value="Thêm">
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
import api from '../../api';

export default {
  name: "ModalSidebar",
  props: ['offset', 'card', 'labels'],
  components: {
    DetailLabel
  },
  methods: {
    closeLabelModal() {
      this.$emit('closeLabelModal')
    },
    openAddLabel() {
      this.arrayActive = []
      this.showAddLabel = true
    }
    ,
    addLabelToCard() {
      let id = this.card.id
      if (this.arrayActive.length > 0) {
        this.arrayActive.forEach((item) => {
          let data = {
            name: this.titleLabel,
            color: item
          }
          api.addLabel(data, id).then((res) => {
            console.log(res)
          })
        })

        this.$emit('reloadLabel',this.card.id)
        this.showAddLabel = !this.showAddLabel;
      }
    },
    activeLabel(data) {
      if (this.arrayActive.includes(data.color)) {
        this.arrayActive = this.arrayActive.filter((item) => item != data.color)
      } else {
        this.arrayActive.push(data.color);
      }
    },
    changeLable(data) {
      if (data.isActive){
        data.directory_id = this.card.directory_id
        api.detachLabels(data,this.card.id)
      }else {
        api.attachLabels(data,this.card.id)
      }

      this.$emit('reloadLabel',this.card.id)
    }
  },
  watch: {},
  data() {
    return {
      thisAddLabels: [],
      arrayLabels: [
        'green',
        'yellow',
        'orange',
        'red',
        'purple',
        'blue',
        'sky',
        'lime',
        'pink',
        'black'
      ],
      showAddLabel: false,
      arrayActive: [],
      titleLabel: ''
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