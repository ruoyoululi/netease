<template>
	<transition :name="trans" @after-enter="afterEnter">
	  <div class="recommend" v-if="recommendList.length">
			<scroll class="rec-content" ref="scroll" v-slot:content :data="recommendList" :pullup="pullup" @scrollToEnd="searchMore">
				<div>
					<ul class="recommend-list">
						<li class="list-item" v-for="(item, index) in recommendList">
							<div class="item-box">
								<div class="item-left">
									<div class="author">
										<img class="image" src="http://edu-image.nosdn.127.net/D1CB7FD39F56BE42042613B79D02EA20.png?imageView&thumbnail=277y228&quality=100">
										<span class="name">{{item.provider}}</span>
									</div>
									<div class="info">
										<h2 class="title">{{item.productName}} - {{item.webOneDesc}}</h2>
										<p class="desc">{{item.description}}</p>
									</div>
								</div>
								<div class="item-right">
									<div class="operate">
										<i class="icon-more" @click.stop="goMore(item)"></i>
										<span class="follow" v-show="!isFollow(item)" @click.stop="goFollow(item)">
											<i class="icon-plus"></i>
											关注
										</span>
									</div>
									<div class="bigImg">
										<img class="img" :src="item.imgUrl">
									</div>
								</div>
							</div>
						</li>
						<loading v-show="hasMore" title=""></loading>
					</ul>
					<div v-show="!hasMore" class="no-result-wrapper">
						<no-result title="抱歉，暂无搜索结果"></no-result>
					</div>
				</div>
			</scroll>
			<top-tip ref="topTip">
				<div class="tip-title">
					<span class="text">已添加</span>
				</div>
			</top-tip>
			<more-operate ref="operate" :tagFlag="tagFlag" :followItem="followItem" @deleteFollow="deleteFollow" @doSomething="doSomething"></more-operate>
	  </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import NoResult from 'base/no-result/no-result'
import Loading from 'base/loading/loading'
import MoreOperate from 'components/more-operate/more-operate'
import TopTip from 'base/top-tip/top-tip'
import {getRecommendList} from 'api/discovery'
import {ERR_OK} from 'api/config'
import {mapGetters, mapMutations, mapActions} from 'vuex'
	const perpage = 20
	const categoryId = 400000001582001
  export default {
  	data() {
  		return {
  			hasMore: true,
  			beforeScroll: true,
  			page: 1,
				pullup: true,
				tagFlag: true,
  			recommendList: [],
  			query: categoryId,
  			followItem: {},
  			trans: ''
  		}
  	},
  	computed: {
  		isFollow() {
  			return function(follow) {
  				const index = this.followList.findIndex((item) => {
	      		return item.productId === follow.productId
	      	})
	      	return index > -1
  			}
      },
  		...mapGetters([
  			'followList'
  		])
  	},
  	mounted() {
  		setTimeout(() => {
  			this.trans = 'fade'
  		}, 500)
  	},
  	created() {
  		this._getRecommendList()
  	},
  	methods: {
  		goMore(item) {
  			this.followItem = item
  			this.$refs.operate.show(item)
  			// console.log(this.$refs.operate)
  		},
  		goFollow(item) {
  			this.$refs.topTip.show()
  			this.saveFollowList(item)
  		},
  		searchMore() {
        if (!this.hasMore) {
          return
        }
        this.page++
        getRecommendList(this.query, this.page, perpage).then((res) => {
          if (res.code === ERR_OK) {
            this.recommendList = this.recommendList.concat(res.result.list)
            this._checkMore(res.result)
          }
        })
      },
      deleteFollow(follow) {
      	this.deleteFollowList(follow)
      },
      doSomething(follow) {
      	const index = this.recommendList.findIndex((item) => {
      		return item.productId === follow.productId
      	})
      	if (index > -1) {
      		this.recommendList.splice(index, 1)
      	}
      	return
      },
      afterEnter() {
      	this.$refs.scroll.refresh()
      },
      _getRecommendList() {
  			this.page = 1
        this.hasMore = true
  			getRecommendList(this.query, this.page, perpage).then((res) => {
  				if (res.code === ERR_OK) {
  					this.recommendList = res.result.list
						this._checkMore(res.result)
  				}
  			})
  		},
      _checkMore(data) {
        if (!data.list.length || (data.query.pageIndex * perpage) > data.query.totleCount) {
          this.hasMore = false
        }
      },
      ...mapActions([
      	'saveFollowList',
      	'deleteFollowList'
      ])
  	},
  	components: {
  		NoResult, Loading, Scroll, MoreOperate, TopTip
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"

.fade-enter-active, .fade-leave-active
	transition: all 0.2s
.fade-enter, .fade-leave-to
	opacity: 0
	transform: translate3d(-100%, 0, 0)

.recommend
	position: fixed;
	top: 50px;
	bottom: 50px;
	width: 100%;
	overflow: hidden
	.rec-content
		height: 100%
		.recommend-list
			overflow: hidden
			.list-item
				width: 100%
				padding: 12px 15px 20px 15px
				box-sizing: border-box
				border-bottom(#E6EAF2)
				.item-box
					display: flex
					.item-left
						flex: 1
						.author
							height: 25px
							line-height: 25px
							color: #222
							font-size: 13px
							.image
								float: left
								width: 22px
								height: 22px
								border-radius: 50%
							.name
								float: left
								display: inline-block
								margin-left: 10px
						.info
							margin-top: 10px
							.title
								no-wrap2()
								font-size: 16px
								line-height: 20px
								color: #000
							.desc
								margin-top: 12px
								no-wrap2()
								line-height: 15px
								color: #888
								font-size: 13px
					.item-right
						flex: 0 0 100px
						.operate
							height: 25px
							line-height: 25px
							color: #ff1d00
							font-size: 13px
							.follow
								float: right
							.icon-more
								display: inline-block
								width: 25px
								height: 30px
								margin-left: 7px
								float: right
								font-size: 20px
								transform: rotate(90deg)
						.bigImg
							margin-top: 10px
							.img
								width: 90px
								height: 90px
								float: right
								border-radius: 3px
			.no-result-wrapper
				position: absolute
				width: 100%
				top: 50%
				transform: translateY(-50%)
	.tip-title
		width: 64px
		height: 28px
		line-height: 28px
		border-radius: 14px
		background: #000
		text-align: center
		font-size: 0
		.text
			font-size: 14px
			color: #fff
</style>