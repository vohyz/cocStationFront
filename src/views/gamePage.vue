<template>
	<div class="box">
		<div class="content">
			<el-row class="header">
			  <h3>
				游戏名: <span style="color:#409EFF">{{1}}</span>
			  </h3>
			  <h3>
				<span class="copy-btn" v-clipboard:copy="url" v-clipboard:success="onCopy" v-clipboard:error="onError">点击这里复制链接</span>
				<div style="float: right">KP: <span style="color:#409EFF">{{kp}}</span></div>
			  </h3>
			</el-row>
			<div class="fbox">
				<div class="chat">
				  <el-card class="box-card">
					<div slot="header" class="clearfix">
					  <span>{{notice}}</span>
					  <el-divider><i class="el-icon-data-board"></i></el-divider>
					  <div class="screen" style="height:380px;">
						<el-scrollbar id="showplace" ref="myScrollbar" style="height:100%">
						  <div v-for="item in items" :key="item.id">
							<el-avatar :class="item.aClass" :style="'background-color:'+item.color">{{item.name[0]}}</el-avatar>
							<div :class="item.dClass">
							  <div :class = 'item.tClass'>
								<pre> {{ item.content }}</pre>
							  </div>
							</div>
							<div style="clear:both;"></div>
						  </div>
						</el-scrollbar>
					  </div>
					</div>
					<div class="text item" style="height:100px;">
					  <el-input type="textarea"
						:rows="3"
						v-model="message"
						resize=none
						autocomplete="off"
						maxlength="500"
						show-word-limit></el-input>
					  <el-button @click="send" style="float:right;">发送</el-button>
					</div>
				  </el-card>
				</div>
				<div class="players">
				  <div class="myCard" style="height: 304px;">
					<div class="smallHeader">
					  <span>玩家列表</span>
					</div>
					<div style="height:260px;">
					  <el-scrollbar id="showplace" ref="myScrollbar2" style="height: 100%;">
						<div v-for="p in players" :key="p.name" style="width:100%;">
						  <el-avatar class="avatar" :style="'background-color:'+p.color">
							{{ p.ava }}
						  </el-avatar>
						  <label style="position:relative;top:8px;">{{p.name}}</label>
						  <div style="clear:both;"></div>
						</div>
					  </el-scrollbar>
					</div>
				  </div>
				  <div class="myCard" style="height: 202px;margin-top: 1px;" v-if="!isKp">
					<div class="smallHeader">
					  <span>修改人物</span>
					</div>
					<div style="height:460px;text-align: center;">
					  <el-input v-model="cName" style="width: 90%" placeholder="角色名"></el-input>
					  <div style="width: 90%;">
						<label style="position: relative;top: 10px;left: 7%;font-size: 14px;float: left;">选择颜色</label>
						<el-color-picker v-model="color"></el-color-picker>
					  </div>
					  <el-button style="float: right;margin-right: 10px;" @click="updateCharacter">提交</el-button>
					</div>
				  </div>
				  <div class="myCard" style="height: 141px;margin-top: 1px;" v-if="isKp">
					<div class="smallHeader">
					  <span>流程控制</span>
					</div>
					<div style="height:460px;text-align: center;">
					  <el-popconfirm title="确定结束游戏吗？这将不可更改." @onConfirm="gameEnd">
						<el-button slot="reference" style="float: right;margin-right: 10px;">结束游戏</el-button>
					  </el-popconfirm>
					</div>
				  </div>
				</div>
			</div>
		  </div>
		</div>
</template>

