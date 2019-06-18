<template>
  <div class="broadcast">
  	<ul class="wrapper">
  		<li class="item" v-for="(item, index) in liveList" :key="item.liveId">
  			<div class="startTime">
  				<p class="live-time" v-show="!isLive(item.startTime)" v-html="isToday(item.startTime)"></p>
  				<span v-show="isLive(item.startTime)">直播中</span>
  				<div class="state">
  					<span class="line" v-show="index!==0"></span>
  					<span class="dot" v-show="!isLive(item.startTime)"></span>
  					<img class="live" src="./live.gif" v-show="isLive(item.startTime)">
  				</div>
  			</div>
  			<div class="info">
  				<h2 class="title">{{item.liveName}}</h2>
  				<div class="teacher">
  					<img class="img" :src="item.livePic">
  					<span class="name">{{item.lector}}</span>
  				</div>
  			</div>
  		</li>
  	</ul>
  	<div class="more">
  		查看更多
  		<i class="icon-keyboard_arrow_right"></i>
  	</div>
  </div>
</template>
<script type="text/ecmascript-6">
import {getTime} from 'common/js/util'
  export default {
  	props: {
  		liveList: {
  			type: Array,
  			default: []
  		}
  	},
  	methods: {
  		isLive(interval) {
        const result = this.isToday(interval)
        if (result === '直播中') {
        	return true
        }
      },
      isToday(interval) {
        return getTime(interval)
      }
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
@import "~common/stylus/base"
  .broadcast
  	padding-top: 10px
  	box-sizing: border-box
  	.wrapper
  		overflow: hidden
  		.item
  			display: flex
  			width: 100%
  			margin-top: 6px
  			.startTime
  				position: relative
  				flex: 0 0 70px
  				margin-top: 10px
  				font-size: 13px
      .live-time
          max-width:50px
  				.state
  					position: absolute
  					display: inline-block
  					top: 0
  					right: 10px
  					.line
  						position: absolute
  						float: right
  						top: -15px
  						right: 4px
  						display: inline-block
  						width: 3px
  						height: 28px
  						border-line(#d5d5d5)
  					.dot
  						display: inline-block
  						width: 8px
  						height: 8px
  						background-color: #d5d5d5
  						border-radius:  50%
  					.live
  						position: absolute
  						right: 0
  						width: 14px
  						height: 14px
				.info
					flex: 1
					position: relative
					padding: 15px 9px 13px 9px
					background-color: #f5f5f5
					border-radius: 3px
					&:after
						content: ' '
						position: absolute
						top: 15px
						left: -4px
						width: 8px
						height: 8px
						background-color: #f5f5f5
						transform: rotate(45deg)
					.title
						line-height: 16px
						font-size: 15px
						color: #000
					.teacher
						margin-top: 8px
						font-size: 0
						.img
  						width: 20px
  						height: 20px
  						border-radius: 50%
  						vertical-align: top
  					.name
							display: inline-block
							margin: 5px 0 0 5px
							font-size: 13px
							color: #888
		.more
			margin-top: 25px
			font-size: 14px
			color: #49af4f
			text-align: center
</style>