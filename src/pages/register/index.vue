<template>
	<view class="content">
    <view class="img">
      <image src="../../static/img/uploads/logining.jpg" mode="widthFix" class="logo"></image>
    </view>
    <van-cell-group>
      <van-field
        :value="name"
        clearable
        label="昵称"
        size="large"
        placeholder="请输入昵称"
        @change="handleName"
      />
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
      <van-field
        :value="surePassword"
        clearable
        type="password"
        label="确认密码"
        size="large"
        placeholder="请再次输入密码"
        @change="handleSurePassword"
      />
    </van-cell-group>
    <button class="register" @click="handleRegister">注册</button>
    <view class="link" @click="goToLogin">
      <text>已有账号？前往登录~</text>
    </view>
	</view>
</template>
<script>
	export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        surePassword: ''
      }
    },
    methods: {
      handleName(e) {
        this.name = e.detail
      },
      handleEmail(e) {
        this.email = e.detail
      },
      handlePassword(e) {
        this.password = e.detail
      },
      handleSurePassword(e) {
        this.surePassword = e.detail
      },
      handleRegister() {
        this.$request({
          url: '/user',
          method: 'POST',
          data: {
            name: this.name,
            email: this.email,
            password: this.password,
            surePassword: this.surePassword
          }
        }).then(res => {
          if (res && res.statusCode === 200) {
            uni.showToast({
              title: '注册成功',
              icon: 'success',
              mask: true
            })
            uni.navigateBack()
          }
        })
      },
      goToLogin() {
        uni.navigateBack()
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
    .register {
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
