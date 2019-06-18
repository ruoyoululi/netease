<template>
	<div class="home">
		<n-header>
			<div class="header">
	  		<div class="code">
	  			<i class="icon-qr_code"></i>
	  		</div>
	  		<div class="search-wrapper" @click.stop="toSearch">
	  			<div class="search-box">
	  				<i class="icon-search"></i>
	  				<input type="text" class="search" placeholder="搜索课程">
	  			</div>
	  		</div>
	  		<div class="classify" @click.stop="toClassify">
	  			分类
	  		</div>
	  	</div>
		</n-header>
		<scroll class="home-content" ref="scroll" :data="dataList" v-slot:content :bounce="bounce" :pullDownRefresh="pullDownRefreshObj"
              @pullingDown="onPullingDown">
			<div class="home-box">
				<div v-if="recommends.length" class="slider-wrpper">
					<slider>
						<div v-for="item in recommends" :key="item.id">
							<a class="needsclick" :href="item.targetTo">
								<img @load="loadImage" :src="item.photoUrl">
							</a>
						</div>
					</slider>
				</div>
				<div class="study-wrapper study-path" v-if="studyList.length">
					<div class="path-title">
						<h1>系统化学习路径</h1>
					</div>
					<study-module :studyList="studyList" @selectModule="selectModule"></study-module>
				</div>
				<split></split>
				<div class="study-wrapper" v-if="liveList.length">
					<div class="path-title">
						<h1>课堂直播</h1>
					</div>
					<broadcast :liveList="liveList"></broadcast>
				</div>
				<split></split>
				<div class="study-wrapper occupation-path"  v-if="occupationList.length">
					<div class="path-title">
						<h1>职业岗位的体系化培训课程</h1>
					</div>
					<occupation :occupationList="occupationList"></occupation>
				</div>
				<div class="study-wrapper sell-path" v-if="fieldsList.length && sellList.length">
					<div class="path-title">
						<h1>限时秒杀</h1>
					</div>					
					<sell-time v-if="fieldsList.length && sellList.length" :sellList="sellList" :fieldsList="fieldsList"></sell-time>
				</div>
				<split v-if="interestList.length"></split>
				<div class="interest-wrapper" v-if="interestList.length">
					<div class="interest-header">
						<h1 class="rec-title">个性化推荐</h1>
						<p class="rec-desc"># 根据你的学习兴趣推荐 #</p>
					</div>
					<ul class="int-content">
						<li class="int-item" v-for="(item, index) in interestList">
							<div class="int-box">
								<h1 class="int-title">{{item.name}}</h1>
								<category-list :categoryId="item.id"></category-list>
								<div class="more">
						  		查看更多
						  		<i class="icon-keyboard_arrow_right"></i>
						  	</div>
							</div>
							<split v-if="index<interestList.length-1"></split>
						</li>
					</ul>
				</div>
				<div class="interest">
					<div class="interest-box">
						<div class="btn" @click.stop="goInterest">调整学习兴趣</div>
						<p class="desc">- 从此更懂你的学习需求 -</p>
					</div>
				</div>
			</div>
		</scroll>
	</div>
