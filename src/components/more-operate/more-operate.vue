<template>
	<transition name="list-fade">
		<div class="more-operate" v-show="showFlag" @click="hide">
			<div class="list-wrapper" @click.stop>
				<ul class="list-box">
					<li class="list-item" v-show="isFollow" @click.stop="deleteFollow">取消关注</li>
					<li class="list-item" v-show="tagFlag" @click="doSomething">不感兴趣</li>
					<li class="list-item" v-show="tagFlag" @click="doSomething">过时/重复</li>
					<li class="list-item" v-show="tagFlag" @click="doSomething">不够专业</li>
					<!-- <li class="list-item">分享给朋友</li> -->
				</ul>
				<split></split>
				<div class="back" @click.stop="hide">取消</div>
			</div>
  	</div>
	</transition>
</template>
<script type="text/ecmascript-6">
import Split from 'base/split/split'
import {mapGetters} from 'vuex'
  export default {
  	props: {
  		tagFlag: {
  			type: Boolean,
  			default: true
  		},
  		followItem: {
  			type: Object,
  			default: () => {return {}}
  		}
  	},
  	data() {
  		return {
  			showFlag: false,
  			isFollow: false
  		}
  	},
  	computed: {
  		...mapGetters([
  			'followList'
  		])
  	},
  	methods: {
  		show(follow) {
				const index = this.followList.findIndex((item) => {
	      	return item.productId === follow.productId
	      })
	      if (index > -1) {
	      	this.isFollow = true
	      } else {
	      	this.isFollow = false
	      }
	      this.showFlag = true
  		},
  		hide() {
  			this.showFlag = false
  		},
  		deleteFollow() {
  			this.hide()
  			this.$emit('deleteFollow', this.followItem)
  		},
  		doSomething() {
  			this.hide()
  			this.$emit('doSomething', this.followItem)
  		}
  	},
  	components: {
  		Split
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.more-operate
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  z-index: 200
  background-color: rgba(0,0,0,0.6)
  &.list-fade-enter-active, &.list-fade-leave-active
    transition: opacity 0.3s
    .list-wrapper
      transition: all 0.3s
  &.list-fade-enter, &.list-fade-leave-to
    opacity: 0
    .list-wrapper
      transform: translate3d(0, 100%, 0)
  .list-wrapper
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    background-color: #fff
    .list-box
      padding: 0 12px
      overflow: hidden
      .list-item
        height: 52px
        line-height: 52px
        border-bottom(#E6EAF2)
        text-align: center
        color: #222
        &:last-child
        	border-none()
    .back
      height: 52px
      line-height: 52px
      text-align: center
      color: #222
</style>