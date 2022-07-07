<template>
	<view class="content">
    <view class="img">
      <image src="../../static/img/uploads/logining.jpg" mode="widthFix" class="logo"></image>
    </view>
    <van-cell-group>
      <van-field
        :value="email"
        clearable
        label="邮箱"
        size="large"
        placeholder="请输入邮箱"
        @change="handleEmail"
      />
      <van-field
        :value="password"
        clearable
        type="password"
        label="密码"
        size="large"
        placeholder="请输入密码"
        @change="handlePassword"
      />
    </van-cell-group>
    <button class="login" @click="handleLogin">登录</button>
    <view class="link" @click="goToRegister">
      <text>没有账号？前往注册~</text>
    </view>
	</view>
</template>
<script>
	export default {
		onLoad() {
      
    },
    data() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      handleEmail(e) {
        this.email = e.detail
      },
      handlePassword(e) {
        this.password = e.detail
      },
      handleLogin() {
        this.$request({
          url: '/login',
          method: 'POST',
          data: {
            email: this.email,
            password: this.password
          }
        }).then(res => {
          if (res && res.statusCode === 200) {
            uni.setStorageSync('userInfo', res.data)
            uni.showToast({
              title: '登录成功',
              icon: 'success',
              mask: true
            })
            uni.navigateBack()
          }
        })
      },
      goToRegister() {
        uni.navigateTo({
          url: '/pages/register/index'
        })
      }
    }
	}
</script>

<style scoped lang="scss">
  .content {
    width: 100vw;
    margin: 100rpx 0;
    .img {
      text-align: center;
      margin-bottom: 40rpx;
      .logo {
        width: 200rpx;
        height: 200rpx;
        border-radius: 50%;
      }
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
    .link {
      color: #787878;
      text-align: center;
    }
  }
</style>
