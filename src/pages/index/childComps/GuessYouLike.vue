<template>
	<view class="content">
    <view class="title">
      <view class="guess">
        <view class="line"></view>
        <h4>猜你喜欢</h4>
      </view>
    </view>
    <view class="books">
      <view class="item" @click="handleClick(item.id)" v-for="(item, index) in guess" :key="item.id">
        <LazyLoad :src="item.cover" :imgStyle="imgStyle" :mode="widthFix" />
        <view class="infos">
          <view class="top">
            <text class="name">{{item.name}}</text>
            <view class="score">
              <text class="num">{{item.score}}</text>
              <text>分</text>
            </view>
          </view>
          <view class="summary">{{item.summary}}</view>
          <view class="author">{{item.type}} • {{item.author}}</view>
        </view>
      </view>
    </view>
    <van-divider
      contentPosition="center"
      customStyle="color: #ececec; border-color: #ececec; font-size: 28rpx;"
    >
      实在猜不到亲喜欢什么了哦~
    </van-divider>
	</view>
</template>
<script>
	export default {
    props: {
      guess: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        imgStyle: 'flex: 2; width: 150rpx; height: 200rpx;'
      }
    },
		methods: {
      handleClick(id) {
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
      padding: 0 30rpx;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 40rpx;
        .infos {
          flex: 7;
          padding-left: 20rpx;
          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .name {
              font-weight: 700;
            }
            .score {
              font-size: 28rpx;
              color: #fca000;
              .num {
                font-size: 36rpx;
                font-weight: 700;
              }
            }
          }
          .summary {
            margin: 15rpx 0;
            font-size: 28rpx;
            color: #787878;
            display: -webkit-box;
            overflow: hidden;
            white-space: normal;
            text-overflow: ellipsis;
            word-wrap: break-all;
            -webkit-line-clamp:2;
            -webkit-box-orient: vertical;
          }
          .author {
            font-size: 28rpx;
            color: #787878;
          }
        }
      }
    }
  }
</style>
