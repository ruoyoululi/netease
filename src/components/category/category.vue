<template>
  <div class="category">
  	<scroll class="content-wrapper" ref="contentWrapper" v-slot:content :bounce="bounce" :data="category">
		<ul>
			<li class="content-item" v-for="(item, index) in category">
				<h2 class="title">{{item.name}}</h2>
				<ul class="child-wrapper">
					<li class="child-item" v-for="(child, index) in item.children">
						<span class="name">{{child.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
	</scroll>
  </div>
</template>
<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
  export default {
  	props: {
  		category: {
  			type: Array,
  			default: []
  		}
  	},
  	created() {
  		this.bounce = false
  	},
  	components: {
  		Scroll
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.category
	flex: 1
	overflow: hidden
	.content-wrapper
		height: 100%
		padding: 35px  9px 0 9px
		box-sizing: border-box
		.content-item
			padding: 13px 0
			.title
				padding-left: 6px
				line-height: 20px
				font-size: 13px
				color: #000
			.child-wrapper
				display: flex
				flex-wrap: wrap
				flex-direction: row
				overflow: hidden
				.child-item
					margin: 7px 3px
					height: 35px
					line-height: 35px
					.name
						display: block
						min-width: 79px
						padding: 0 5px
						box-sizing: border-box
						text-align: center
						background-color: #f3f5f7
						border-radius: 18px
						font-size: 13px
</style>