<template>
  <view class="chapter">
    <view @click="last">上一章</view>
    <view class="progress">
      <van-slider :value="chapter" @change="onChange" :min="1" :max="total"
        active-color="#eda63e" inactive-color="#4c4a4b" />
    </view>
    <view @click="next">下一章</view>
  </view>
</template>

<script>
  export default {
    inject: ['root'],
    computed: {
      chapter: {
        get() {
          return this.root.chapter
        },
        set(val) {
          this.root.chapter = val
        }
      },
      total() {
        return this.root.bookInfo.totalChapters
      }
    },
    methods: {
      onChange(e) {
        this.chapter = e.detail
        this.root.getContent(this.chapter)
      },
      last() {
        this.root.last()
      },
      next() {
        this.root.next()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .chapter {
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