<template>
  <div class="sell-time" ref="slider">
    <div class="navigator-container">
			<div ref="viewport" class="navigator-component">
    		<scroll ref="scrollTab" direction="horizontal" v-slot:navigator>
		      <ul class="tab-list" ref="tabList">
		        <li v-for="item in fieldsList" class="tab-item" @click="selectNav(item)">
		        	<div class="time-box" :class="{'link-active':isCurrent(item.id)}">
		        		<span class="tab-name">{{getSell(item.startTime, item.endTime)}}</span>
		        	</div>
		        </li>
		      </ul>
    		</scroll>
  		</div>
    </div>
    <div class="tab-render-content">
      <keep-alive>
	      <router-view></router-view>
	    </keep-alive>
    </div>  
  </div>
</template>
<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll.vue'
	import {mapMutations} from 'vuex'
	import {getTime} from 'common/js/util'

  export default {
  	props: {
  		fieldsList: {
  			type: Array,
  			default: []
  		},
  		sellList: {
  			type: Array,
  			default: []
  		}
  	},
  	data() {
      return {
        currentTabIndex: 1, // 当前默认tab
        end: 0
      }
    },
    mounted() {
    	setTimeout(() => {
    		// this.$nextTick(() => {
    			this._initTabListWidth()
    		// })
    	}, 20)
      setTimeout(() => {
        this._adjust(this.currentTabIndex)
      }, 500)
    },
    methods: {
    	getSell(startTime, endTime) {
    		let result = getTime(startTime)
    		if (/^[\x01-\x7f]+$/.test(result)) {
    			return `即将开抢 \n ${result}`
    		} else if (/^[\u4e00-\u9fa5]+$/.test(result)) {
    			let date = new Date(startTime)
    			const hour = date.getHours()
        	let minute = date.getMinutes()
        	minute = this._pad(minute, 2)
        	this.end = endTime
        	return `抢购中 \n ${hour}:${minute}`
    		} else if (/^[0-9]{1,2}[^\x01-\x7f]{1}[0-9]{1,2}[^\x01-\x7f]{1}()/.test(result)) {
    			let res = result.split('\n')
    			let res1 = res[0].split(/[^\x01-\x7f]/)
    			let res2 = this._pad(res1[0])
    			return `${this._pad(res1[0])}.${this._pad(res1[1])}开抢 \n ${res[1]}`
    		} else if (/^[^\x01-\x7f]{2}[\x01-\x7f]+$/.test(result)) {
    			let res = result.split('\n')
    			return `${res[0]}开抢\n${res[1]}`
    		} else {
    			return result
    		}
    	},
    	_pad(num, n = 2) {
		    let len = num.toString().length
		    while (len < n) {
		        num = '0' + num
		        len++
		    }
		    return num
			},
      isCurrent (index) {
        return index === this.currentTabIndex
      },
      change (item) {
        if (item !== undefined) {
          this.currentTabIndex = item.id
        }

        // 以下部分编写点击相应的navList item时，渲染的逻辑代码
        this.$router.replace('/index/' + this.currentTabIndex)
        this.setFieldsList(item)
        const index = this.sellList.findIndex((sell) => {
        	return sell.id === item.id
        })
        this.setSellList(this.sellList[index])
      },
      selectNav(item) {
        this.currentTabIndex = item.id
        this._adjust(item.id)
        this.change(item)
      },
      _initTabListWidth() {
        const tabList = this.$refs.tabList
        const items = tabList.children
        let width = 0
        for (let i = 0; i < items.length; i++) {
          width += items[i].clientWidth
        }
        tabList.style.width = (width + 1) + 'px'
      },
      _adjust(tabId) {
        const viewportWidth = this.$refs.viewport.clientWidth
        const tabListWidth = this.$refs.tabList.clientWidth
        const minTranslate = Math.min(0, viewportWidth - tabListWidth)
        const middleTranslate = viewportWidth / 2
        const items = this.$refs.tabList.children
        let width = 0
        this.fieldsList.every((item, index) => {
          if (item.id === tabId) {
            return false
          }
          width += items[index].clientWidth
          return true
        })
        let translate = middleTranslate - width
        translate = Math.max(minTranslate, Math.min(0, translate))
        this.$refs.scrollTab.scrollTo(translate, 0, 300)
      },
      ...mapMutations({
      	setFieldsList: 'SET_FIELDS_LIST',
      	setSellList: 'SET_SELL_LIST'
      })
    },
    components: {
    	Scroll
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .sell-time
  	position: relative
  	padding: 24px 0
  	box-sizing: border-box
  	width: 100%
  	// overflow: hidden
		.navigator-container
      background: #fff
      overflow: hidden
			.navigator-component
				.tab-list
					overflow: hidden
					.tab-item
						float: left
						padding-right: 8px
						box-sizing: border-box
						font-size: 0
						.time-box
			  			width: 73px
			  			height: 46px
			  			display: inline-block
			  			padding: 8px 10px
			  			box-sizing: border-box
			  			line-height: 16px
			  			background-color: #f5f5f5
			  			border-radius: 3px
			  			font-size: 12px
			  			color: #888
			  			text-align: center
			  			&.link-active
			  				border: 1px solid #49af4f
			  				color: #49af4f
			  				background-color: rgba(220,229,220,0.3)
    .tab-render-content
      line-height: 20px
</style>