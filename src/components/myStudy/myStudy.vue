<template>
  <div class="myStudy">
  	<n-header>
			<div class="header">
		  	<div class="header-box">
		  		<router-link class="nav-item" tag="div" to="/study/stalus">学习概况</router-link>
		  		<router-link class="nav-item" tag="div" to="/study/storage">离线缓存</router-link>
		  	</div>
		  </div>
		</n-header>
		<keep-alive>
			<router-view></router-view>
	  </keep-alive>
  </div>
</template>
<script type="text/ecmascript-6">
	import NHeader from 'base/n-header/n-header'
  export default {
  	components: {
  		NHeader
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.myStudy
	.n-header
		padding-bottom: 0
		background-color: #f5f5f5
		.header
			display: flex
			justify-content:  center
			.header-box
				width: 170px
				.nav-item
					position: relative
					width: 85px
					height: 28px
					line-height: 28px
					font-size: 17px
					color:#666
					float: left
					text-align: center
					&.router-link-active
						font-size: 17px
						font-weight: 600
						color: #222
						&:after
							content: ' '
							position: absolute
							left: 28px
							bottom: -7px
							width: 30px
							height: 5px
							border-radius: 2px
							background-color: #2cc17b
  
</style>