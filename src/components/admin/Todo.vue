<template>
  <div class="cardTodo">
    <div class="detailTodo" @click="dialogFormVisible = true">
      <span class="btn-edit">
        <i class="el-icon-edit"></i>
      </span>
      <div class="list-card-labels">
        <span class="card-label card-label-default mod-card-front" @click="showLable"
              :class="[{'labelShow' :labelShow}, 'card-label-'+label.color]" v-for="label in card.labels"
              :key="label.id" title="LMS Thầy thiện">
          <span class="label-text" v-if="labelShow">{{ label.name }}</span>
        </span>
      </div>
      <p class="text-title">{{ card.title }}</p>
      <div class="badges">
        <span class="js-badges">
          <div class="badge is-icon-only" title="You are watching this card.">
            <span class="badge-icon icon-sm icon-subscribe"><i class="el-icon-view"></i> </span>
          </div>
          <div class="badge js-due-date-badge mod-due-date is-due-complete" title="This card is complete."
               v-if="card.deadline!=null">
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
    </div>
    <el-dialog id="detailTodo" class="dialogTodo" :append-to-body="true" width="40%" :show-close="false"
               :visible.sync="dialogFormVisible">
      <div class="window-wrapper js-tab-parent" data-elevation="1"><a
          class="icon-md icon-close close-button js-close-window" @click="dialogFormVisible=false"><i class="iconColse el-icon-close"></i></a>
        <div class="card-detail-window u-clearfix">
          <div class="window-header"><span
              class="window-header-icon"><i class="iconBank el-icon-bank-card"></i></span>
            <div class="window-title">
              <textarea class="" dir="auto" :value="card.title"></textarea>
            </div>
          </div>
          <div class="window-content">
            <div class="window-main-col">
              <div class="card-detail-data u-gutter">
                <div class="card-detail-item card-detail-item-labels u-clearfix js-card-detail-labels"><h3
                    class="card-detail-item-header">Nhãn</h3>
                  <div class="u-clearfix js-card-detail-labels-list js-edit-label">
                  <span class="card-label card-label-green mod-card-detail mod-clickable" title="abc">
                    <span class="label-text">abc</span>
                  </span>
                    <span class="card-label card-label-yellow mod-card-detail mod-clickable" title="LMS Thầy thiện">
                    <span class="label-text">LMS Thầy thiện</span>
                  </span>
                    <span class="card-label card-label-orange mod-card-detail mod-clickable" title="LMS Zent">
                    <span class="label-text">LMS Zent</span>
                  </span>
                    <a class="card-detail-item-add-button js-details-edit-labels">
                      <span class="icon-sm icon-add"><i class="el-icon-plus"></i></span>
                    </a>
                  </div>
                </div>
                <div class="card-detail-item card-detail-start-date">
                  <h3 class="card-detail-item-header">Ngày bắt đầu</h3>
                  <div class="card-detail-start-date-badge js-card-detail-start-date-badge is-clickable">
                    <div class="card-detail-badge-start-date-react-container">
                      <el-date-picker
                          type="datetime"
                          placeholder="Select date and time">
                      </el-date-picker>
                    </div>
                  </div>
                </div>
                <div class="card-detail-item card-detail-due-date">
                  <h3 class="card-detail-item-header">Ngày hết hạn</h3>
                  <div class="card-detail-due-date-badge js-card-detail-due-date-badge is-due-past is-clickable"
                       title="Thẻ đã hết hạn."><a
                      class="card-detail-badge-due-date-complete-box js-card-detail-due-date-badge-complete js-details-toggle-due-date-complete"
                      href="#" role="button"><span class="card-detail-badge-due-date-complete-icon"></span></a>
                    <div class="card-detail-badge-due-date-react-container">
                      <el-date-picker
                          type="datetime"
                          placeholder="Select date and time">
                      </el-date-picker>
                      <span class="deadline-badge">quá hạn</span>
                    </div>
                  </div>
                </div>
                <div class="plugin-detail-badges js-plugin-badges">
                  <div></div>
                </div>
                <div class="u-clearfix"></div>
              </div>
              <div class="fill-card-detail-desc">
                <div>
                  <div class="window-module">
                    <div class="window-module-title window-module-title-no-divider description-title">
                    <span class="icon-description icon-lg window-module-title-icon">
                      <i class="el-icon-s-unfold"></i>
                    </span>
                      <h3 class="u-inline-block">Mô tả</h3>
                      <div class="editable" attr="desc"><a
                          class="nch-button ml-4 hide-on-edit js-show-with-desc js-edit-desc js-edit-desc-button hide"
                          @click="openEditDescription" v-if="!editDescriptionModal && card.description.length > 0">Chỉnh
                        sửa</a><span
                          class="editing-members-description js-editing-members-description hide"></span></div>
                    </div>
                    <div class="u-gutter">
                      <div class="editable" attr="desc">
                        <div class="description-content js-desc-content">
                          <div class="current markeddown hide-on-edit js-desc js-show-with-desc hide" dir="auto"></div>
                          <p v-if="!editDescriptionModal && card.description.length == 0" @click="openEditDescription"
                             class="u-bottom js-hide-with-desc">
                            <a
                                class="description-fake-text-area hide-on-edit js-edit-desc  js-hide-with-draft"
                                href="#">Thêm
                              mô tả chi tiết hơn...</a></p>
                          <p v-if="!editDescriptionModal && card.description.length > 0" @click="openEditDescription"
                             class="u-bottom js-hide-with-desc">
                            <a
                                class="description-fake-text-area hide-on-edit js-edit-desc  js-hide-with-draft"
                                href="#">{{
                                card.description
                              }}</a>
                          </p>
                          <div class="description-edit edit" v-if="editDescriptionModal">
                            <textarea-autosize
                                :value="card.description"
                                class="description-draft"
                                placeholder="Thêm mô tả chi tiết hơn..."
                                ref="descriptionCard"
                                :min-height="30"
                            />
                            <div class="edit-controls u-clearfix"><input
                                class="nch-button nch-button--primary confirm mod-submit-edit js-save-edit"
                                type="submit"
                                value="Lưu">
                              <div class="btnCloseAddCard" @click="editDescriptionModal = false"><i
                                  class="el-icon-close"></i></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="checklist-list window-module js-checklist-list js-no-higher-edits ui-sortable">
                <CheckList :checkList="card.check_lists"/>
              </div>
            </div>
            <DialogSibar/>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";
