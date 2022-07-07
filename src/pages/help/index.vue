<template>
	<view class="content">
    <view class="title">常见问题</view>
    <van-collapse accordion :value="activeName" @change="onChange">
      <van-collapse-item title="小程序能看到哪些书？" name="1">
        我们的小程序书城为您提供了海量的优质阅读资源，各种类型的书籍应有尽有~
      </van-collapse-item>
      <van-collapse-item title="为什么小说没写完/更新慢？" name="2">
        您好，小说显示“连载中”是因为作者还未写完，作者大大发布新章节后我们会尽快更新。若您不想等待，可以优先选择书城中已完结的小说阅读哦~
      </van-collapse-item>
      <van-collapse-item title="遇到小程序频繁闪退的情况怎么办？" name="3">
        若遇到小程序频繁卡死、闪退的情况，请联系客服QQ 772365290 或微信 zhaoxi
      </van-collapse-item>
      <van-collapse-item title="如何修改昵称/邮箱？" name="4">
        1. 昵称：【我的】→【用户信息】→【昵称】→更改昵称→确认修改
        2. 邮箱：【我的】→【用户信息】→【邮箱】→更改邮箱→确认修改
      </van-collapse-item>
      <van-collapse-item title="如何和好友分享好看的书？" name="5">
        您可以先点击右上角的“•••”标识，选择底部弹出的“分享”，就可以将精彩内容与您的好友一起分享了。
      </van-collapse-item>
      <van-collapse-item title="在看小说的时候怎么调节字体大小以及切换夜间模式？" name="6">
        您可以在阅读页面中，根据自己的需要来调整字体的大小和切换夜间模式。
      </van-collapse-item>
    </van-collapse>
	</view>
</template>
<script>
	export default {
    data() {
      return {
        activeName: '0'
      }
    },
    methods: {
      onChange(e) {
        this.activeName = e.detail
      }
    }
	}
</script>

<style scoped lang="scss">
  .content {
    height: 100vh;
    background-color: #f7f8fa;
    .title {
      padding: 30rpx;
    }
  }
</style>
