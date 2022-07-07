<template>
	<view class="content">
    <van-cell-group inset>
      <van-cell v-if="isLogin" url="/pages/user-info/index" :border="false" title="基本信息" size="large" is-link />
      <van-cell title="关于朝夕小说" size="large" :border="false" @click="about" />
    </van-cell-group>
    <view class="unlogin" v-if="isLogin"><button @click="handleUnLogin" class="button">退出登录</button></view>
	</view>
</template>
<script>
	export default {
    data() {
      return {
        checked: false,
        isLogin: false
      }
    },
		onLoad() {
      this.isLogin = Object.keys(uni.getStorageSync('userInfo')).length === 0 ? false : true
    },
    methods: {
      handleUnLogin() {
        uni.showModal({
          title: '确认退出登录？',
          content: '退出登录后将无法享用某些功能或权益~',
          cancelColor: '#676767',
          confirmColor: '#fca000',
          success: res => {
            if (res.confirm) {
              uni.removeStorageSync('userInfo')
              uni.showToast({
                title: '退出登录成功',
                icon: 'success'
              })
              uni.switchTab({
                url: '/pages/profile/index'
              })
            }
          }
        })
      },
      about() {
        uni.showModal({
          title: '朝夕',
          content: '朝夕小说是一个免费的阅读平台\n致力于为用户提供更丰富更优质的免费阅读内容',
          showCancel: false,
          confirmColor: '#fca000',
        })
      }
    }
	}
</script>

<style scoped lang="scss">
  .content {
    .unlogin {
      position: absolute;
      left: 50%;
      bottom: 6%;
      transform: translateX(-50%);
      .button {
        height: 80rpx;
        line-height: 80rpx;
        color: #000;
        font-size: 30rpx;
        background-color: #fcc800;
        padding: 0 80rpx;
        border-radius: 50rpx;
      }
    }
  }
</style>
