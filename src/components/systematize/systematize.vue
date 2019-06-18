<template>
  <div class="systematize">
  	<n-header>
			<div class="header">
		  	<div class="back" @click.stop="goBack">
		  		<i class="icon-arrow_lift"></i>
		  	</div>
		  	<div class="classify-wrapper">
		  		<span class="title">{{system.name}}课程体系</span>
		  	</div>
		  	<div class="search-wrapper" @click.stop="goShare">
		  		<i class="icon-transpond"></i>
		  	</div>
		  </div>
		</n-header>
		<scroll class="system-content" ref="scroll" :data="dataList" v-slot:content :bounce="bounce">
			<div>
				<div class="bg-wrpper">
					<img :src="bgImg" class="bgImg">
				</div>
				<div class="teachers">
					<h1 class="title">名师专区</h1>
					<div class="teacher-list" ref="viewport">
						<scroll ref="scrollTab" direction="horizontal" v-slot:navigator>
			      <ul class="tab-list" ref="tabList">
			        <li v-for="item in teacherList" class="tab-item">
			        	<div class="item-box">
			        		<div class="avatar">
			        			<img :src="item.img" class="img">
			        		</div>
				        	<h2 class="name">{{item.name}}</h2>
				        	<p class="desc">{{item.description}}</p>
				        	<p class="bulletin">{{item.bulletin}}</p>
			        	</div>
			        </li>
			      </ul>
	    		</scroll>
					</div>
				</div>
				<div class="classes" v-if="courseList.length">
					<h1 class="title">好课推荐</h1>
					<good-class :courseList="courseList" ref="goodClass" @loadImage="loadImage"></good-class>
				</div>
			</div>
		</scroll>
  </div>
</template>
<script type="text/ecmascript-6">
	import NHeader from 'base/n-header/n-header'
	import Scroll from 'base/scroll/scroll'
	import GoodClass from 'components/good-class/good-class'
	import {mapGetters} from 'vuex'
	import {getTeachers, getCourseInfos} from 'api/system'
	import {ERR_OK} from 'api/config'
  export default {
  	data() {
  		return {
  			dataList: [],
  			bounce: false,
  			teachersList: [],
  			teacherList: [],
  			courseList: []
  		}
  	},
  	computed: {
  		bgImg() {
				switch(this.system.id)
					{
					case 10001:
					  return require('./workplace.jpg')
					  break;
					case 10002:
					  return require('./code.jpg')
					  break;
					case 10003:
					  return require('./smart.jpg')
					  break;
					case 10004:
					  return require('./product.jpg')
					  break;
					case 10005:
					  return require('./design.jpg')
					  break;
					 case 10006:
					  return require('./dianshang.jpg')
					  break;
					default:
					  return ''
					}
  		},
			...mapGetters([
				'system'
			])
		},
		 mounted() {
    	setTimeout(() => {
    		this.$nextTick(() => {
    			this._initTabListWidth()
    		})
    	}, 20)
      setTimeout(() => {
        this._adjust()
      }, 500)
    },
		created() {
			this._getInfo()
		},
		methods: {
  		goBack() {
  			this.$router.go(-1)
  		},
  		goShare() {

  		},
  		loadImage() {
  			setTimeout(() => {
					this.$nextTick(() => {
					  this.$refs.goodClass._initTabListHeight()
					})
				}, 20)
  		},
  		_initTabListWidth() {
        const tabList = this.$refs.tabList
        const items = tabList.children
        let width = 0
        for (let i = 0; i < items.length; i++) {
          width += items[i].clientWidth
        }
        tabList.style.width = (width + 1) + 'px'
      },
      _adjust() {
        const viewportWidth = this.$refs.viewport.clientWidth
        const tabListWidth = this.$refs.tabList.clientWidth
        const minTranslate = Math.min(0, viewportWidth - tabListWidth)
        const middleTranslate = viewportWidth / 2
        const items = this.$refs.tabList.children
        let width = 0
        let translate = middleTranslate - width
        translate = Math.max(minTranslate, Math.min(0, translate))
        this.$refs.scrollTab.scrollTo(translate, 0, 300)
      },
  		_getInfo() {
  			if (!this.system.id) {
					this.$router.push('/index')
					return
				}
				getTeachers().then((res) => {
						if (res.errno === ERR_OK) {
							this.teachersList = res.data
							const index = this.teachersList.findIndex((item) => {
								return item.id === this.system.id
							})
							if (index > -1) {
								this.teacherList = this.teachersList[index].teacher
								this.dataList = this.dataList.concat(this.teacherList)
								setTimeout(() => {
					    		this.$nextTick(() => {
					    			this._initTabListWidth()
					    		})
					    	}, 20)
							}
						}
				})
				getCourseInfos().then((res) => {
					if (res.errno === ERR_OK) {
						const courseInfos = res.data
						const index = courseInfos.findIndex((item) => {
								return item.id === this.system.id
						})
						if (index > -1) {
							this.courseList = courseInfos[index].courseList
							this.dataList = this.dataList.concat(this.courseList)
						}
					}
				})
	  	},
  	},
  	watch: {
      '$route'(to, from) {
      	this._getInfo()
      }
    },
  	components: {
  		NHeader, Scroll, GoodClass
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.systematize
	position: fixed
	top: 0
	bottom: 0
	width: 100%
	background-color: #fff
	.n-header
		padding: 15px 15px 0 15px
		border-bottom(#E6EAF2)
		.header
			display: flex
			flex-flow: row
			line-height: 22px
			color: #000
			.back
				flex: 0 0 40px
				padding-top: 3px
				font-size: 16px
			.classify-wrapper
				flex: 1
				font-size: 17px
				text-align: center
				no-wrap()
			.search-wrapper
				flex: 0 0 47px
				text-align: right
				font-size: 26px
	.system-content
		position: fixed
		top: 50px
		bottom: 0
		width: 100%
		overflow: hidden
		background-color: #f6f6f6
		.bg-wrpper
			.bgImg
				display: block
				width: 100%
		.teachers
			padding: 35px 0
			box-sizing: border-box
			background-color: #fff
			.title
				line-height: 35px
				font-size: 28px
				color: #333
				text-align: center
			.teacher-list
				position: relative
				width: 100%
				padding: 15px 22px
				box-sizing: border-box
				overflow: hidden
				&:after, &:before
					position: absolute
					content: ' '
					top: 0
					display: inline-block
					width: 22px
					height: 215px
					background-color: #fff
				&:after
					right: 0
				&:before
					left: 0
					z-index: 100
				.list-wrapper
					width: 100%
					overflow: hidden
					.tab-list
						overflow: hidden
						.tab-item
							float: left
							.item-box
								width: 220px
								height: 280px
								margin: 0 6px
								padding: 25px 15px 0 15px
								box-sizing: border-box
								background-color: #f6f6f6
								text-align: center
								overflow: hidden
								.avatar
									.img
										display: inline-block
										width: 72px
										height: 72px
										border-radius: 50%
								.name
									margin-top: 5px
									color: #333
									line-height: 40px
									font-size: 18px
								.desc
									color: #a5a5a5
									font-size: 12px
									no-wrap()
								.bulletin
									margin-top: 15px
									height: 80px
									line-height: 16px
									text-align: left
									color: #757575
									font-size: 12px
									text-overflow: ellipsis
									overflow: hidden
									display: -webkit-box
									-webkit-line-clamp: 5
									line-clamp: 5
									-webkit-box-orient: vertical
		.classes
			padding: 35px 0
			box-sizing: border-box
			.title
				margin-bottom: 16px
				line-height: 35px
				font-size: 28px
				color: #333
				text-align: center
</style>