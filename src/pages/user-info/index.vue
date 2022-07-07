<template>
	<view class="content">
    <van-cell-group inset>
      <van-cell @click="handleClick('name')" title="昵称" :value="userInfo.name" size="large" :border="false" is-link></van-cell>
      <van-cell @click="handleClick('email')" title="邮箱" :value="userInfo.email" size="large" :border="false" is-link></van-cell>
      <van-cell @click="handleClick('password')" title="密码" size="large" :border="false" is-link></van-cell>
      <van-dialog
        use-slot
        title=" "
        :show="show"
        show-cancel-button
        @close="close"
        @confirm="confirm"
      >
        <van-field
          :value="value"
          clearable
          focus
          title-width="3em"
          type="password"
          label="密码"
          size="large"
          placeholder="请输入密码"
          @change="onChange"
        />
      </van-dialog>
    </van-cell-group>
	</view>
</template>
<script>
	export default {
    data() {
      return {
        userInfo: {},
        show: false,
        value: ''
      }
    },
		onShow() {
      this.userInfo = uni.getStorageSync('userInfo')
    },
    methods: {
      handleClick(value) {
        if (value === 'email') {
          uni.navigateTo({
            url: `/pages/update-info/index?type=${value}&origin=${this.userInfo.email}`
          })
        } else if(value === 'name') {
          uni.navigateTo({
            url: `/pages/update-info/index?type=${value}&origin=${this.userInfo.name}`
          })
        } else {
          this.show = true
        }
      },
      close() {
        this.show = false
      },
      onChange(e) {
        this.value = e.detail
      },
      confirm() {
        this.$request({
          url: `/user/${this.value}`
        }).then(res => {
          if (res.data.length) {
            uni.navigateTo({
              url: `/pages/update-info/index?type=password`
            })
            this.show = false
            this.value = ''
          } else {
            uni.showToast({
              title: '密码错误',
              icon: 'error'
            })
            this.show = false
            this.value = ''
          }
        })
      }
    }
	}
</script>

<style scoped lang="scss">
</style>
