<template>
  <div class="cardTodo">
    <div class="detailTodo">
      <span class="btn-edit">
        <i class="el-icon-edit"></i>
      </span>
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
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: "Todo",
  props: ['card'],
  data() {
    return {
      modalShow: false
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>