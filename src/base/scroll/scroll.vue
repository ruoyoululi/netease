<template>
	<div ref="wrapper" class="list-wrapper">
		<slot name="content"></slot>
		<div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
	        <div class="before-trigger" v-if="beforePullDown">
	          <bubble :y="bubbleY"></bubble>
	        </div>
	        <div class="after-trigger" v-if="!beforePullDown">
	          <div v-if="isPullingDown" class="loading">
	            <loading></loading>
	          </div>
	          <div v-else><span>{{refreshTxt}}</span></div>
	        </div>
	     </div>
		<div class="scroll-content">
	      <div ref="listWrapper">
	        <slot name="navigator"></slot>
	      </div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import BScroll from 'better-scroll'
	import Loading from '../loading/loading.vue'
  import Bubble from '../bubble/bubble.vue'
  import { getRect } from 'common/js/dom'
	const COMPONENT_NAME = 'scroll'
  const DIRECTION_H = 'horizontal'
  const DIRECTION_V = 'vertical'
	export default {
		props: {
			bounce: {
				type: Boolean | Object,
				default: true
			},
			probeType: {
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			data: {
				type: Array,
				default: null
			},
			listenScroll: {
				type: Boolean,
				default: false
			},
			pullup: {
				type: Boolean,
				default: false
			},
			beforeScroll: {
				type: Boolean,
				default: false
			},
			refreshDelay: {
				type: Number,
				default: 20
			},
			direction: {
			    type: String,
			    default: DIRECTION_V
		   },
		   freeScroll: {
		        type: Boolean,
		        default: false
	      },
	      pullDownRefresh: {
		        type: null,
		        default: false
	      }
		},
		data() {
      return {
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        pullDownStyle: '',
        bubbleY: 0
      }
    },
    computed: {
      refreshTxt() {
        return (this.pullDownRefresh && this.pullDownRefresh.txt)
      }
    },
		mounted() {
			setTimeout(() => {
				this._initScroll()
			}, 20)
		},
		created() {
      this.pullDownInitTop = -50
    },
		methods: {
			_initScroll() {
				if (!this.$refs.wrapper) {
					return
				}
				if (this.$refs.listWrapper && (this.pullDownRefresh || this.pullup)) {
          this.$refs.listWrapper.style.minHeight = `${getRect(this.$refs.wrapper).height + 1}px`
        }
				this.scroll = new BScroll(this.$refs.wrapper, {
					bounce: this.bounce,
					probeType: this.probeType,
					click: this.click,
					scrollY: this.freeScroll || this.direction === DIRECTION_V,
         	scrollX: this.freeScroll || this.direction === DIRECTION_H,
         	pullDownRefresh: this.pullDownRefresh,
				})
				if (this.listenScroll) {
					let me = this
					this.scroll.on('scroll', (pos) => {
						me.$emit('scroll', pos)
					})
				}
				if (this.pullup) {
					this.scroll.on('scrollEnd', () => {
						if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
							this.$emit('scrollToEnd')
						}
					})
				}
				if (this.beforeScroll) {
					this.scroll.on('beforeScrollStart', () => {
						this.$emit('beforeScroll')
					})
				}
				if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }
			},
			enable() {
				this.scroll && this.scroll.enable()
			},
			disable() {
				this.scroll && this.scroll.disable()
			},
			refresh() {
				this.scroll && this.scroll.refresh()
			},
			scrollTo() {
				this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
			},
			scrollToElement() {
				this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
			},
			forceUpdate(dirty) {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.isPullingDown = false
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.pullUpDirty = dirty
          this.refresh()
        } else {
          this.refresh()
        }
      },
      _reboundPullDown() {
        const {stopTime = 600} = this.pullDownRefresh
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true
            this.scroll.finishPullDown()
            resolve()
          }, stopTime)
        })
      },
			_afterPullDown() {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`
          this.beforePullDown = true
          this.isRebounding = false
          this.refresh()
        }, this.scroll.options.bounceTime)
      },
			_initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false
          this.isPullingDown = true
          this.$emit('pullingDown')
        })

        this.scroll.on('scroll', (pos) => {
          if (!this.pullDownRefresh) {
            return
          }
          if (this.beforePullDown) {
            this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
          } else {
            this.bubbleY = 0
          }

          if (this.isRebounding) {
            this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
          }
        })
      }
		},
		components: {
	      Loading,
	      Bubble
	   },
		watch: {
			data() {
				setTimeout(() => {
					this.refresh()
				}, this.refreshDelay)
				setTimeout(() => {
          this.forceUpdate(true)
        }, this.refreshDelay)
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.scroll-content
	display: inline-block
.pulldown-wrapper
	position: absolute
	width: 100%
	left: 0
	display: flex
	justify-content center
	align-items center
	transition: all
	.after-trigger
		margin-top: 10px
</style>