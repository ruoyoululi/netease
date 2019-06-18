<template>
	<div class="search-list" v-show="searches.length">
		<ul class="flex-box">
			<li @click="selectItem(item)" class="item" v-for="item in searches">
				<span class="text">{{item}}</span>
			</li>
		</ul>
	</div>
</template>
<script type="text/ecmascript-6">
	export default {
		props: {
			searches: {
				type: Array,
				default: []
			}
		},
		methods: {
			selectItem(item) {
				this.$emit('select', item)
			},
			deleteOne(item) {
				this.$emit('delete', item)
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus"></style>