<template>
	<div class="slider" ref="slider">
		<div class="slider-group" ref="sliderGroup">
			<slot></slot>
		</div>
		<div class="dots">
			<span class="dot" v-for="(item, index) in dots" :class="{active: currentPageIndex === index}" :key="index"></span>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import BSroll from 'better-scroll'
	import {addClass} from 'common/js/dom'
	export default {
		data() {
			return {
				dots: [],
				currentPageIndex: 0
			}
		},
		props: {
			loop: {
				type: Boolean,
				default: true
			},
			autoPlay: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number,
				default: 4000
			}
		},
		mounted() {
			setTimeout(() => {
				this._setSliderWidth()
				this._initDots()
				this._initSlider()
				if (this.autoPlay) {
					this._play()
				}
			}, 20)
			window.addEventListener('resize', () => {
				if (!this.slider) {
					return
				}
				this._setSliderWidth(true)
				this.slider.refresh()
			})
		},
		methods: {
			_setSliderWidth(isResize) {
				this.children = this.$refs.sliderGroup.children
				let width = 0
				let sliderWidth = this.$refs.slider.clientWidth
				for (let i = 0; i < this.children.length; i++) {
					let child = this.children[i]
					addClass(child, 'slider-item')

					child.style.width = sliderWidth + 'px'
					width += sliderWidth
				}
				if (this.loop && !isResize) {
					width += 2 * sliderWidth
				}
				this.$refs.sliderGroup.style.width = width + 'px'
			},
			_initDots() {
				this.dots = new Array(this.children.length)
			},
			_initSlider() {
				this.slider = new BSroll(this.$refs.slider, {
					scrollX: true,
					scrollY: false,
					momentum: false,
					snap: {
						loop: this.loop,
						threshold: 0.3,
						speed: 400
					},
					click: true
				})
				this.slider.on('scrollEnd', () => {
					let pageIndex = this.slider.getCurrentPage().pageX
					this.currentPageIndex = pageIndex
					if (this.autoPlay) {
						clearTimeout(this.timer)
						this._play()
					}
				})
			},
			_play() {
				this.timer = setTimeout(() => {
					this.slider.next()
				}, this.interval)
			}
		},
		destroyed() {
			clearTimeout(this.timer)
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/variable"
	.slider
		min-height: 1px
		.slider-group
			position: relative
			overflow: hidden
			white-space: nowrap
			.slider-item
				float: left
				box-sizing: border-box
				overflow: hidden
				text-align: center
				a
					display: block
					width: 100%
					overflow: hidden
					text-decoration: none
				img
					display: block
					width: 100%
					height: 190px
		.dots
			position: absolute
			right: 0
			left: 0
			bottom: 12px
			padding: 0 7px
			text-align:right
			font-size: 0
			.dot
				display: inline-block
				margin: 0 4px
				width: 6px
				height: 6px
				border-radius: 50%
				background: $color-text-l
				&.active
					// width: 20px
					border-radius: 3px
					background: $color-text-ll
</style>