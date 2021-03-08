<template>
  <div class="cardTodo">
    <div class="detailTodo" @click.left="openDetailCard" @click.right="openQuickEdit">
      <span class="btn-edit" @click="btnOpenEdit" >
        <i class="el-icon-edit"></i>
      </span>
      <div class="list-card-labels">
        <span class="card-label card-label-default mod-card-front" @click="handleShowLable"
              :class="[{'labelShow' :labelShow}, 'card-label-'+label.color]" v-for="label in card.labels"
              :key="label.id" title="LMS Thầy thiện">
          <span class="label-text" v-if="labelShow">{{ label.name }}</span>
        </span>
      </div>
      <p class="text-title">{{ card.title }}</p>
      <div class="badges">
        <span class="js-badges">
          <div class="badge js-due-date-badge mod-due-date"
               :class="[{'is-due-complete':isComplete},{'is-due-die': isDeadline===2},{'is-due-near': isDeadline===1}]"
               title="This card is complete."
               v-if="card.deadline!=null">
            <span class="badge-icon icon-sm icon-clock badge-due-icon"> <i
                class="el-icon-alarm-clock badge-due-icon"></i></span>
            <span class="badge-icon icon-sm icon-checkbox-checked badge-due-checked">
              <el-checkbox v-model="isComplete"
                           @change="changeStatusTodo"></el-checkbox>
            </span>
            <span class="badge-icon icon-sm icon-checkbox-unchecked badge-due-unchecked"></span>
            <span class="badge-text js-due-date-text">{{ formatStringDate(card.deadline) }}</span>
          </div>
          <div class="badge is-icon-only" title="This card has a description.">
            <span class="badge-icon icon-sm icon-description"> <i class="el-icon-s-unfold"></i></span>
          </div>
        </span>
        <span class="custom-field-front-badges js-custom-field-badges"><span></span></span>
        <span class="js-plugin-badges"><span></span></span>
      </div>
    </div>
    <el-dialog v-if="dialogFormVisible" id="detailTodo" class="dialogTodo" :append-to-body="true" width="40%"
               :show-close="false"
               :visible.sync="dialogFormVisible" @close="closeModal">
      <div class="window-wrapper js-tab-parent" data-elevation="1"><a
          class="icon-md icon-close close-button js-close-window" @click="closeModal"><i
          class="iconColse el-icon-close"></i></a>
        <div class="card-detail-window u-clearfix">
          <div class="window-header"><span
              class="window-header-icon"><i class="iconBank el-icon-bank-card"></i></span>
            <div class="window-title">
              <textarea @keydown.enter="updateCardTitle" :value="cardTitle"></textarea>
            </div>
          </div>
          <div class="window-content">
            <div class="window-main-col">
              <div class="card-detail-data u-gutter">
                <div v-if="cardDetail.labels.length>0"
                     class="card-detail-item card-detail-item-labels u-clearfix js-card-detail-labels">
                  <h3 class="card-detail-item-header">Nhãn</h3>
                  <div class="u-clearfix js-card-detail-labels-list js-edit-label">
                  <span v-for="(item,index) in cardDetail.labels" :key="index" @click="openControlLabel"
                        :class="['card-label-'+item.color]" class="card-label" :title="item.name">
                    <span class="label-text">{{ item.name }}</span>
                  </span>
                    <a class="card-detail-item-add-button" @click="openControlLabel">
                      <span class="icon-sm icon-add"><i class="el-icon-plus"></i></span>
                    </a>
                  </div>
                </div>
                <div v-if="cardDetail.deadline!=null" class="card-detail-item card-detail-due-date">
                  <h3 class="card-detail-item-header">Ngày hết hạn</h3>
                  <div class="card-detail-due-date-badge js-card-detail-due-date-badge is-clickable is-due-complete"
                       title="Thẻ này đã hoàn tất.">
                    <el-checkbox v-model="isComplete" @change="changeStatusTodo"></el-checkbox>
                    <div class="card-detail-badge-due-date-react-container">
                      <div class="card-deadline-badge">
                        <button class="deadline-badge datetime-btn"
                                data-test-id="due-date-badge-with-date-range-picker" type="button">
                          <span>{{ formatDate(deadline) }}</span>
                          <span class="card-deadline-status card-complate" v-if="isComplete">Hoàn tất</span>
                          <span class="card-deadline-status card-die"
                                v-if="!isComplete && isDeadline===2">Quá hạn</span>
                          <span class="card-deadline-status card-near-die"
                                v-if="!isComplete && isDeadline===1">Gần đến hạn</span>
                          <span class="nch-icon">
                            <span class="" role="img" aria-label="DownIcon"><svg width="24" height="24"
                                                                                 role="presentation"
                                                                                 focusable="false"
                                                                                 viewBox="0 0 24 24"><path
                                d="M11.293 16.707l-7.071-7.07a1 1 0 111.414-1.415L12 14.586l6.364-6.364a1 1 0 111.414 1.414l-7.07 7.071a1 1 0 01-1.415 0z"
                                fill="currentColor"></path></svg></span></span>
                          <el-date-picker
                              type="datetime"
                              v-model="deadline"
                              @change="changeDeadline"
                          >
                          </el-date-picker>
                        </button>
                      </div>
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
                          @click="openEditDescription" v-if="!editDescriptionModal && cardDetail.description !=null">Chỉnh
                        sửa</a><span
                          class="editing-members-description js-editing-members-description hide"></span></div>
                    </div>
                    <div class="u-gutter">
                      <div class="editable" attr="desc">
                        <div class="description-content js-desc-content">
                          <div class="current markeddown hide-on-edit js-desc js-show-with-desc hide" dir="auto"></div>
                          <p v-if="!editDescriptionModal && cardDetail.description==null" @click="openEditDescription"
                             class="u-bottom js-hide-with-desc">
                            <a
                                class="description-fake-text-area hide-on-edit js-edit-desc  js-hide-with-draft"
                                href="#">Thêm
                              mô tả chi tiết hơn...</a></p>
                          <p v-if="!editDescriptionModal && cardDetail.description!=null" @click="openEditDescription"
                             class="u-bottom js-hide-with-desc">
                            <a
                                class="description-fake-text-area hide-on-edit js-edit-desc  js-hide-with-draft"
                                href="#">{{
                                cardDetail.description
                              }}</a>
                          </p>
                          <div class="description-edit edit" v-if="editDescriptionModal">
                            <textarea-autosize
                                :value="cardDetail.description"
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
              <div v-if="cardDetail.check_lists.length > 0"
                   class="checklist-list window-module js-checklist-list js-no-higher-edits ui-sortable">
                <CheckList :checkList="cardDetail.check_lists"/>
              </div>
            </div>
            <DialogSibar @showControl="handleShowControl" @changeDeadline="changeDeadline" :card="cardDetail"/>
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
import api from "@/api";
import moment from "moment";

