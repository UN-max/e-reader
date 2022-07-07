<template>
  <view class="brightness">
    <view class="iconfont">&#xe650;</view>
    <view class="progress">
      <van-slider :value="brightness" @change="onChangeBright" :min="0" :max="1" :step="0.1"
        active-color="#eda63e" inactive-color="#4c4a4b" />
    </view>
    <view class="iconfont">&#xe672;</view>
  </view>
</template>

<script>
  export default {
    inject: ['panel'],
    computed: {
      brightness: {
        get() {
          return this.panel.brightness
        },
        set(val) {
          this.panel.brightness = val
        }
      }
    },
    methods: {
      onChangeBright(e) {
        uni.setScreenBrightness({
          value: e.detail
        })
        this.brightness = e.detail
      }
    }
  }
</script>

<style lang="scss" scoped>
  .brightness {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 80rpx 20rpx;
    color: #c5c5c5;

    .progress {
      flex: 1;
      display: inline-block;
      margin: 0 20rpx;
    }

    .iconfont {
      padding: 0 20rpx 0 40rpx;
    }
  }
</style>