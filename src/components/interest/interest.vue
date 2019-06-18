<template>
  <div class="interest">
  	<n-header>
		<div class="header" @click.stop="goBack">
		  	<i class="icon-arrow_lift"></i>
		 </div>
		</n-header>
		<scroll class="system-content" ref="scroll" :data="dataList" v-slot:content :bounce="bounce">
			<div>
				<div class="title">
					<h1 class="choose">选择你的学习兴趣</h1>
					<p class="point">至少一个，可随时调整</p>
				</div>
				<ul class="content">
					<li class="item-box" v-for="(item, index) in dataList">
						<h2 class="module-name">{{item.name}}</h2>
						<ul class="child-wrapper">
							<li class="child-item" v-for="(child, num) in item.children" :class="isCurrent(child)" @click.stop="toggleInterest(child)">
								<span class="name">{{child.name}}</span>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</scroll>
		<div class="interest-box">
			<div class="btn" @click.stop="goInterest" :class="{'active' : interestCount>0}">确定（已选<span class="count">{{interestCount}}</span>个）</div>
		</div>
  </div>
</template>
<script type="text/ecmascript-6">
import NHeader from 'base/n-header/n-header'
import Scroll from 'base/scroll/scroll'
import {getPointsOfInterest} from 'api/home'
import {ERR_OK} from 'api/config'
import {mapGetters, mapActions} from 'vuex'
  export default {
  	data() {
  		return {
  			bounce: false,
  			dataList: [],
  			interestCount: 0
  		}
  	},
  	computed: {
  		...mapGetters([
				'interestList'
			])
  	},
  	mounted() {
  		this.interestCount = this.interestList.length
  	},
  	created() {
  		this._getPointsOfInterest()
  	},
  	methods: {
  		isCurrent(child) {
  			if (this.isInterest(child)) {
  				return 'current'
  			}
  			return 'name'
  		},
  		isInterest(child) {
  			const index = this.interestList.findIndex((item) => {
	      	return child.id === item.id
	      })
	      return index > -1
  		},
  		goBack() {
  			this.$router.go(-1)
  		},
  		toggleInterest(item) {
  			if (this.isInterest(item)) {
  				this.interestCount --
  				this.deleteInterestList(item)
  			} else {
  				this.interestCount ++
  				this.saveInterestList(item)
  			}
  		},
  		goInterest() {
  			this.$router.push({path: '/index'})
  		},
  		_getPointsOfInterest() {
  			getPointsOfInterest().then((res) => {
  				this.dataList = res.categoryDtos
  			})
  		},
  		...mapActions([
				'saveInterestList', 'deleteInterestList'
			])
  	},
  	components: {
  		NHeader, Scroll
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.interest
	position: fixed
	top: 0
	bottom: 0
	width: 100%
	background-color: #fff
 	.n-header
		padding: 15px 15px 0 15px
		.header
			line-height: 22px
			color: #222
			padding-top: 3px
			font-size: 16px
	.system-content
		position: fixed
		top: 50px
		bottom: 0
		width: 100%
		overflow: hidden
		.title
			text-align: center
			line-height: 50px
			.choose
				color: 000 
				font-size: 23px
			.point
				color: #a0a0a0
				font-size: 16px
				line-height: 16px
		.content
			padding: 10px 11px 90px 11px
			overflow: hidden
			.item-box
				padding: 20px 0 15px 0
				box-sizing: border-box
				border-bottom(#f3f5f7)
				.module-name
					line-height: 25px
					color: #000
					font-size: 16px
					margin: 0 4px 8px 4px
				.child-wrapper
					display: flex
					flex-wrap: wrap
					flex-direction: row
					overflow: hidden
					.child-item
						margin: 5px 4px
						height: 32px
						line-height: 32px
						.name
							display: block
							min-width: 75px
							padding: 0 8px
							box-sizing: border-box
							text-align: center
							border: 1px solid #e0e0e0
							border-radius: 16px
							font-size: 14px
							color: #6b7a8f
						&.current
							.name
								border: none
								background-color: #2cc17b
								color: #fff
	.interest-box
		position: fixed
		bottom: 0
		width: 100%
		height: 75px
		display: flex
		justify-content:  center
		.btn
			width: 240px
			text-align: center
			height: 50px
			line-height: 50px
			color: #fff
			font-size: 16px
			border-radius: 25px
			background-color: #d8dfe8
			&.active
				background-color: #2cc17b
</style>