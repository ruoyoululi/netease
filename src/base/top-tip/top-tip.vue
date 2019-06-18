<template>
	<transition name="drop">
		<div class="top-tip" v-show="showFlag" @click.stop="hide">
			<slot></slot>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
	export default {
		props: {
			delay: {
				type: Number,
				default: 1000
			}
		},
		data() {
			return {
				showFlag: false
			}
		},
		methods: {
			show() {
				this.showFlag = true
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.hide()
				}, this.delay)
			},
			hide() {
				this.showFlag = false
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .top-tip
    display: flex
    justify-content: center
    position: fixed
    bottom: 60px
    width: 100%
    z-index: 500
    &.drop-enter-active, &.drop-leave-active
      transition: all 0.3s
    &.drop-enter, &.drop-leave-to
      opacity: 0
</style>