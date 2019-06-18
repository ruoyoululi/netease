<template>
	 <transition :name="trans">
	  <div class="classify" ref="classify">
	  	<n-header>
				<div class="header">
		  		<div class="back" @click.stop="goBack">
		  			<i class="icon-arrow_lift"></i>
		  		</div>
		  		<div class="classify-wrapper">
		  			<span class="title">分类</span>
		  		</div>
		  		<div class="search-wrapper" @click.stop="goSearch">
		  			<i class="icon-search"></i>
		  		</div>
		  	</div>
			</n-header>
			<div class="course-wrapper">
				<scroll class="menu-wrapper" ref="menuWrapper" :data="categoryList" v-slot:content :bounce="bounce">
					<ul>
						<li class="menu-item" v-for="(item, index) in categoryList" :class="{'current':currentIndex===index}" @click="selectMenu(item,index,$event)">
							<span class="text">{{item.name}}</span>
						</li>
					</ul>
				</scroll>
				<category :category="category"></category>
			</div>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
	import NHeader from 'base/n-header/n-header'
	import Scroll from 'base/scroll/scroll'
	import Category from 'components/category/category'
	import {getFrontCategory} from 'api/home'
	import {ERR_OK} from 'api/config'
	import {prefixStyle} from 'common/js/dom'
	const transform = prefixStyle('transform')
  export default {
  	data() {
  		return {
  			bounce: false,
  			categoryList: [],
  			currentIndex: 0,
  			category: [],
  			fromPath: 'index',
  			toPath: 'classify',
  			trans: 'fade'
  		}
  	},
  	computed: {
	},
  	created() {
  		
  		this._getFrontCategory()
  	},
  	mounted() {
  		console.log(this.trans)
  	},
  	methods: {
  		goBack() {
  			this.$router.go(-1)
  		},
  		goSearch() {
  			this.$router.push({path: '/search'})
  		},
  		selectMenu(item, index, event) {
				if(!event._constructed){
					return 
				}
				this.currentIndex = index
				this.category = item.children
		},
  		_getFrontCategory() {
  			getFrontCategory().then((res) => {
					if (res.code === ERR_OK) {
						this.categoryList = res.result
						this.category = this.categoryList[0].children
					}
				})
  		}
  	},
  	watch: {
  		'$route'(to,from) {
  			this.fromPath = to.path
			if (this.fromPath.indexOf("search") > -1) {
				this.trans = 'fade1'
  			} else {
  				this.trans = 'fade'
			}
  		}
  	},
  	components: {
  		NHeader, Scroll, Category
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"

.fade-enter-active, .fade-leave-active
	transition: all 0.2s
.fade-enter, .fade-leave-to
	opacity: 0
	transform: translate3d(100%, 0, 0)
.fade-enter-to, .fade-leave
	opacity: 1
	transform: translate3d(0, 0, 0)
.fade1-enter-active, .fade1-leave-active
	transition: all 0.2s
.fade1-enter, .fade1-leave-to
	opacity: 0
	transform: translate3d(-100%, 0, 0)
.classify
	position: fixed
	width: 100%
	top: 0
	bottom: 0
	background-color: #fff
	overflow: hidden
	z-index: 10
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
			.search-wrapper
				flex: 0 0 47px
				text-align: right
				font-size: 20px
	.course-wrapper
		position: fixed
		top: 50px
		bottom: 0
		width: 100%
		overflow: hidden
		display: flex
		.menu-wrapper
			flex: 0 0 85px
			width: 85px
			background-color: #f5faff
			.menu-item
				display: table
				height: 50px
				width: 85px
				line-height: 14px
				padding: 0 5px
				box-sizing: border-box
				&.current
					position: relative
					z-index: 10
					background: #fff
					&:after
						position: absolute
						top: 0
						left: 0
						bottom: 0
						width: 3px
						background-color: #2cc17b
						content: ' '
					.text
						color: #000
				.text
					display: table-cell
					width: 80px
					vertical-align: middle
					text-align: center
					font-size: 14px
					color: #647388
</style>