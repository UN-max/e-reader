<template>
	<view class="content">
    <view v-if="type === 'email'" class="warning">您正在修改您的邮箱：</view>
    <view v-if="type === 'name'" class="warning">您正在修改您的昵称：</view>
    <view v-if="type === 'password'" class="warning">您正在修改您的密码：</view>
    <input :value="value" @input="onChange" focus class="input" />
    <button v-if="!isActive" class="update deactive" disabled>确认修改</button>
    <button v-else class="update" @click="handleClick">确认修改</button>
	</view>
</template>
<script>
	export default {
    props: {
      value: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        isActive: false
      }
    },
    methods: {
      onChange(e) {
        this.isActive = true
        this.$emit('value', e.detail.value);
      },
      handleClick() {
        this.$emit('sure')
      }
    }
	}
</script>

<style scoped lang="scss">
  .content {
    .warning {
      margin: 40rpx;
      color: red;
    }
    .input {
      padding: 20rpx 40rpx;
      margin: 40rpx;
      border: 1px solid #eee;
    }
    .update {
      height: 80rpx;
      line-height: 80rpx;
      color: #000;
      font-size: 30rpx;
      background-color: #fcc800;
      padding: 0 40rpx;
      margin: 40rpx;
      border-radius: 50rpx;
      &.deactive{
        background-color: #f6f6f6;
        color: #ccc;
      }
    }
  }
</style>
