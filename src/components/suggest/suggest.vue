<template>
	<scroll class="suggest" :data="result" ref='suggest' :beforeScroll="beforeScroll" @beforeScroll="listScroll" v-slot:content>
		<ul class="suggest-list">
			<li @click="selectItem(item)" class="suggest-item" v-for="item in result">
				<div class="name">
					<p class="text" v-html="format(item.productName)"></p>
				</div>
			</li>
		</ul>
		<div v-show="!result.length" class="no-result-wrapper">
			<no-result title="抱歉，暂无搜索结果"></no-result>
		</div>
	</scroll>
</template>
<script type="text/ecmascript-6">
	import {search} from 'api/search'
	import {ERR_OK} from 'api/config'
	import Scroll from 'base/scroll/scroll'
	import NoResult from 'base/no-result/no-result'

	export default {
		props: {
			query: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				result: [],
				beforeScroll: true
			}
		},
		methods: {
			format(text) {
				let ret = text.replace(/\{\#\#/, '<span style="color:#859ab7">')
				ret = ret.replace(/\#\#\}/, '</span>')
				return ret
			},
			search() {
				search(this.query).then((res) => {
					if (res.code === ERR_OK) {
						this.result = res.result
					}
				})
			},
			selectItem(item) {
					// this.$router.push({
					// 	path: `/search/${singer.id}`
					// })
			
				this.$emit('select')
			},
			listScroll() {
				this.$emit('listScroll')
			},
			refresh() {
				this.$refs.suggest.refresh()
			}
		},
		watch: {
			query() {
				this.search()
			}
		},
		components: {Scroll, NoResult}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 16px
      .suggest-item
        display: flex
        align-items: center
        height: 50px
        line-height: 50px
        border-bottom(#f1f3f5)
      .name
        flex: 1
        font-size: $font-size-medium
        color: #000
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>