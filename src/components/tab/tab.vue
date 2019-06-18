<template>
	<footer class="tab border-1px">
    <div class="tab-wrapper">
      <router-link tag="div" class="tab-item" to="/index">
        <i class="icon-item iconIndex"></i>
        <span class="tab-link">首页</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/discovery">
        <i class="icon-item iconDiscovery"></i>
        <span class="tab-link">发现</span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/study">
        <i class="icon-item iconStudy"></i>
        <span class="tab-link">我的学习
        </span>
      </router-link>
      <router-link tag="div" class="tab-item" to="/mine">
        <i class="icon-item iconMine"></i>
        <span class="tab-link">帐号</span>
      </router-link>
    </div>
	</footer>
</template>
<script type="text/ecmascript-6">
	export default {}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .tab
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    .tab-wrapper
      display: flex
      height: 50px
      box-sizing: border-box
      border-1px(#E6EAF2)
      font-size: $font-size-medium
      .tab-item
        flex: 1
        text-align: center
        .icon-item
          display: block
          margin-top: 8px
          font-size: 22px
          &.iconIndex:before 
            content: "\e90e"
          &.iconDiscovery:before 
            content: "\e90c"
            color: #3c4a55
          &.iconStudy:before
            content: "\e91c"
            color: #3c4a55
          &.iconMine:before
            content: "\e923"
        .tab-link
          margin-top: 2px
          padding-bottom: 5px
          color: $color-text
          font-size:10px
      .router-link-active
        .icon-item
          &.iconIndex:before    
            content: "\e90f"
            color: #2cc17b
          &.iconDiscovery:before 
            content: "\e90d"
            color: #2cc17b
          &.iconStudy:before
            content: "\e91d"
            color: #2cc17b
          &.iconMine:before
            content: "\e924"
            color: #2cc17b
</style>