export default {
  name: "Todo",
  props: ['card'],
  components: {
    CheckList,
    DialogSibar,
  },
  data() {
    return {
      modalShow: false,
      dialogFormVisible: false,
      editDescriptionModal: false,
      showControlModalSidebar: false,
      offsetLabel: {},
      labels: [],
      isComplete: false,
      isDeadline: 0,
      cardTitle: '',
      deadline: '',
      description: ''
    }
  },
  methods: {
    ...mapMutations('home', [
      'showLable','updateCardDetail'
    ]),
    handleShowLable(e) {
      e.stopPropagation()
      this.showLable()
    },
    updateCardTitle() {
      let data = {
        title: this.cardTitle,
        description: this.description
      }
      api.updateCard(data, this.card.id).then(() => {
        this.$emit('updateData')
      })
    },
    loadDescription() {
      this.description = this.cardDetail.description;
    }
    ,
    loadTitle() {
      this.cardTitle = this.cardDetail.title;
    },
    loadDeadline() {
      this.deadline = this.cardDetail.deadline
    },
    changeStatusTodo() {
      let data = {};

      if (this.isComplete) {
        data.status = 1;
      } else {
        data.status = 0
      }

      data.directory_id = this.card.directory_id
      api.changeStatusTodo(data, this.card.id).then(() => {
        this.getDetailCard();
        this.$emit('updateData')
      })
    },
    changeDeadline(data) {
      api.changeStatusDeadline(data, this.card.id).then(() => {
        this.getDetailCard();
        this.$emit('updateData')
      })

      this.resetTime()
    },
    resetTime(){
      this.isDeadline = 0;
      this.isComplete = false;
      this.deadline = ''
    },
    openEditDescription() {
      this.editDescriptionModal = true;
      // this.$refs['descriptionCard'].focus();
    },
    getDetailCard() {
      api.getCard(this.card.id).then((response) => {
        this.updateCardDetail(response.data.data);
      })
    },
    handleShowControl(data) {
      // this.showControlModalSidebar = false;

      this.$emit('handleShowControl', data)
    },
    openControlLabel(e) {
      let rect = e.target.getBoundingClientRect();
      let data = {
        left: rect.left,
        top: rect.top,
        type: 'label',
        id: this.card.id
      };
      this.$emit('handleShowControl', data)
    },
    openDetailCard() {
      this.dialogFormVisible = true;
      this.getDetailCard();
    },
    closeModal() {
      this.dialogFormVisible = false;
      this.closeControlModal()
    },
    closeControlModal() {
      this.$emit('closeControlModal')
    },
    btnOpenEdit(e){
      e.stopPropagation()
      let parent = e.target.parentElement.parentElement
      let rect = parent.getBoundingClientRect();
      let data = {
        left: rect.left,
        top: rect.top,
        width: '256px',
        id: this.card.id
      }
      this.$emit('openQuickEdit', data)
    },
    openQuickEdit(e) {
      let rect = e.target.getBoundingClientRect();
      let data = {
        left: rect.left,
        top: rect.top,
        width: '256px',
        id: this.card.id
      }
      this.$emit('openQuickEdit', data)
    },
    formatStringDate(dateString) {
      let date = moment(dateString)
      return date.date() + ' tháng ' + (date.month() + + 1);
    }, formatDate(dateString) {
      return 'ngày ' + moment(dateString).format('DD-MM-yyyy  HH:mm:ss');
    },
    checkComplate() {
      if (this.card.status == 0) {
        this.isComplete = false
      } else {
        this.isComplete = true
      }
    },
    checkDeadline() {
      let deadline = moment(this.card.deadline);
      let now = moment();
      if (deadline < now) {
        this.isDeadline = 2;
      } else if (deadline.format('YYYY-MM-dd') === now.format('YYYY-MM-dd')) {
        this.isDeadline = 1;
      } else {
        this.isDeadline = 0;
      }
    }
  },
  computed: {
    ...mapState('home', [
      'labelShow','cardDetail'
    ])
  },
  mounted() {
    this.loadTitle();
    this.loadDescription()
    this.checkComplate()
    this.loadDeadline()
    this.checkDeadline()
  },
  updated() {
    this.loadTitle();
    this.loadDescription()
    this.checkComplate()
    this.loadDeadline()
    this.checkDeadline()
  },
  watch: {
    card : function () {
      this.checkComplate()
    }
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
        border-radius: 5px;
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
        cursor: pointer;

        .badge-icon {
          color: #6b778c;
          vertical-align: top;
          margin: 0 2px;

          .el-checkbox {
            margin: 0;

            .is-checked {
              .el-checkbox__inner {
                background-color: #61BD4F !important;
              }
            }
          }
        }

        .icon-checkbox-checked {
          display: none;
        }

        .icon-clock {
          display: inline-block;
        }

        .badge-text {
          font-size: 12px;
          padding: 0 4px 0 2px;
          vertical-align: top;
          white-space: nowrap;
        }
      }

      .badge:hover {
        background-color: #ebecf0;

        .icon-checkbox-checked {
          display: inline-block;
        }

        .icon-clock {
          display: none;
        }
      }

      .badge.is-due-complete {
        background-color: #61bd4f!important;
        border-radius: 3px;
        color: #fff;

        .badge-icon {
          color: #fff;
          vertical-align: top;
        }
      }

      .badge.is-due-near {
        background-color: #f2d600;
        border-radius: 3px;
        color: #fff;

        .badge-icon {
          color: #fff;
          vertical-align: top;
        }
      }

      .badge.is-due-die {
        background-color: #eb5a46;
        border-radius: 3px;
        color: #fff;

        .badge-icon {
          color: #fff;
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