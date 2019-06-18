<template>
	<transition name="fade" mode="out-in">
	  <div class="search">
	  	<search-box ref="searchBox" @query="onQueryChange"></search-box>
			<div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
				<scroll :refreshDelay="refreshDelay" class="shortcut" ref="shortcut" :data="shortcut" v-slot:content>
					<div>
						<div class="search-history" v-show="searchHistory.length">
							<h1 class="title">
								<span class="text">历史记录</span>
								<span class="clear" @click="showConfirm">
									清空记录
								</span>
							</h1>
							<ul class="flex-box">
								<li @click="addQuery(item)" class="item" v-for="item in searchHistory">
									<span class="text">{{item.name ? item.name : item}}</span>
								</li>
							</ul>
						</div>
						<div class="hot-key">
							<h1 class="title">热门搜索</h1>
							<ul class="flex-box">
								<li @click="addQuery(item.name)" class="item" v-for="item in hotKey">
									<span class="text">{{item.name}}</span>
								</li>
							</ul>
						</div>
					</div>
				</scroll>
			</div>
			<div ref="searchResult" class="search-result" v-show="query">
				<suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
			</div>
			<confirm ref="confirm" text="确认清空‘搜索历史’？" confirmBtnText=
			"确认" @confirm="clearSearchHistory"></confirm>
			<router-view></router-view>
		</div>
	</transition>
</template>
<script type="text/ecmascript-6">
	import Scroll from 'base/scroll/scroll'
	import SearchBox from 'base/search-box/search-box'
	import Suggest from 'components/suggest/suggest'
	import SearchList from 'base/search-list/search-list'
	import Confirm from 'base/confirm/confirm'
	import {getHotKey} from 'api/search'
	import {ERR_OK} from 'api/config'
	import {mapActions, mapGetters} from 'vuex'
  export default {
  	data() {
			return {
				hotKey: [],
				query: '',
				refreshDelay: 100
			}
		},
		computed: {
			shortcut() {
				return this.hotKey.concat(this.searchHistory)
			},
			...mapGetters([
				'searchHistory'
			])
		},
		created() {
			this._getHotKey()
		},
		methods: {
			blurInput() {
				this.$refs.searchBox.blur()
			},
			saveSearch() {
				this.saveSearchHistory(this.query)
			},
			onQueryChange(query) {
				this.query = query
			},
			addQuery(query) {
				this.$refs.searchBox.setQuery(query)
			},
			deleteOne(item) {
				this.deleteSearchHistory(item)
			},
			showConfirm() {
				this.$refs.confirm.show()
				// this.clearSearchHistory()
			},
			_getHotKey() {
				getHotKey().then((res) => {
					if (res.code === ERR_OK) {
						this.hotKey = res.result.recomHotword.slice(0, 10)
					}
				})
			},
			...mapActions([
				'clearSearchHistory'
			]),
			...mapActions([
				'saveSearchHistory',
				'deleteSearchHistory'
			])
		},
		watch: {
			query(newQuery) {
				if (!newQuery) {
					setTimeout(() => {
						this.$refs.shortcut.refresh()
					}, 20)
				}
			}
		},
  	components: {
  		Scroll, SearchBox, Suggest, SearchList, Confirm
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.search
	position: fixed
	width: 100%
	top: 0
	bottom: 0
	background-color: #fff
	overflow: hidden
	z-index: 11
	&.fade-enter-active, .fade-leave-active
		transition: all 0.2s
	&.fade-enter, .fade-leave-to
		opacity: 0
		transform: translate3d(100%, 0, 0)
	.shortcut-wrapper
		position: fixed
		top: 50px
		bottom: 0
		width: 100%
		overflow: hidden
		.shortcut
			height: 100%
			padding-top: 15px
			overflow: hidden
			.hot-key, .search-history
				margin: 0 10px
				.title
					padding-left: 5px
					height: 40px
					line-height: 40px
					font-size: 15px
					color: #000
				.flex-box
					display: flex
					flex-wrap: wrap
					flex-direction: row
					overflow: hidden
					.item
						margin: 5px
						height: 28px
						line-height: 28px
						.text
							display: block
							min-width: 40px
							padding: 0 5px
							box-sizing: border-box
							text-align: center
							border: 1px solid #e2e8ef
							border-radius: 3px
							font-size: 13px
							color: #859ab7
			.search-history
				.title
					display: flex
					.text
						flex: 1
					.clear
						font-size: 11px
						color: #2cc17b
	.search-result
		position: fixed
		width: 100%
		top: 50px
		bottom: 0
</style>