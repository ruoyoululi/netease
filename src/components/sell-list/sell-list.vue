<template>
  <div class="sell-list">
  	<div class="end-time">
    	<p class="desc" v-show="nowSellList">特惠抢购中，不要错过哦~</p>
    	<p class="desc" v-show="!nowSellList">限时特惠，即将开抢~</p>
    	<div class="right" v-show="nowSellList">
    		<span>距结束：</span>
    		<div class="time">
    			<span class="dot" id="hour"></span> : <span class="dot" id="minute"></span> : <span class="dot" id="second"></span>
    		</div>
    	</div>
    </div>
  	<ul class="list-box">
  		<li class="list-item" v-for="(item, index) in sellList.courseList">
  			<div class="item-box">
  				<img class="image" :src="item.yktCourseCardv.smallPhotoUrl" alt="">
  				<div class="info">
  					<h2 class="title">{{item.rawData.title}}</h2>
  					<div class="desc">
  						<p class="price"><span class="new" v-if="item.yktCourseCardv.universalCoupon.discountAmount">{{item.yktCourseCardv.universalCoupon.discountAmount.toFixed(2)}}</span>
  							<span :class="{'line':item.yktCourseCardv.universalCoupon.discountAmount}">{{item.yktCourseCardv.price}}</span></p>
  						<p class="number" v-show="nowSellList">仅剩30席</p>
  						<p class="number" v-show="!nowSellList">限量30席</p>
  						<div class="sell-btn" v-show="nowSellList">
  							<span class="bgImage">马上抢</span>
  						</div>
  						<div class="sell-btn" v-show="!nowSellList">即将开抢</div>
  					</div>
  				</div>
  			</div> 			
  		</li>
  	</ul>
  </div>
</template>
<script type="text/ecmascript-6">
	import {mapGetters} from 'vuex'
	import {getSellList} from 'api/home'
	import {ERR_OK} from 'api/config'
	import {getTime} from 'common/js/util'
  export default {
  	data() {
  		return {
  			fields: []
  		}
  	},
  	computed: {
  		nowSellList() {
  			if (this.sellList.fields) {
  				const result = getTime(this.sellList.fields.startTime)
	  			if (/^[\u4e00-\u9fa5]+$/.test(result)) {
	    			return true
	    		} else {
	    			return false
	    		}
  			} else {
  				return false
  			}
  		},
  		...mapGetters([
  			'fieldsList',
  			'sellList'
  		])
  	},
  	mounted() {
  		this.fields = this.sellList.fields
  		this.endTime()
  	},
  	methods: {
  		endTime() {
  			if (this.fields) {
  				let times = Math.round(this.fields.endTime - Date.now())
		    	const hour = parseInt(times/3600/1000)
		    	const minute = parseInt((times-hour*3600000)/60/1000)
		    	const second = parseInt((times-hour*3600000-minute*60000)/1000)
		    	if (hour <= 0 & minute <= 0 & second <= 0) {
		    		this.fields = []
		    		clearTimeout(this.timer)
		    		this.$router.replace({path: '/refresh'})
		    	}
		    	const result = this.sellList.fields ? getTime(this.sellList.fields.startTime) : ''
	  			if (/^[\u4e00-\u9fa5]+$/.test(result)) {
	    			if(document.getElementById("hour")) document.getElementById("hour").innerHTML = this._pad(hour) 
			    	if(document.getElementById("minute")) document.getElementById("minute").innerHTML = this._pad(minute)
			    	if(document.getElementById("second")) document.getElementById("second").innerHTML = this._pad(second)
			    	
	    		}
  			}
  			this.timer = setTimeout(() => {
			    		this.endTime()
			    	}, 1000)
  		},
  		_pad(num, n = 2) {
		    let len = num.toString().length
		    while (len < n) {
		        num = '0' + num
		        len++
		    }
		    return num
			}
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.sell-list
		width: 100%
		.end-time
			height: 35px
			line-height: 35px
			font-size: 12px
			color: #888
			.desc
				float: left
			.right
				float: right
				color: #222
				.time
					float: right
					.dot
						display: inline-block
						width: 20px
						height: 20px
						line-height: 20px
						text-align: center
						background-color: rgba(0,0,0,0.8)
						color: #fff
						border-radius: 2px
		.list-box
			overflow: hidden
			.list-item
				padding-bottom: 18px
				&:last-child
					padding-bottom: 0
				.item-box
					display: flex
					.image
						flex 0 0 130px
						width: 130px
						height: 80px
					.info
						position: relative
						flex: 1
						margin: 0 0 0 10px
						.title
							color: #000
						.desc
							position: absolute
							bottom: 0
							right: 0
							width: 100%
							margin-top: 3px
							line-height: 17px
							font-size: 14px
							color: #ff1d00
							.price
								.line
									font-size: 12px
									color: #888
									text-decoration: line-through
							.number
								font-size: 12px
							.sell-btn
								position: absolute
								right: 0
								bottom: 0
								width: 75px
								height: 27px
								line-height: 27px
								background-color: #ff1d00
								border-radius: 3px
								font-size: 12px
								color: #fff
								text-align: center
								.bgImage
									display: inline-block
									width: 53px
									text-align: right
									background: url('./icon-buy.png') 0 2px no-repeat
									background-size: 20px 20px
</style>