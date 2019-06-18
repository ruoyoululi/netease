<template>
  <div class="occupation">
  	<ul class="wrapper">
  		<li class="item" v-for="(item, index) in occupationList">
  			<div class="image">
  				<img class="img" :src="item.bigImgUrl">
  			</div>
  			<div class="product">
  				<h2 class="name">{{item.productName}}</h2>
  				<div class="desc">{{item.description}}</div>
  			</div>
  		</li>
  	</ul>
  	<div class="more">
  		<div class="btn">
  			了解更多微专业
  			<i class="icon-keyboard_arrow_right"></i>
  		</div>
  	</div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
  	props: {
  		occupationList: {
  			type: Array,
  			default: []
  		}
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .occupation
  	padding-top: 10px
  	.wrapper
  		overflow: hidden
  		.item
  			display: block
  			float: left
  			padding: 13px 5px 0 5px
  			box-sizing: border-box
  			font-size: 0
  			width: 50%
  			.image
  				margin-bottom: 6px
  				.img
  					width: 100%
  			.product
  				.name
  					height: 32px
  					line-height: 32px
  					font-size: 15px
  					color: #000
  				.desc
  					max-height: 30px
  					line-height: 15px
  					font-size: 14px
  					color: #888
  					text-overflow: ellipsis
  					overflow: hidden
  					display: -webkit-box
  					-webkit-line-clamp: 2
  					line-clamp: 2
  					-webkit-box-orient: vertical
		.more
			display: flex
			justify-content: center
			margin-top: 25px
			font-size: 15px
			color: #49af4f
			text-align: center
			.btn
				width: 170px
				height: 38px
				line-height: 38px
				border: 1px solid #49af4f
				border-radius: 19px				
</style>