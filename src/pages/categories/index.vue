<template>
	<view class="content">
    <view class="placeholder">
      <view class="decoration">———<text class="name">全部分类</text> ———</view>
    </view>
    <view class="list">
      <view class="item" v-for="item in categories" :key="item.id" @click="handleClick(item.id, item.type)">
        <text class="sub">{{item.type}}</text>
        <view class="image">
          <image :src="item.cover" mode="scaleToFill" class="img"></image>
          <view class="shadow"></view>
        </view>
      </view>
    </view>
	</view>
</template>
<script>
	export default {
    data() {
      return {
        categories: []
      }
    },
    onLoad() {
      this.$request({url: '/category'}).then(res => this.categories = res.data)
    },
		methods: {
      handleClick(typeId, type) {
        uni.navigateTo({
          url: `/pages/categories-list/index?typeId=${typeId}&type=${type}`
        })
      }
		}
	}
</script>

<style scoped lang="scss">
  .content {
    .placeholder {
      text-align: center;
      font-size: 34rpx;
      margin: 20rpx 0;
      .decoration {
        color: #ecf3e9;
        .name {
          color: #000;
          margin: 0 20rpx;
        }
      }
    }
    .list {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 20rpx;
      .item {
        width: calc(50% - 20rpx);
        height: 150rpx;
        background-color: #f6f8f5;
        border-radius: 20rpx;
        margin: 10rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .sub {
          font-size: 32rpx;
          padding-left: 30rpx;
        }
        .image {
          display: flex;
          padding-right: 30rpx;
          .img {
            width: 90rpx;
            height: 120rpx;
            border-radius: 5rpx;
          }
          .shadow {
            float: right;
            width: 8rpx;
            height: 60rpx;
            margin-top: 24rpx;
            background-color: #e2e3e0;
          }
        }
      }
    }
  }
</style>
