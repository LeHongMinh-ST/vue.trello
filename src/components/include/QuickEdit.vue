<template>
  <div class="quick-card-editor"><span @click="closeQuickEdit"
                                       class="icon-lg icon-close quick-card-editor-close-icon js-close-editor">
    <i class="el-icon-close"></i>
  </span>
    <div class="quick-card-editor-card"
         :style="{left: offset.left+'px', top: offset.top+'px', width: offset.width+'px'}">
      <div class="list-card list-card-quick-edit js-stop" style="width: 256px;">
        <div class="list-card-stickers-area js-stickers-area hide">
          <div class="stickers js-card-stickers"></div>
        </div>
        <div class="list-card-details js-card-details">
          <div class="list-card-labels">
            <span class="card-label card-label-default mod-card-front" @click="showLable"
                  :class="[{'labelShow' :labelShow}, 'card-label-'+label.color]" v-for="label in card.labels"
                  :key="label.id" title="LMS Thầy thiện">
              <span class="label-text" v-if="labelShow">{{ label.name }}</span>
            </span>
          </div>
          <textarea-autosize
              :value="card.title"
              class="list-card-edit-title"
              placeholder="Thêm mô tả chi tiết hơn..."
              ref="descriptionCard"
              :min-height="30"
          />
          <div class="badges"><span class="js-badges">
          <div class="badge is-icon-only" title="You are watching this card.">
            <span class="badge-icon icon-sm icon-subscribe"><i class="el-icon-view"></i> </span>
          </div>
          <div class="badge js-due-date-badge mod-due-date is-due-complete" title="This card is complete."
               >
            <span class="badge-icon icon-sm icon-clock badge-due-icon"> <i
                class="el-icon-alarm-clock badge-due-icon"></i></span>
            <span class="badge-icon icon-sm icon-checkbox-checked badge-due-checked"><i
                class="el-icon-check"></i></span>
            <span class="badge-icon icon-sm icon-checkbox-unchecked badge-due-unchecked"></span>
            <span class="badge-text js-due-date-text">Sep 17, 2020</span>
          </div>
          <div class="badge is-icon-only" title="This card has a description.">
            <span class="badge-icon icon-sm icon-description"> <i class="el-icon-s-unfold"></i></span>
          </div>
        </span>
            <span class="custom-field-front-badges js-custom-field-badges"><span></span></span>
            <span class="js-plugin-badges"><span></span></span>
          </div>
          <div class="list-card-members js-list-card-members"></div>
        </div>
      </div>
      <input class="nch-button nch-button--primary wide js-save-edits" type="submit" value="Lưu">
      <div class="quick-card-editor-buttons fade-in">
        <a class="quick-card-editor-buttons-item"
           href=""><span
            class="icon-sm icon-card light"><i class="el-icon-bank-card"></i></span><span
            class="quick-card-editor-buttons-item-text">Mở Thẻ</span>
        </a>
        <a

            class="quick-card-editor-buttons-item js-edit-labels" @click="showControl($event,'label')" href="#"><span
            class="icon-sm icon-label light"><i class="el-icon-price-tag"></i></span><span
            class="quick-card-editor-buttons-item-text" >Chỉnh sửa nhãn</span>
        </a>
        <div id="convert-card-role-button-react-root" class="">
          <div class="js-react-root"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import ClickOutside from 'vue-click-outside'

export default {
  name: "QuickEdit",
  props: ['card', 'offset'],
  methods: {
    ...mapMutations('home', [
      'showLable'
    ]),
    closeQuickEdit() {
      this.$emit('closeQuickEdit')
    },
    showControl(e,type){
      let rect = e.target.getBoundingClientRect();
      let data = {
        left: rect.left,
        top: rect.top,
        type: type
      };
      this.$emit('showControl',data)
    }
  },
  computed: {
    ...mapState('home', [
      'labelShow'
    ])
  },
  mounted() {
    this.popupItem = this.$el
  }
  ,
  // do not forget this section
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/quick_edit";
</style>