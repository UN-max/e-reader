<template>
	<view class="content">
    <view class="books">
      <view class="item" v-for="(item, index) in books" :key="item.id" @click="handleClick(item.id)">
        <view class="rank" v-if="index !== 0 && index !== 1 && index !== 2">{{index + 1}}</view>
        <view class="rank special" v-if="index === 0">
          <image src="@/static/img/uploads/one.png" mode="widthFix" class="img"></image>
        </view>
        <view class="rank special" v-if="index === 1">
          <image src="@/static/img/uploads/two.png" mode="widthFix" class="img"></image>
        </view>
        <view class="rank special" v-if="index === 2">
          <image src="@/static/img/uploads/three.png" mode="widthFix" class="img"></image>
        </view>
        <LazyLoad :src="item.cover" :mode="widthFix" :imgStyle="imgStyle" class="image" />
        <view class="text">
          <view>{{item.name}}</view>
          <view class="others" v-if="item.wordNum">{{item.type}} • {{item.status}} • {{item.wordNum}}万字</view>
          <view class="others" v-else>{{item.type}} • {{item.status}}</view>
        </view>
      </view>
    </view>
    <van-divider
      contentPosition="center"
      customStyle="color: #ececec; border-color: #ececec; font-size: 28rpx;"
    >
      我是有底线的~
    </van-divider>
	</view>
</template>

<script>
	export default {
    data () {
      return {
        books: [],
        imgStyle: 'width: 100%; height: 140rpx; border-radius: 5rpx;'
      }
    },
		onLoad () {
      this.$request({
        url: '/home/ranking'
      }).then(res => this.books = res.data)
    },
    methods: {
      handleClick (id) {
        uni.navigateTo({
          url: `/pages/detail/index?id=${id}`
        })
      }
    }
	}
</script>


<style scoped lang="scss">
  .content {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      .guess {
        display: flex;
        align-items: center;
        .line {
          width: 10rpx;
          height: 40rpx;
          border-radius: 10rpx;
          background-color: #fca909;
          margin-right: 15rpx;
        }
        h4 {
          font-size: 40rpx;
        }
      }
    }
    .books {
      .item {
        display: flex;
        align-items: center;
        margin: 20rpx 0;
        .special {
          .img {
            width: 60rpx;
            height: 60rpx;
          }
        }
        .rank {
          flex: 2;
          text-align: center;
          color: #c5c5bd;
          font-weight: 700;
          margin-right: 10rpx;
        }
        .image {
          flex: 3;
          margin-right: 20rpx;
        }
        .text {
          flex: 15;
          .others {
            font-size: 30rpx;
            color: #6c6b69;
            margin-top: 10rpx;
          }
        }
      }
    }
  }
</style>
