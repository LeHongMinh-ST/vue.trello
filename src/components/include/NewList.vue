<template>
  <div class="listWrapper">
    <div class="listContent">
      <div class="listHeader">
        <textarea class="list-header-name list-header-edit-name" id="addList" @keydown.enter="AddList"
                  name=""
                  placeholder="Nhập vào tiêu đề danh sách..."
                  cols="30" rows="10" ref="title" ></textarea>
      </div>
      <div class="cardControl">
        <div class="card-control-section">
          <el-button class="btnAddCard" type="success" @click="AddList">Thêm danh sách</el-button>
          <div class="btnCloseAddCard" @click="closeNewList"><i class="el-icon-close"></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState,mapMutations} from 'vuex'
export default {
  name: "NewList",
  mounted() {
    document.getElementById('addList').focus()
  },
  methods:{
    closeNewList() {
      this.$emit('closeNewList')
    },
    AddList(){
      let newList = {
        "id": new Date().getTime(),
        "title": this.$refs.title.value,
        "user_id": 1,
        "index": this.list.length +1,
        "created_at": null,
        "updated_at": null,
        "cards": []
      }
      // console.log(newList)
      this.addList(newList)
      this.closeNewList()
    },
    ...mapMutations('home',[
      'addList'
    ])
  },
  computed:{
    ...mapState('home',[
      'list'
    ])
  }
}
</script>

<style scoped lang="scss">
.listWrapper {
  width: 272px;
  margin: 0 4px;
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;


  .listContent {
    background-color: #ebecf0;
    border-radius: 3px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    max-height: 100%;
    position: relative;
    white-space: normal;


    .listHeader {
      flex: 0 0 auto;
      display: flex;
      padding-left: 5px;
      padding-right: 5px;
      position: relative;
      min-height: 20px;
      max-height: 40px;

      .list-header-target {
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      .menu {
        margin: 6px 4px 4px 4px;
        padding: 6px;
        text-align: center;
        cursor: pointer;
        line-height: 20px;
        height: 28px;
        width: 24px;
        z-index: 99;
        font-size: 16px;
      }

      .menu:hover {
        background-color: rgba(9, 30, 66, .08);
        //border-radius: 2px;
      }

      .list-header-name {
        height: 28px;
        margin: 0;
      }

      .list-header-edit-name {
        resize: none;
        font-size: 16px;
        line-height: 20px;
        font-weight: 600;
        background-color: #ebecf0;
        border: none;
        height: 28px;
        width: 98%;
        margin: 6px 0;
        padding: 4px 8px 4px 8px;
        cursor: pointer;
      }

      textarea:focus {
        outline: none;
        background-color: white !important;
        box-shadow: inset 0 0 0 2px #0079bf;
        border-color: #0079bf;
        overflow: hidden;
        overflow-wrap: break-word;
        border-radius: 5px;
      }
    }

    .cardControl {
      padding: 5px 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .card-control-section {
        display: flex;
        align-items: center;

        .btnAddCard {
          padding: 8px 12px;
        }

        .btnCloseAddCard {
          margin-left: 5px;
          color: #6b778c;
          font-size: 28px;
          font-weight: 600;
          cursor: pointer;
        }

        .btnCloseAddCard:hover {
          color: #172b4d;
        }
      }

      .mod-right {
        .menu {
          margin: 6px 4px 4px 4px;
          padding: 6px;
          text-align: center;
          cursor: pointer;
          line-height: 20px;
          height: 20px;
          width: 24px;
          z-index: 99;
          //font-size: 16px;
        }

        .menu:hover {
          background-color: rgba(9, 30, 66, .08);
          //border-radius: 2px;
        }
      }
    }


  }

}
</style>