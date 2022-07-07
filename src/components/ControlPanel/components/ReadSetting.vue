<template>
  <view class="read-settings">
    <view class="size">
      <view class="text">字号</view>
      <van-button @click="smaller" plain block size="small" color="#939393" round
        custom-style="font-weight: 700; font-size: 40rpx; padding: 30rpx 40rpx;">A-</van-button>
      <view class="value">{{fontSize}}</view>
      <van-button @click="larger" plain block size="small" color="#939393" round
        custom-style="font-weight: 700; font-size: 40rpx; padding: 30rpx 40rpx;">A+</van-button>
    </view>
    <view class="bg">
      <view>背景</view>
      <!-- v-for渲染 -->
      <view class="color" :class="{selected: selectTheme === i + 1}" v-for="i in 6" :key="i"
        @click="panel.changeBackgroundColor(i + 1)"></view>
    </view>
    <view class="line-spacing">
      <view class="spacing">间距</view>
      <van-button @click="narrow" class="iconfont" plain block :color="selectLine === 0 ? '#e6a74c' : '#939393'" round>
        &#xe6c7;</van-button>
      <van-button @click="moderate" class="iconfont" plain block :color="selectLine === 1 ? '#e6a74c' : '#939393'" round>
        &#xe6c8;</van-button>
      <van-button @click="wide" class="iconfont" plain block :color="selectLine === 2 ? '#e6a74c' : '#939393'" round>
        &#xe6c6;</van-button>
    </view>
  </view>
</template>

<script>
  export default {
    inject: ['root', 'panel'],
    data() {
      return {
        selectLine: 0, // 选择的行间距
      }
    },
    computed: {
      fontSize: {
        get() {
          return this.root.fontSize
        },
        set(val) {
          this.root.fontSize = val;
        }
      },
      lineHeight: {
        get() {
          return this.root.lineHeight
        },
        set(val) {
          this.root.lineHeight = val;
        }
      },
      selectTheme() {
        return this.panel.selectTheme
      }
    },
    methods: {
      smaller() {
        if (this.fontSize <= 32) {
          this.fontSize = 32
        } else {
          this.fontSize -= 2
          this.lineHeight -= 2
        }
      },
      larger() {
        if (this.fontSize >= 84) {
          this.fontSize = 84
        } else {
          this.fontSize += 2
          this.lineHeight += 2
        }
      },
      narrow() {
        if (!this.selectLine) {
          return
        } else if (this.selectLine === 1) {
          this.lineHeight -= 46
        } else {
          this.lineHeight -= 92
        }
        this.selectLine = 0
      },
      moderate() {
        if (!this.selectLine) {
          this.lineHeight += 46
        } else if (this.selectLine === 1) {
          return
        } else {
          this.lineHeight -= 46
        }
        this.selectLine = 1
      },
      wide() {
        if (!this.selectLine) {
          this.lineHeight += 92
        } else if (this.selectLine === 1) {
          this.lineHeight += 46
        } else {
          return
        }
        this.selectLine = 2
      }
    }
  }
</script>

<style lang="scss" scoped>
  .read-settings {
    display: flex;
    flex-direction: column;
    margin: 80rpx 60rpx;
    color: #c5c5c5;

    .size,
    .bg,
    .line-spacing {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 40rpx;
    }

    .size,
    .line-spacing {
      justify-content: flex-start;

      .text {
        padding-right: 40rpx;
      }

      .value {
        padding: 0 40rpx;
      }

      .spacing {
        padding-right: 20rpx;
      }
    }

    .bg {
      .color {
        width: 60rpx;
        height: 60rpx;
        border-radius: 50%;
        border: 1px solid #47474a;
      }

      .selected {
        box-sizing: border-box;
        border: 2px solid #e6a74c;

        &::after {
          content: '\e62a';
          font-family: 'iconfont';
          display: block;
          text-align: center;
          height: 60rpx;
          line-height: 60rpx;
          font-size: 40rpx;
          font-weight: 700;
          color: #e6a74c;
        }
      }

      :nth-child(2) {
        background-color: #efd99f;
      }

      :nth-child(3) {
        background-color: #d1e0cd;
      }

      :nth-child(4) {
        background-color: #f6f6f6;
      }

      :nth-child(5) {
        background-color: #ece1cf;
      }

      :nth-child(6) {
        background-color: #463e3c;
      }

      :nth-child(7) {
        background-color: #3b3f42;
      }
    }

    .line-spacing {
      .iconfont {
        padding: 0 20rpx;
      }
    }
  }
</style>