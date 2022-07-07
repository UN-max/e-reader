<template>
	<view class="box">
    <view class="box1" v-if="historySearch.length">
      <view class="title">
        <span class="tit">搜索历史</span>
        <span class="iconfont" @click="handleClick">&#xe74b;</span>
      </view>
      <view class="list">
        <view class="item" v-for="item in historySearch" :key="item.id" @click="handleSearch(item.content)">
          <view class="text">{{item.content}}</view>
        </view>
      </view>
    </view>
    <view class="box2">
      <view class="title">
        <span class="tit">热门搜索</span>
      </view>
      <view class="list">
        <view class="item" v-for="item in hotSearch" :key="item.id" @click="handleHot(item.content)">
          <view class="text">{{item.content}}</view>
        </view>
      </view>
    </view>
    <view class="box3">
      <view class="title">
        <span class="tit">热搜书籍</span>
      </view>
      <view class="books">
        <view class="item" v-for="(item, index) in booksList" :key="item.id" @click="goToDetail(item.id)">
          <view class="rank" v-if="index !== 0 && index !== 1 && index !== 2">{{index + 1}}</view>
          <view class="rank special" v-if="index === 0">
            <image src="../../../static/img/uploads/one.png" mode="widthFix" class="img"></image>
          </view>
          <view class="rank special" v-if="index === 1">
            <image src="../../../static/img/uploads/two.png" mode="widthFix" class="img"></image>
          </view>
          <view class="rank special" v-if="index === 2">
            <image src="../../../static/img/uploads/three.png" mode="widthFix" class="img"></image>
          </view>
          <LazyLoad :src="item.cover" :mode="widthFix" class="image" :imgStyle="imgStyle" />
          <view class="text">
            <view>{{item.name}}</view>
            <view class="others" v-if="item.wordNum">{{item.type}} • {{item.status}} • {{item.wordNum}}万字</view>
            <view class="others" v-else>{{item.type}} • {{item.status}}</view>
          </view>
        </view>
      </view>
    </view>
	</view>
</template>
<script>
	export default {
    
		props: {
      hotSearch: {
        type: Array,
        default() {
          return []
        }
      },
      historySearch: {
        type: Array,
        default() {
          return []
        }
      },
      booksList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        imgStyle: 'width: 100%; height: 140rpx; border-radius: 5rpx;'
      }
    },
    methods: {
      handleClick () {
        this.$emit('del')
      },
      handleHot(value) {
        this.$emit('search', value);
      },
      handleSearch(value) {
        this.$emit('search', value);
      },
      goToDetail(id) {
        uni.navigateTo({
          url: `/pages/detail/index?id=${id}`
        })
      }
    }
	}
</script>

<style scoped lang="scss">
  .box {
    box-sizing: border-box;
    width: 100%;
    padding: 20rpx 30rpx;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .tit {
        font-weight: 700;
      }
      .icon-shanchu {
        font-size: 36rpx;
      }
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10rpx;
      .item {
        background-color: #f4f6f5;
        padding: 10rpx 30rpx;
        border-radius: 30rpx;
        margin: 10rpx;
        margin-left: 0;
        .text {
          font-size: 28rpx;
        }
      }
    }
    .box1 {
      margin-bottom: 25rpx;
    }
    .box2 {
      margin-bottom: 25rpx;
      .list .item {
        &:first-child,
        &:nth-child(2) {
          display: flex;
          background-color: #fae7e0;
          color: #ea7246;
          &::before {
            content: '\e669';
            font-family: 'iconfont';
            color: #ea7246;
          }
        }
      }
    }
    .box3 {
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
  }
</style>
