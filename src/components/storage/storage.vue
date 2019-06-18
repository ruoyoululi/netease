<template>
  <transition name="fade" @after-enter="afterEnter">
		<div class="storage">
			<div class="no-data">
				<div class="no-wrapper">
					 <i class="icon-data_no"></i>
					 <p class="desc">你还没有任何缓存的课件</p>
				</div>
			</div>
			<div class="data-list">
				<scroll class="rec-content" ref="scroll" v-slot:content>
					<div>
					</div>
				</scroll>
			</div>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
  export default {
  	methods: {
  		afterEnter() {
  			
  		}
  	},
  	components: {
  		Scroll
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

.storage
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
			flex: 0 0 180px
			width: 120px
			height: 200px
			text-align: center
			.icon-data_no
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
</style>