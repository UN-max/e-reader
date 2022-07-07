<template>
	<view class="content">
    <view class="user-info" v-if="!isLogin">
      <image class="avator" src="../../static/img/uploads/unlogin.jpg" mode="widthFix"></image>
      <view class="nick">请登录朝夕阅读喜欢的书</view>
      <button class="login" @click="handleClick">点击登录</button>
    </view>
    <view class="user-info" v-else>
      <image class="avator" src="../../static/img/uploads/login.jpg" mode="widthFix"></image>
      <view class="nick">{{userInfo.name}}</view>
    </view>
    <view class="box">
      <van-cell-group inset style="margin-top: 70rpx;">
        <van-cell @click="navigate('history')" title="浏览历史" size="large">
          <view slot="icon">
            <van-icon name="clock-o" size="50rpx" custom-style="margin-right: 20rpx;" />
          </view>
        </van-cell>
        <van-cell @click="navigate('my-comments')" title="我的书评" size="large">
          <view slot="icon">
            <van-icon name="comment-o" size="50rpx" custom-style="margin-right: 20rpx;" />
          </view>
        </van-cell>
        <van-cell @click="navigate('user-info')" title="用户信息" size="large">
          <view slot="icon">
            <van-icon name="user-o" size="50rpx" custom-style="margin-right: 20rpx;" />
          </view>
        </van-cell>
        <button open-type="contact" class="contact">
          <van-cell title="联系客服" size="large">
            <view slot="icon">
              <van-icon name="chat-o" size="50rpx" custom-style="margin-right: 20rpx;" />
            </view>
          </van-cell>
        </button>
        <van-cell url="/pages/help/index" title="帮助" size="large">
          <view slot="icon">
            <van-icon name="question-o" size="50rpx" custom-style="margin-right: 20rpx;" />
          </view>
        </van-cell>
        <van-cell url="/pages/settings/index" title="设置" size="large">
          <view slot="icon">
            <van-icon name="setting-o" size="50rpx" custom-style="margin-right: 20rpx;" />
          </view>
        </van-cell>
      </van-cell-group>
    </view>
	</view>
</template>
<script>
	export default {
    data() {
      return {
        userInfo: {},
        isLogin: false
      }
    },
		onShow() {
      this.$request({
        url: '/test'
      }).then(res => {
        if (res && res.statusCode === 200) {
          this.userInfo = uni.getStorageSync('userInfo')
        } else {
          uni.removeStorageSync('userInfo')
        }
        this.isLogin = Object.keys(uni.getStorageSync('userInfo')).length === 0 ? false : true
      })
    },
    methods: {
      handleClick() {
        uni.navigateTo({
          url: '/pages/login/index'
        })
      },
      navigate(name) {
        if (!this.isLogin) {
          this.$toast()
        } else {
          uni.navigateTo({
            url: `/pages/${name}/index`
          })
        }
      }
    }
	}
</script>

<style scoped lang="scss">
  .content {
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 500rpx;
      background: url('https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202004%2F15%2F20200415112311_hdxgj.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651728868&t=63bddd66860af97203ce8550c3da70aa') no-repeat;
      background-size: cover;
      color: #fff;
      .avator {
        width: 160rpx;
        height: 160rpx;
        border-radius: 50%;
        margin-bottom: 40rpx;
      }
      .login {
        height: 80rpx;
        line-height: 80rpx;
        color: #000;
        font-size: 30rpx;
        background-color: #fcc800;
        padding: 0 40rpx;
        margin: 40rpx;
        border-radius: 50rpx;
      }
    }
    .box {
      display: flex;
      flex-direction: column;
      background-color: #f9f9f9;
      height: calc(100vh - 450rpx);
      margin-top: -50rpx;
      border-radius: 50rpx 50rpx 0 0;
      .contact {
        text-align: left;
        padding: 0;
        &:after {
          border: none;
        }
      }
    }
  }
</style>
