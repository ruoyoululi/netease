<template>
  <div class="study-module">
  	<ul class="module">
  		<li class="module-item" v-for="(item, index) in studyList" :key="item.id">
  			<div class="container" @click.stop="selectItem(item)">
  				<a class="page-box" :href="item.wepPageUrl">
  					<h2 class="title">{{item.name}}</h2>
						<p class="text">课程体系</p>
  				</a>
  				<img class="page-img" width="100%" height="100%" :src="require(`./pathImg${index}.jpg`)">
  			</div>
  		</li>
  	</ul>
  	<router-view name="system"></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
  	props: {
  		studyList: {
  			type: Array,
  			default:[]
  		}
  	},
  	methods: {
  		selectItem(item) {
  			this.$emit('selectModule', item)
  		}
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .study-module
  	width: 100%
  	.module
	  	padding: 0 6px
	  	box-sizing: border-box
	  	overflow: hidden
	  	.module-item
	  		display: block
	  		width: 33.3%
	  		float: left
	  		padding: 18px 6px 0 6px
	  		box-sizing: border-box
	  		.container
	  			position: relative
	  			height: 60px
		  		background-color: rgba(20, 20, 20, 0.7)
		  		border-radius: 3px
		  		.page-box
		  			display: block
		  			height: 100%
		  			padding: 10px 12px 10px 12px
		  			box-sizing: border-box
		  			.title
		  				font-size: 14px
		  				color: #fff
		  				no-wrap()
		  			.text
		  				margin-top: 5px
		  				font-size: 10px
		  				color: #dedede
		  		.page-img
		  			position: absolute
		  			display: block
		  			top: 0
		  			left: 0
		  			border-radius: 3px
		  			z-index: -1
</style>