<template>
  <div class="">
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
  	beforeRouteEnter(to, from, next) {
	    next(vm => {
	      vm.$router.replace({path: '/index'})
	    })
  	}
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus"></style>