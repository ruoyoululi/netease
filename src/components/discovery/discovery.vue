<template>
  <div class="discovery">
		<n-header>
			<div class="header">
		  	<div class="header-box">
		  		<router-link class="nav-item" tag="div" to="/discovery/recommend">推荐</router-link>
		  		<router-link class="nav-item" tag="div" to="/discovery/follow">关注</router-link>
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
.discovery
	.n-header
		padding-bottom: 0
		border-bottom(#E6EAF2)
		.header
			display: flex
			justify-content:  center
			.header-box
				width: 100px
				.nav-item
					position: relative
					width: 50px
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
							left: 10px
							bottom: -7px
							width: 30px
							height: 5px
							border-radius: 2px
							background-color: #2cc17b
</style>