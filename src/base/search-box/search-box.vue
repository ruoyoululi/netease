<template>
	<n-header>
		<div class="header">
		  <div class="search-wrapper">
		  	<div class="search-box">
		  		<i class="icon-search"></i>
		  		<input ref="query" type="text" v-model="query" class="search-input" placeholder="搜索课程" autofocus="autofocus">
		  		<i @click="clear" v-show="query" class="icon-dismiss"></i>
		  	</div>
		  </div>
		  <div class="back" @click="goBack">
		  	取消
		  </div>
		</div>
	</n-header>
</template>
<script type="text/ecmascript-6">
	import NHeader from 'base/n-header/n-header'
	import {debounce} from 'common/js/util'
	export default {
		props: {
			placeholder: {
				type: String,
				default: '搜索课程'
			}
		},
		data() {
			return {
				query: ''
			}
		},
		methods: {
			clear() {
				this.query = ''
			},
			setQuery(query) {
				this.query = query
			},
			blur() {
				this.$refs.query.blur()
			},
			goBack() {
				this.query = ''
				this.$router.go(-1)
			}
		},
		created() {
			this.$watch('query', debounce((newQuery) => {
				this.$emit('query', newQuery)
			}, 200))
		},
		components: {
  		NHeader
  	}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.n-header
		padding: 16px 16px 0 16px
		.header
				display: flex
				flex-flow: row
				.search-wrapper
					height: 30px
					flex: 1
					.search-box
						position: relative
						display: flex
						height: 100%
						background-color: #f2f2f2
						border-radius: 30px
						.icon-search
							display: inline-block
							flex: 0 0 20px
							padding: 6px 5px 6px 10px
						.search-input
							// flex: 1 1 auto
							width: 100%
							display: block
							background-color: rgba(0,0,0,0)
							border: none
							outline: none
							font-size: 14px
						.icon-dismiss
							position: absolute
							right: 10px
							top: 5px
							display: inline-block
							width: 20px
							height: 20px
							background: url('./icon-dismiss.png') center center no-repeat
							background-size: 80%
				.back
					flex: 0 0 43px
					text-align: right      
					font-size: 16px
					height: 30px
					line-height: 30px
</style>