import CheckList from "@/components/include/CheckList";
import DialogSibar from "@/components/include/DialogSibar";
export default {
  name: "Todo",
  props: ['card'],
  components:{
    CheckList,
    DialogSibar
  },
  data() {
    return {
      modalShow: false,
      dialogFormVisible: false,
      editDescriptionModal: false
    }
  },
  methods: {
    ...mapMutations('home', [
      'showLable'
    ]),
    openEditDescription() {
      this.editDescriptionModal = true;
      // this.$refs['descriptionCard'].focus();
    }
  },
  computed: {
    ...mapState('home', [
      'labelShow'
    ])
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/card_color";

.cardTodo {
  width: 100%;
  max-height: 162px;
  overflow: hidden;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  border: none;
  background-color: #fff;
  cursor: pointer;
  display: block;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  position: relative;
  text-decoration: none;
  z-index: 0;

  .detailTodo {
    overflow: hidden;
    padding: 12px 8px 0 8px;
    position: relative;
    z-index: 10;

    .list-card-labels {
      overflow: auto;
      position: relative;

      .card-label {
        height: 8px;
        line-height: 16px;
        padding: 0 8px;
        max-width: 198px;
        text-shadow: none;
        width: auto;
        min-width: 40px;
        margin: 0 4px 4px 0;
        float: left;
        font-size: 12px;
        font-weight: 700;
        color: #fff;
        border-radius: 5px;
      }

      .labelShow {
        height: 16px !important;
      }
    }

    .btn-edit {
      background-color: #f4f5f7;
      background-clip: padding-box;
      background-origin: padding-box;
      border-radius: 3px;
      opacity: .8;
      padding: 4px;
      position: absolute;
      right: 2px;
      top: 2px;
      visibility: hidden;
      z-index: 40;

      i {
        color: #42526e;
        height: 20px;
        font-size: 16px;
        line-height: 20px;
        width: 20px;
      }
    }

    .btn-edit:hover {
      background-color: #EBECF0;
    }

    .text-title {
      margin: 0;
      text-indent: 40px;
      direction: rtl;
      text-align: left;
    }

    .badges {
      float: left;
      max-width: 100%;
      margin-left: -2px;
      margin-top: 10px;

      .badge {
        color: #5e6c84;
        display: inline-block;
        margin: 0 4px 4px 0;
        max-width: 100%;
        min-height: 20px;
        overflow: hidden;
        position: relative;
        padding: 2px;
        text-decoration: none;
        text-overflow: ellipsis;
        vertical-align: top;

        .badge-icon {
          color: #6b778c;
          vertical-align: top;
        }
      }

      .badge.is-due-complete {
        background-color: #61bd4f;
        border-radius: 3px;
        color: #fff;

        .badge-icon {
          color: #6b778c;
          vertical-align: top;
        }
      }
    }
  }

  .thisCard:hover {
    background-color: #F4F5F7;
  }


}

.cardTodo:hover .btn-edit {
  visibility: visible;
}

@import "src/assets/scss/dialog_todo";
</style>