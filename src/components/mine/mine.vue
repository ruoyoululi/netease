<template>
  <div class="mine">
  	<n-header>
			<div class="header">
	  		<div class="code">
	  			<i class="icon-qr_code"></i>
	  		</div>
	  		<div class="classify">
	  			<div class="comment"><i class="icon-setting"></i></div>
	  			<div class="comment"><i class="icon-comment"></i></div>
	  		</div>
	  	</div>
		</n-header>
		<scroll class="mine-content" ref="scroll" v-slot:content :bounce="bounce">
			<div>
				<div class="mine-box">
					<i class="icon-no_user"></i>
					<div class="user-info">
						<h1 class="title">用户5742998283</h1>
						<p class="page">我的主页<i class="icon-keyboard_arrow_right"></i></p>
					</div>
				</div>
				<div class="cart-box">
					<div class="carts">
						<div class="my-cart">
							<i class="icon-order"></i>
							<span class="name">我的订单</span>
						</div>
						<div class="my-cart">
							<i class="icon-coupon"></i>
							<span class="name">我的卡券</span>
						</div>
						<div class="my-cart">
							<i class="icon-shopping_ok"></i>
							<span class="name">我的购物车</span>
						</div>
					</div>
				</div>
				<div class="text-box">
					<span class="text">我的收藏</span>
					<i class="icon icon-keyboard_arrow_right"></i>
				</div>
				<split></split>
				<div class="big-box">
					<div class="text-box">
						<span class="text">免流量学习</span>
						<i class="icon icon-keyboard_arrow_right"></i>
					</div>
					<div class="text-box">
						<span class="text">推广赚钱</span>
						<div>
							<i class="icon icon-keyboard_arrow_right"></i>
							<span class="right">查看收益</span>
						</div>
					</div>
				</div>
				<split></split>
				<div class="big-box">
					<div class="text-box">
						<span class="text">手机账号绑定</span>
						<div>
							<i class="icon icon-keyboard_arrow_right"></i>
							<span class="right">安全升级</span>
						</div>
					</div>
					<div class="text-box">
						<span class="text">帮助与反馈</span>
						<i class="icon icon-keyboard_arrow_right"></i>
					</div>
				</div>
				<split></split>
				<div class="back-box">
					<span class="red">退出登录</span>
				</div>
				<div class="bg"></div>
			</div>
		</scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import NHeader from 'base/n-header/n-header'
import Scroll from 'base/scroll/scroll'
import Split from 'base/split/split'
  export default {
  	data() {
  		return {
  			bounce: false
  		}
  	},
  	components: {
  		Scroll, NHeader, Split
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "~common/stylus/mixin"
	.mine
		position: fixed
		width: 100%
		top: 0
		bottom: 50px
		.header
				display: flex
				justify-content: space-between
				.code
					flex: 0 0 40px
					font-size: 26px
				.classify
					flex: 0 0 100px
					font-size: 26px
					.comment
						float: right
						width: 40px
						text-align: right
						&:last-child
							margin-right: 20px
		.mine-content
			position: fixed
			top: 50px
			bottom: 50px
			width: 100%
			overflow: hidden
			.mine-box
				padding: 15px 15px 20px 15px
				overflow: hidden
				.icon-no_user
					float: left
					font-size: 75px
				.user-info
					float: left
					margin-left: 15px
					font-size: 0
					.title
						line-height: 35px
						font-size: 20px
						color: #000
					.page
						display: inline-block
						margin-top: 6px
						padding: 0 10px
						height: 25px
						line-height: 25px
						font-size: 13px
						color: #777
						border: 1px solid #e1e1e1
						border-radius: 13px
			.cart-box
				padding: 0 15px 10px 15px
				.carts
					border: 1px solid #f5f5f5
					border-radius: 5px
					box-shadow: 0 5px 10px #eee
					display: flex
					.my-cart
						flex: 1
						padding: 15px 0 10px 0
						text-align: center
						font-size: 45px
						.name
							display: block
							line-height: 38px
							color: #000
							font-size: 14px
			.text-box
				display: flex
				padding: 0 20px
				justify-content: space-between
				line-height: 50px
				color: #000
				.icon
					float: right
					display: inline-block
					padding-top: 15px
					box-sizing: border-box
					font-size: 20px
					color: #a5a5a5
			.big-box
				.text-box
					border-bottom(#E6EAF2)
					&:last-child
						border-none()
					.right
						float: right
						font-size: 13px
						color: #a5a5a5
			.back-box
				display: flex
				justify-content: center
				line-height: 50px
				color: #f22
			.bg
				height: 100px
				background-color: #f5f5f5
</style>