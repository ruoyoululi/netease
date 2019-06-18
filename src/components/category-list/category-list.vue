<template>
  <div class="category-list">
  	<ul class="list-box">
  		<li class="list-item" v-for="(item, index) in categoryList">
  			<div class="item-box">
  				<img class="image" :src="item.imgUrl" alt="">
  				<div class="info">
  					<h2 class="title">{{item.productName}}</h2>
  					<p class="desc">item.description</p>
  				</div>
  			</div> 			
  		</li>
  	</ul>
  </div>
</template>
<script type="text/ecmascript-6">
import {fetchPersonalData} from 'api/home'
import {ERR_OK} from 'api/config'
  export default {
  	props: {
  		categoryId: {
  			type: Number,
  			default: 0
  		}
  	},
  	data() {
  		return {
  			categoryList: []
  		}
  	},
  	created() {
  		if (this.categoryId) {
  			this._fetchPersonalData(this.categoryId)
  		}
  	},
  	methods: {
  		_fetchPersonalData(id) {
  			fetchPersonalData(id).then((res) => {
  				if (res.code === ERR_OK) {
  					let list = []
  					res.result.forEach((item) => {
  						list = list.concat(item.contentModuleVo)
  					})
  					this.categoryList = list.slice(0, 3)
  				}
  			})
  		}
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.category-list
	padding-top: 18px
	.list-box
		overflow: hidden
		.list-item
			padding-bottom: 18px
			&:last-child
				padding-bottom: 0
			.item-box
				display: flex
				.image
					flex 0 0 130px
					width: 130px
					height: 80px
				.info
					position: relative
					flex: 1
					margin: 0 0 0 10px
					.title
						color: #000
</style>