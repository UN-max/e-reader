<template>
	<view class="content">
    <!-- 更新 Email -->
    <Update v-if="key === 'email'" :value="origin" :type="key" @value="handleValue" @sure="handleUpdate"></Update>
    <!-- 更新 昵称 -->
    <Update v-if="key === 'name'" :value="origin" :type="key" @value="handleValue" @sure="handleUpdate"></Update>
    <!-- 更新password -->
    <Update v-if="key === 'password'" :value="origin" :type="key" @value="handleValue" @sure="handleUpdate"></Update>
	</view>
</template>
<script>
  import Update from './childComps/Update.vue'

	export default {
    components: {
      Update
    },
    data() {
      return {
        origin: '',
        text: '',
        key: ''
      }
    },
		onLoad(options) {
      this.origin = options.origin
      this.key = options.type
    },
    methods: {
      handleValue(value) {
        this.text = value
      },
      handleUpdate() {
        this.$request({
          url: '/user/update',
          method: 'POST',
          data: {
            key: this.key,
            value: this.text
          }
        }).then(res => {
          if (res && res.statusCode === 200) {
            let _userInfo = uni.getStorageSync('userInfo')
            _userInfo[this.key] = this.text
            uni.setStorageSync('userInfo', _userInfo)
            uni.showToast({
              title: '修改成功',
              icon: 'success',
              mask: true
            })
            uni.navigateBack()
          }
        })
      }
    }
	}
</script>

<style scoped lang="scss">
</style>
