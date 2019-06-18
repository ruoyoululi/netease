<template>
	<transition name="fade" @after-enter="afterEnter">
		<div class="follow">
			<div class="no-data" v-show="!followList.length">
				<div class="no-wrapper">
					 <i class="icon-data_off_line"></i>
					 <p class="desc">暂时没有动态</p>
				</div>
			</div>
			<div class="data-list" v-show="followList.length">
				<scroll class="rec-content" ref="scroll" v-slot:content :data="followList">
					<div>
						<ul class="recommend-list">
							<li class="list-item" v-for="(item, index) in followList">
								<div class="item-header">
									<div class="author">
										<img class="image" src="http://edu-image.nosdn.127.net/D1CB7FD39F56BE42042613B79D02EA20.png?imageView&thumbnail=277y228&quality=100">
										<span class="name">{{item.provider}}</span>
										<span class="sub-desc">发表了文章</span>
									</div>
									<div class="operate">
										<i class="icon-more" @click.stop="goMore(item)"></i>
									</div>
								</div>
								<div class="item-content">
									<div class="info">
										<h2 class="title">{{item.productName}} - {{item.webOneDesc}}</h2>
										<p class="desc">{{item.description}}</p>
									</div>
									<div class="bigImg">
										<img class="img" :src="item.imgUrl">
									</div>
								</div>
							</li>
						</ul>
						<!-- <div class="no-result-wrapper">
							<no-result title="抱歉，暂无搜索结果"></no-result>
						</div> -->
					</div>
				</scroll>
			</div>
			<more-operate ref="operate" :tagFlag="tagFlag" :followItem="followItem" @deleteFollow="deleteFollow"></more-operate>
  	</div>
	</transition>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import MoreOperate from 'components/more-operate/more-operate'
import {mapGetters, mapMutations, mapActions} from 'vuex'
  export default {
  	data() {
  		return {
  			followItem: {},
  			tagFlag: false
  		}
  	},
  	computed: {
  		...mapGetters([
  			'followList'
  		])
  	},
  	methods: {
  		goMore(item) {
  			this.followItem = item
  			this.$refs.operate.show(item)
  		},
  		deleteFollow(follow) {
      	this.deleteFollowList(follow)
      },
      afterEnter() {
      	this.$refs.scroll.refresh()
      },
      ...mapActions([
      	'deleteFollowList'
      ])
  	},
  	components: {
  		Scroll, MoreOperate
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

.follow
	position: fixed;
	top: 50px;
	bottom: 50px;
	width: 100%;
	overflow: hidden
	.no-data
		height: 100%
		display: flex
		justify-content:  center
		align-items: center
		.no-wrapper
			flex: 0 0 120px
			width: 120px
			height: 200px
			text-align: center
			.icon-data_off_line
				font-size: 120px
			.desc
				margin-top: 10px
				color: #888
	.data-list
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
					padding: 14px 15px 25px 15px
					box-sizing: border-box
					border-bottom(#E6EAF2)
					&:last-child
						border-none()
					.item-header
						display: flex
						.author
							flex: 1
							height: 25px
							line-height: 25px
							color: #222
							font-size: 13px
							.image
								float: left
								width: 22px
								height: 22px
								border-radius: 50%
							.name, .sub-desc
								float: left
								display: inline-block
								margin-left: 10px
							.sub-desc
								font-size: 10px
								color: #888
						.operate
							flex: 0 0 30px
							height: 25px
							line-height: 25px
							.icon-more
								display: inline-block
								width: 25px
								height: 30px
								font-size: 20px
								transform: rotate(90deg)
					.item-content
						width: 100%
						display: flex
						margin-top: 16px
						background-color: #f5f5f5
						padding: 8px 8px 10px 8px
						box-sizing: border-box
						border-radius: 3px
						.info
							flex: 1
							overflow: hidden
							padding-right: 10px
							.title
								no-wrap2()
								font-size: 14px
								line-height: 18px
								color: #000
							.desc
								margin-top: 12px
								no-wrap()
								line-height: 13px
								color: #888
								font-size: 11px
						.bigImg
							flex: 0 0 90px
							.img
								width: 90px
								height: 60px
								float: right
								border-radius: 2px
</style>