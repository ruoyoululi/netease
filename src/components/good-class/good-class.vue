<template>
  <div class="good-class">
  	<ul class="wrapper" ref="tabList">
  		<li class="class-item" v-for="(item, index) in courseList">
  			<div class="item-box" ref="itemBox">
  				<div class="avatar">
  					<img :src="item.imgUrl" alt="" class="img" @load="loadImage">
  				</div>
  				<h2 class="title">{{item.productName}}</h2>
  				<p class="lector">{{item.lectorName}}</p>
  				<p class="desc" v-show="item.description">{{item.description}}</p>
  				<div class="price">
  					<span class="new">{{item.originalPrice===0 ? '免费' : item.originalPrice.toFixed(2)}}</span>
  					<span v-if="item.discountPrice" :class="{'line':item.discountPrice}">{{item.discountPrice.toFixed(2)}}</span>
  				</div>
  			</div>
  		</li>
  	</ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
  	props: {
  		courseList: {
  			type: Array,
  			default: []
  		}
  	},
  	computed: {
  		
  	},
  	mounted() {
  		// setTimeout(() => {
    // 		this.$nextTick(() => {
    // 			this._initTabListHeight()
    // 		})
    // 	}, 20)
  	},
  	created: function () {
	  // console.log(1)
	},
  	methods: {
  		loadImage() {
  			this.$emit('loadImage')
  		},
  		_initTabListHeight() {
	        let h0=0
	        const items = this.$refs.itemBox
	        items.forEach((item) => {
	        	let list = item.children
	        	for(let i = 0; i < list.length; i ++) {
	        		h0 += list[i].clientHeight
	        	}
	        })
	         items.forEach((item) => {
	        	item.style.height = h0/items.length + 15 + 'px'
	        })
	    },
	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/mixin"
.good-class
	// margin: 0 8px
	padding: 0 7px
	box-sizing: border-box
	.wrapper
		overflow: hidden
		.class-item
			float: left
			width: 50%
			padding: 8px 5px
			box-sizing: border-box
			.item-box
				position: relative
				background-color: #fff
				.avatar
					position: relative
					padding: 56% 0 0
					box-sizing: border-box
					.img
						position: absolute
						top: 0
						left: 0
						display: block
						width: 100%
						height: 100%
				.title
					padding: 0 8px
					line-height: 30px
					color: #000
					font-size: 16px
					no-wrap(2)
				.lector
					padding: 0 8px
					line-height: 20px
					color: #555
					font-size: 11px
					no-wrap()
				.desc
					padding: 0 8px
					padding-top: 25px
					line-height: 13px
					font-size: 10px
					color: #555
					no-wrap2(2)
				.price
					width: 100%
					padding: 0 8px
					box-sizing: border-box
					padding-top: 20px
					line-height: 18px
					font-size: 14px
					color: #ff1d00
					.line
						font-size: 12px
						color: #a0a0a0
						text-decoration: line-through
</style>