</template>
<script type="text/ecmascript-6">
import NHeader from 'base/n-header/n-header'
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import StudyModule from 'components/study-module/study-module'
import Split from 'base/split/split'
import Broadcast from 'components/broadcast/broadcast'
import Occupation from 'components/occupation/occupation'
import SellList from 'components/sell-list/sell-list'
import SellTime from 'components/sell-time/sell-time'
import CategoryList from 'components/category-list/category-list'
import {getTopBanner, getStudyList, getLiveCardList, getIndexMicroData, getSellList} from 'api/home'
import {mapGetters, mapMutations} from 'vuex'
import {ERR_OK} from 'api/config'

  export default {
  	data() {
			return {
				bounce: {top: true, bottom: false},
				recommends: [],
				studyList: [],
				liveList: [],
				dataList: [],
				occupationList: [],
				sellList: [],
				fieldsList: [],
				pullDownRefresh: true,
        pullDownRefreshThreshold: 90,
        pullDownRefreshStop: 40
			}
		},
		computed: {
			pullDownRefreshObj: function () {
        return this.pullDownRefresh ? {
          threshold: parseInt(this.pullDownRefreshThreshold),
          stop: parseInt(this.pullDownRefreshStop)
        } : false
      },
			...mapGetters([
				'interestList'
			])
		},
		mounted() {
			if (this.interestList > 0) {
				this.dataList = this.dataList.concat(this.interestList)
			}
		},
		created() {
				this._getTopBanner()
				this._getStudyList()
				this._getLiveCardList()
				this._getIndexMicroData()
				this._getSellList()
		},
  	methods: {
  		toClassify() {
  			this.$router.push({path: '/classify/1'})
  		},
  		toSearch() {
  			this.$router.push({path: '/search'})
  		},
  		selectModule(item) {
  			this.$router.push({path: '/system/' + item.id})
  			this.setSystem(item)
  		},
  		goInterest() {
  			this.$router.push({path: '/interest'})
  		},
  		onPullingDown() {
  			setTimeout(() => {
          this.$refs.scroll.forceUpdate()
          this.$router.replace({path: '/refresh'})
        }, 2000)
  		},
  		loadImage() {
				if (!this.checkLoaded) {
					this.$refs.scroll.refresh()
					this.checkLoaded = true
				}
			},
  		_getSellList() {
  			getSellList().then((res) => {
					if (res.code === ERR_OK) {
						const info = res.result.courseList
						const time = res.result.fieldsList[0]
						this.fieldsList = res.result.fieldsList
						this.fieldsList.forEach((item, index) => {
							Object.assign(item, {
							id: index + 1
							})
						})
						this.sellList.push({
							courseList: info,
							id: 1,
							fields: time
						})
						const newList = this.fieldsList.slice(1)
						newList.forEach(async (item1) => {
		  				await getSellList(item1.activityDate, item1.fields).then((res1) => {
		  					if (res1.code === ERR_OK) {
		  						const info1 = res1.result.courseList
		  						this.sellList.push({courseList: info1, id: item1.id})
		  					}
		  				})
	  				})
	  				const list = this.sellList.slice(0, 1)
	  				this.dataList = this.dataList.concat(list)
	  				this.setSellList(list[0])
					}
				})
  		},
  		_getTopBanner() {
				getTopBanner().then((res) => {
					if (res.code === ERR_OK) {
						this.recommends = res.result.focusDtoList
						this.dataList = this.dataList.concat(this.recommends)
					}
				})
			},
			_getStudyList() {
				getStudyList().then((res) => {
					if (res.code === ERR_OK) {
						this.studyList = res.result
						this.dataList = this.dataList.concat(this.studyList)
					}
				})
			},
			_getLiveCardList() {
				getLiveCardList().then((res) => {
					if (res.code === ERR_OK) {
						this.liveList = res.result.list.slice(0,4)
						this.dataList = this.dataList.concat(this.liveList)
					}
				})
			},
			_getIndexMicroData() {
				getIndexMicroData().then((res) => {
					if (res.code === ERR_OK) {
						this.occupationList = res.result.contentModuleVo
						this.dataList = this.dataList.concat(this.occupationList)
					}
				})
			},
			...mapMutations({
				setSellList: 'SET_SELL_LIST',
				setSystem: 'SET_SYSTEM'
			})
  	},
  	watch: {
  		dataList(newVal) {
				this.$refs.scroll.refresh()
  		},
  		pullDownRefreshObj: {
        handler(val) {
          const scroll = this.$refs.scroll.scroll
          if (val) {
            scroll.openPullDown()
          } else {
            scroll.closePullDown()
          }
        },
        deep: true
      }
  	},
  	components: {
  		NHeader, Scroll, Slider, StudyModule, Split, Broadcast, Occupation,
  		SellTime, SellList,
  		CategoryList
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/variable"
	.home
		position: fixed
		width: 100%
		top: 0
		bottom: 50px
		.n-header
			.header
				display: flex
				flex-flow: row
				.code
					flex: 0 0 40px
					padding-top: 3px
					font-size: 25px
				.search-wrapper
					height: 30px
					flex: 1
					.search-box
						display: flex
						height: 100%
						background-color: #f2f2f2
						border-radius: 30px
						.icon-search
							display: inline-block
							flex: 0 0 20px
							padding: 6px 5px 6px 10px
						.search
							// flex: 1 1 auto
							width: 100%
							display: block
							background-color: rgba(0,0,0,0)
							border: none
							outline: none
							font-size: 14px
				.classify
					flex: 0 0 47px
					text-align: right
					box-sizing: border-box
					padding-top: 7px
		.home-content
			position: fixed
			top: 50px
			bottom: 50px
			width: 100%
			overflow: hidden
			.home-box
				.slider-wrpper
					position: relative
					width: 100%
					overflow: hidden
			.study-path
				padding: 24px 0 !important
				.path-title
					padding: 0 12px
			.study-wrapper
				padding: 24px 12px
				.path-title
					h1
						font-size: 20px
						font-weight: 700
			.occupation-path
				padding: 24px 7px !important
				.path-title
					padding: 0 5px !important
			.sell-path
				padding: 0 12px 24px 12px !important
			.interest
				display: flex
				justify-content:  center
				height: 146px
				background-color: #f6f6f6
				.interest-box
					width: 200px
					margin-top: 50px
					text-align: center
					.btn
						height: 40px
						line-height: 40px
						color: #000
						font-size: 15px
						border: 1px solid #888
						border-radius: 20px
					.desc
						color: #888
						font-size: 11px
						line-height: 40px
			.interest-wrapper
				.interest-header
					position: relative
					width: 100%
					height: 80px
					padding-top: 30px
					background-color: rgba(44,193,123, 1)
					color: #fff
					text-align: center
					.rec-title
						line-height: 30px
						font-size: 24px
					.rec-desc
						line-height: 26px
						font-size: 13px
					&:after
						position: absolute
						content: ' '
						bottom: -6px
						margin-left: -6px
						width: 12px
						height: 12px
						background-color: rgba(44,193,123, 1)
						transform: rotate(45deg)
				.int-content
					.int-item
						.int-box
							padding: 30px 12px 24px 12px
							.int-title
								font-size: 20px
								font-weight: 700
								line-height: 25px
							.more
								margin-top: 25px
								font-size: 14px
								color: #49af4f
								text-align: center
</style>