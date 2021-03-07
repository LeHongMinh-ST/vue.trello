<template>
  <AdminLayout>
    <template #main>
      <div class="adminMainContent">
        <div class="main-header">
          <div class="logo">
            <h1>Lê Hồng Minh</h1>
            <!--              <img src="" alt="">-->
          </div>
        </div>
        <div class="main-content">
          <div class="listTodo">
            <draggable
                class="dragArea"
                :list="list"
                item-key="id"
                :animation="100"
                :move="moveList"
            >
              <List v-for="(item,index) in list" :id="item.id" @handleShowControl="handleShowControl" :key="index" @updateCardList="getDataList" @updateListTitle="handleUpdateList"
                    :index="item.index" :item="item"/>
            </draggable>

            <div class="newList" v-if="!addList">
              <div class="btn-add" @click="newList">
                <i class="el-icon-plus plus"></i>
                <span>Thêm danh sách khác</span>
              </div>
            </div>
            <NewList v-if="addList" v-click-outside="closeNewList" @addList="handleAddList"
                     @closeNewList="closeNewList"></NewList>
          </div>
        </div>
      </div>
      <ModalSidebar v-if="showControlModalSidebar" :labels="labels" @closeLabelModal="closeControlModal" :offset="offsetLabel"/>
    </template>
  </AdminLayout>
</template>

<script>
import AdminLayout from "@/layouts/AdminLayout";
import List from "@/components/admin/List";
import NewList from "@/components/include/NewList";
import ClickOutside from 'vue-click-outside'
import draggable from "vuedraggable";
import {mapMutations, mapState} from 'vuex'
import api from '../../api';
import _ from "lodash";

export default {
  name: "Admin",
  data() {
    return {
      'addList': false,
      'data': []
    }
  },
  components: {
    AdminLayout,
    List,
    draggable,
    NewList
  },
  methods: {
    ...mapMutations('home', [
      'updateList'
    ]),
    moveList(e) {
      console.log(e)

      let id = e.draggedContext.element.id

      let payload = {
        index : e.draggedContext.futureIndex,
      }
      if (id !== e.draggedContext.futureIndex){
        api.changeIndexList(payload,id).then(()=>{
          this.getDataList()
        })
      }

    },
    newList() {
      this.addList = true
    },
    closeNewList() {
      this.addList = false
    },
    getDataList() {
      api.getList().then((response) => {
        this.updateList(response.data.data)
      })
    },
    loadData() {
      this.data = this.list
    },
    handleAddList(data) {
      api.addList(data).then((response) => {
        console.log(response)
        this.getDataList();
      })
    },
    handleUpdateList(data) {
      console.log(data)
      api.updateTitleList(data.data, data.id).then((response) => {
        console.log(response)
        this.getDataList();
      })
    },
    handleShowControl(data){
      // this.showControlModalSidebar = false;

      if (data.type === 'label'){
        this.getDatalabel()
      }
      if (_.isEmpty(this.offsetLabel)){
        this.showControlModalSidebar = true;
      }
      if (!_.isEmpty(this.offsetLabel) && this.offsetLabel.type !== data.type){
        this.showControlModalSidebar = true;
      }else if (!_.isEmpty(this.offsetLabel) && this.offsetLabel.type === data.type) {
        this.showControlModalSidebar = !this.showControlModalSidebar
      }

      this.offsetLabel = data
    }
  },
  computed: {
    ...mapState('home', [
      'list'
    ])
  },
  mounted() {
    this.popupItem = this.$el
    this.getDataList()
    this.loadData()
  },
  updated() {
    this.getDataList()
    this.loadData()
  },

  // do not forget this section
  directives: {
    ClickOutside
  }
}
</script>

<style scoped lang="scss">
.adminMainContent {
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 0;
  position: relative;
  transition: margin .1s ease-in;

  .main-header {
    height: auto;
    padding: 8px 4px 4px 8px;
    position: relative;
    overflow: hidden;

    .logo {
      background: transparent;
      cursor: default;
      font-size: 18px;
      font-weight: 700;
      height: 32px;
      padding: 0;
      text-decoration: none;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      float: left;
      color: #fff;
      line-height: 0;

      h1 {
        font-size: 18px;
        font-weight: 700;
        padding: 0 12px;
        color: #2c3e50;
      }
    }
  }

  .main-content {
    position: relative;
    flex-grow: 1;


    .listTodo {
      display: flex;
      -webkit-user-select: none;
      user-select: none;
      white-space: nowrap;
      margin-bottom: 8px;
      overflow-x: auto;
      overflow-y: hidden;
      padding-bottom: 8px;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      top: 0;
      -webkit-overflow-scrolling: touch;
      -webkit-transform: translateZ(0);
      height: 98%;

      .newList {
        text-align: left;
        width: 272px;
        margin: 0 4px;
        border-radius: 3px;
        color: #172b4d;
        transition: color 85ms ease-in;
        box-sizing: border-box;
        display: inline-block;
        vertical-align: top;
        white-space: nowrap;

        .title {
          padding: 0 11px;

          textarea {
            background-color: #ebecf0;
            border: none;
            height: 28px;
            width: 98%;
            margin: 6px 0;
            padding: 4px 0 4px 8px;
            resize: none;
          }

          textarea[type="text"] {
            font-size: 20px;
            line-height: 24px;
            font-weight: 600;
            //transition: width 0.4 s ease-in-out;
          }

          textarea:focus {
            outline: none;
            background-color: white;
            box-shadow: inset 0 0 0 2px #0079bf;
            border-color: #0079bf;
            overflow: hidden;
            overflow-wrap: break-word;
            /// / width: 96 %;
          }
        }

        .btn-add {
          width: 100%;
          height: 50px;
          line-height: 40px;
          background-color: hsla(0, 0%, 100%, .24);
          cursor: pointer;
          border-radius: 3px;
          color: #172b4d;
          padding: 6px 14px;
          transition: color 85ms ease-in;
          box-sizing: border-box;
          white-space: nowrap;

          .plus {
            margin-right: 10px;
          }
        }

        .btn-add:hover {
          background-color: hsla(0, 0%, 100%, .5);
        }
      }
    }

    /* width */
    .listTodo::-webkit-scrollbar {
      height: 8px;
      //width: 98%;
    }

    /* Track */
    .listTodo::-webkit-scrollbar-track {
      border-radius: 7px;
      background-color: #4f4f5073;
    }

    /* Handle */
    .listTodo::-webkit-scrollbar-thumb {
      background: #bcbcbe63;
      border-radius: 7px;
    }

    /* Handle on hover */
    .listTodo::-webkit-scrollbar-thumb:hover {
      background: #d3d3d87d;
    }

  }

}


</style>