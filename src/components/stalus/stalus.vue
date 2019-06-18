<template>
  <transition :name="trans" @after-enter="afterEnter">
	  <div class="stalus">
			<scroll class="rec-content" ref="scroll" v-slot:content :bounce="bounce">
				<div>
					<div class="stalus-wrapper">
						<div class="echart-wrapper" id="myChart" style="width:100%; height: 170px;" ref="myEchart"></div>
						<div class="study-box">
							<div class="time-box">
								<p class="title">今日学习</p>
								<div class="info"><span class="time">1</span> 分钟</div>
							</div>
							<div class="time-box">
								<p class="title">连续学习</p>
								<div class="info"><span class="time">1</span> 天</div>
							</div>
							<div class="time-box">
								<p class="title">累计学习</p>
								<div class="info"><span class="time">0</span> 小时</div>
							</div>
						</div>
						<div class="bg-box"></div>
					</div>
					<split></split>
					<div class="no-data">
						<div class="no-wrapper">
							<i class="icon-data_no"></i>
					 		<p class="desc" @click.stop="toClass">你还没有任何，去选课<i class="icon icon-keyboard_arrow_right"></i></p>
						</div>
					</div>
					<div class="classes-wrapper">
						
					</div>
				</div>
			</scroll>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
	import Vue from 'vue'
	// import echarts from 'echarts'
	let echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	require('echarts/lib/chart/line')
	import Scroll from 'base/scroll/scroll'
	import Split from 'base/split/split'
	import {getCourseList} from 'api/myStudy'
	import {ERR_OK} from 'api/config'
	// Vue.prototype.$echarts = echarts 
	const perpage = 20
  export default {
  	data() {
  		return {
  			bounce: {top: true, bottom: false},
  			page: 1,
  			hasMore: true,
  			courseList: [],
  			trans: ''
  		}
  	},
  	created() {
  		// this._getCourseList()
  	},
  	mounted() {
  		this._initMyChart()
  		setTimeout(() => {
  			this.trans = 'fade'
  		}, 500)
  	},
  	methods: {
  		afterEnter() {
  			
  		},
  		toClass() {
  			this.$router.push({path: '/index'})
  		},
  		_initMyChart() {
  			 let myChart = echarts.init(document.getElementById('myChart'))
  			 const data = ["6.1","6.2","6.3","6.4","6.5","6.7",'今天']
        // 绘制图表
        myChart.setOption({
        	grid: {
        		top: 22,
        		left: '8%',
        		right: '8%',
        		bottom: 28,
        		containLabel: true
        	},
          tooltip: {},
          xAxis: {
          	splitNumber: 7,
          	boundaryGap: false,
          	axisLine: {lineStyle: {color: '#ebebeb'}},
          	axisTick: {show: false},
          	axisLabel: {
          		margin: 5, 
          		color: (value, index) => {
				        return index === data.length - 1 ? '#000' : '#888';
				    	}
  					},
          	splitLine: {show: false},
            data: data
          },
          yAxis: {
          	splitNumber: 6,
          	axisLine: {show: false},
          	axisTick: {show: false},
          	axisLabel: {show: false},
          	splitLine: {
          		lineStyle: {color: '#ebebeb'}
          	}
          },
          series: [{
            name: '分钟',
            type: 'line',
            symbolSize: 6,
            label: {
            	normal: {show: true, color: '#2cc17b', distance: 1,
	            	formatter: (params) => {
	            		return params.dataIndex === data.length - 1 ? '{x|' + params.value   + params.seriesName + '}' : params.value},
	            	rich: {
			            x: {
			                color: '#fff',
			                lineHeight: 19,
			                backgroundColor: '#2cc17b',
			                borderRadius: 10,
			                padding: [4, 8, 4, 8]
			            }
		          	},
            	}
            },
            itemStyle: {
            	normal: {color: '#2cc17b',borderWidth: 2}
            },
            lineStyle: {
            	normal: {color: '#52c76c', width: 3}
            },
            smooth: true,
            data: [0, 0, 0, 0, 5, 3, 1]
          }]
        })
  		},
  		_getCourseList() {
			this.page = 1
        	this.hasMore = true
  			getCourseList(this.page, perpage).then((res) => {
  				if (res.code === ERR_OK) {
  					this.courseList = res.result.resultList
						// this._checkMore(res.result)
  				}
  			})
  		},
  		_checkMore(data) {
        if (!data.list.length || (data.query.pageIndex * perpage) > data.query.totleCount) {
          this.hasMore = false
        }
      }
  	},
  	components: {
  		Scroll, Split
  	}
  }
</script>
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"

.fade-enter-active, .fade-leave-active
	transition: all 0.2s
.fade-enter, .fade-leave-to
	opacity: 0
	transform: translate3d(-100%, 0, 0)

.stalus
	position: fixed;
	top: 50px;
	bottom: 50px;
	width: 100%;
	overflow: hidden
	.rec-content
		height: 100%
		.stalus-wrapper
			position: relative
			width: 100%
			height: 270px
			background-color: #f5f5f5
			box-sizing: border-box
			.echart-wrapper
				height: 170px
			.study-box
				position: absolute
				bottom: 12px
				left: 9px
				right: 9px
				height: 100px
				background-color: #fff
				border-radius: 5px
				display: flex
				box-shadow: 0 5px 10px #eee
				z-index: 2
				padding: 20px 3px
				box-sizing: border-box
				.time-box
					flex: 1
					padding: 0 12px
					box-sizing: border-box
					border-line(#e0e0e0)
					&:first-child
						border-none()
					.title
						line-height: 15px
						font-size: 15px
					.info
						margin-top: 20px
						font-size: 13px
						color: #aaa
						.time
							font-size: 26px
							font-weight: 400
							color: #000
			.bg-box
				position: absolute
				bottom: 0
				left: 0
				right: 0
				height:50px
				background-color: #fff
				z-index: 1
		.no-data
			height: 300px
			display: flex
			justify-content:  center
			align-items: center
			.no-wrapper
				flex: 0 0 185px
				height: 200px
				text-align: center
				.icon-data_no
					font-size: 120px
				.desc
					margin-top: 10px
					color: #888
</style>