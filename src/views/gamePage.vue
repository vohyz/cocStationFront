<template>
	<div class="box">
		<div class="content">
			<el-row class="header">
			  <h3>
				游戏名: <span style="color:#409EFF">{{game.name}}</span>
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