<script>
  import {getGame, endGame} from "../network/game";
  export default {
    name: "gamePage",
    data() {
      return {
        game: '',
        message: '',
        items: [],
        user: '',
        board: [],
        title: '',
        players: [],
        shai: '',
        hasC: false,
        color: '',
        cName: '',
        roomId: '',
        url: '',
        kp: '',
        isKp: '',
      };
    },
    sockets: {
      connect: function () {
        this.$socket.emit('my_name', this.user)
      },
      disconnect: function () {
        console.log('断开连接')
      },
      reconnect: function () {
        console.log('重新连接')
      },
      server_response: function (data) {
      },
      join_room: function (data) {
        console.log(data)
        console.log(data.length)
        this.players = []
        let i = 0
        let res = []
        for (; i < data.length; i++) {
          let ava = '';
          let name = '';
          if(data[i].cname.length > 0) {
            ava = data[i].cname[0]
            name = data[i].cname+'('+data[i].name+')'
          } else {
            ava = data[i].name[0]
            name = data[i].cname+'('+data[i].name+')'
          }
          let temp = {
            ava: ava,
            name: name, 
            color: data[i].color,
          }
          this.players.push(temp)
        }
      },
      send_message: function (data) {
        // console.log('接收数据', data)
        if(data.name === this.user){
          data = this.setClass(data, 'right')
        } else {
          data = this.setClass(data, 'left')
        }
        if(data.cname.length > 0)
          data.name = data.cname
        this.items.push(data)
      },
      server_history: function (d) {
        let data = d
        let i = 0
        for (; i < data.length; i++) {
          if(data[i][3].length > 0){
            data[i][2] = data[i][3]
          }
          let temp = {
            'id': data[i][0],
            'name': data[i][2], 
            'color': data[i][4],
            'content': data[i][1]
          }
          let res = {}
          if (data[i][2] === this.user) {
            res = this.setClass(temp, 'right')
          } else {
            res = this.setClass(temp, 'left')
          }
          this.items.push(res)
        }
      },
      my_info: function (d) {
        this.color = d['color']
        this.cName = d['cname']
      },
      close_room: function (d) {
        this.$router.replace('/ground');
      },
    },
    methods: {
      joinRoom() {
        this.$socket.emit('join_room', this.$route.params.roomId + ' ' + localStorage.getItem('user'))
      },
      getAllPlayers() {
        this.$socket.emit('get_player', this.$route.params.roomId)
      },
      send () {
        let data = this.message
        if(data.length === 0) {
          this.$messageBox.showErrorMessage(this, '发送信息不能为空');
          return 0;
        }
        this.$socket.emit('message', data)
        this.message = ''
      },
      scrollDown () {
        this.$refs['myScrollbar'].wrap.scrollTop = this.$refs['myScrollbar'].wrap.scrollHeight;
      },
      setClass(data, type) {
        data.aClass = 'avatar'+' '+type
        data.tClass = 'myTag'+' '+type
        let a = ''
        if(type === 'right') {
          a = 'left'
        } else {
          a = 'right'
        }
        data.dClass = 'anti'+' '+a
        return data
      },
      updateCharacter () {
        let l = +this.color;
        if(this.cName.length > 0 && this.color.length > 0)
          this.$socket.emit('change_character', this.cName+'<divider>'+this.color)
        else
          this.$messageBox.showErrorMessage(this, '信息不能为空');
      },
      onCopy (e) {
        console.log(this.url)
        this.$messageBox.showSuccessMessage(this, '已复制到剪贴板');
      },
      onError (e) {
        console.log('error')
        this.$messageBox.showErrorMessage(this, 'adada');
      },
      gameEnd() {
        endGame(this.roomId)
          .then(res => {
            if(res.flag==='success'){
              this.$messageBox.showSuccessMessage(this, res['information']);
            } else {
              this.$messageBox.showErrorMessage(this, res['information']);
            }
          })
          .catch(res => {
            this.$messageBox.showErrorMessage(this, res['information']);
          })
      }
    },
    mounted() {
      this.gameId = this.$route.params.gameId;
      this.url = location.href;
      this.user = localStorage.getItem('user');
      var _self = this;
      document.onkeydown = function(e){
          var keyCode = e.keyCode || e.which || e.charCode;
          var altKey = e.altKey ;
          if(altKey && keyCode == 13) {
              _self.send();
          }
      }
      getGame(this.$route.params.roomId)
        .then(res => {
          if(res.flag==='success'){
            this.game = res.data
            this.title = res.data[1];
            this.kp = res.data[5];
            if(this.kp === localStorage.getItem('user')) {
              this.isKp = true;
              console.log('isKp')
            }
            this.joinRoom();
          } else {
            console.log('shabicuowu')
            this.$messageBox.showErrorMessage(this, res['information']);
            this.$router.go(-1)
          }
        })
        .catch(res => {
          this.$messageBox.showErrorMessage(this, res['information']);
        })
    },
    beforeDestroy() {
      this.$socket.emit('leave_room', this.$route.params.roomId)
    },
    updated: function () {
      this.scrollDown()
    },
  }
</script>

<style scoped>
	.box {
	  width: 100%;
	  height: 100%;
	  position: fixed;
	  left: 0;
	  top: 0;
	  background-color: rgb(225,225,225);
	}
	.box>.header{
		height: 80px;
		width: 100%;
		background: #fff;
	}
	
</style>
