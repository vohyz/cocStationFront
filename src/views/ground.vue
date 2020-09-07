<template>
  <div>
    <div class="ground">
      <div class="header">
        <div class="name">{{user}}</div>
       <el-avatar class="avatar" :style="'background-color:'+this.color">{{user[0]}}</el-avatar>
       <el-divider id="divider"></el-divider>
      </div>
      <div class="content">
        <div class='bigButton' @click="dialogVisible = true"><span>创建房间</span></div>
        <div class='bigButton right' @click="dialogVisible2 = true"><span>加入房间</span></div>
      </div>
    </div>
    <el-dialog title="创建房间" :visible.sync="dialogVisible">
      <div class='diaContent'>
        <el-switch
          style="display: block"
          v-model="value"
          inactive-color="#13ce66"
          active-text="继续游戏"
          inactive-text="新建游戏"
          :width="80"
          :disabled="isEmpty">
        </el-switch>
        <el-input v-if="value===false" id="select" v-model="title" placeholder="输入游戏标题"></el-input>
        <el-select v-if="value===true" id="select" v-model="room" placeholder="已有游戏">
          <el-tooltip class="item" effect="dark" v-for="game in halfGame" :key="game[0]" :content="game[2]" placement="right-start">
            <el-option :label="game[1]" :value="game[0]"></el-option>
          </el-tooltip>
        </el-select>
        <el-button class="create" @click="createRoom()">创建</el-button>
      </div>
    </el-dialog>
    <el-dialog title="加入房间" :visible.sync="dialogVisible2">
      <div class='diaContent'>
        <el-input id="select" v-model="roomId" placeholder="输入房间号"></el-input>
        <el-button class="create" @click="joinRoom()">加入</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {roomCreate} from "../network/room";
  import {getGames} from "../network/game";
  export default {
    name: "ground",
    data() {
      return {
        activeIndex: '1',
        dialogVisible: false,
        dialogVisible2: false,
        value: false,
        formLabelWidth: '120px',
        halfGame: [],
        room: '',
        title: '',
        roomId: '',
        isEmpty: true,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      createRoom() {
        if(!this.value && this.title.length < 1) {
          this.$messageBox.showErrorMessage(this, '游戏名太短');
          return 0 
        }
        if(this.value && this.room.length < 1){
          this.$messageBox.showErrorMessage(this, '未选择游戏');
          return 0 
        }
        roomCreate(this.value, this.room, this.title, localStorage.getItem('user'))
          .then(res => {
            if(res.flag === 'success'){
              this.$messageBox.showSuccessMessage(this, res['information']);
              localStorage.setItem('kpRoom', res['id'])
              this.gotoRoom(res['id']);
            } else {
              this.$messageBox.showErrorMessage(this, res['information']);
            }
          })
          .catch(res => {
            this.$messageBox.showErrorMessage(this, '网络故障');
          })
      },
      joinRoom() {
        let roomId = this.roomId;
        this.gotoRoom(roomId);
      },
      gotoRoom(roomId) {
        this.$router.push({path: `/playRoom/${roomId}`})
      }
    },
    created() {
      this.user = localStorage.getItem('user');
      this.color = localStorage.getItem('color'); 
      getGames(localStorage.getItem('user'))
        .then(res => {
          this.halfGame = res.data
          if(this.halfGame.length < 1) {
            this.isEmpty = true;
          } else {
            this.isEmpty = false;
          }
        })
        .catch(res => {
          this.$messageBox.showErrorMessage(this, res['information']);
        })
    },
  }
</script>

<style scoped>
  .ground {
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    margin: 0 auto;
    background-color: rgb(225,225,225);
    text-align: left;
  }
  .content {
    width: 40%;
    height: 40%;
    position: relative;
    margin: 0 auto;
    min-width: 400px;
    top: calc(50% - 160px);
    transform: translateY(-50%);
  }
  .bigButton {
    width: 40%;
    height: 100%;
    float: left;
    text-align: center;
    background-color: rgb(40,40,50);
    color: #fff;
    box-shadow: -5px 0px 40px 10px #aaaaaa;
    transition: 0.25s;
    z-index: 11;
    overflow: hidden;
    cursor: pointer;
  }
  .bigButton>span {
    font-size: 46px;
    position: relative;
    top: 50%;
  }
  .bigButton:hover {
    background-color: rgb(70,70,90);
  }
  .diaContent {
    margin: 30px auto;
    width: 80%;
    text-align: center;
    font-size: 26px;
  }
  #select {
    margin-top: 15px;
  }
  .create {
    display: block;
    margin: 30px auto;
  }
  .right {
    float: right;
  }
  .header {
    width: 60%;
    height: 80px;
    margin: 80px auto 0;
    min-width: 400px;
  }
  .header:after,.header:before{
    content: "";
    display: table;
  }
  .header :after {
    clear: both;
  }
  .avatar {
    font-size: 24px;
    line-height: 30px;
    margin: 5px;
    float: right;
    width: 30px;
    height: 30px;
  }
  .name {
    height: 40px;
    line-height: 40px;
    color:#409EFF;
    float: right;
  }
  #divider {
    background-color: #002451;
    margin: 40px auto;
  }
</style>