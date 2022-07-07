<template>
	<view class="content">
    <view class="books">
      <view class="item" @click="handleClick(item.id)" v-for="(item, index) in books" :key="item.id">
        <LazyLoad :src="item.cover" :mode="widthFix" :imgStyle="imgStyle" />
        <view class="infos">
          <view class="top">
            <text class="name">{{item.name}}</text>
            <view class="score">
              <text class="num">{{item.score}}</text>
              <text>分</text>
            </view>
          </view>
          <view class="summary">{{item.summary}}</view>
          <view class="others" v-if="item.wordNum">{{item.author}} • {{item.status}} • {{item.wordNum}}万字</view>
          <view class="others" v-else>{{item.author}} • {{item.status}}</view>
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
        imgStyle: 'flex: 2; width: 150rpx; height: 200rpx;'
      }
    },
		onLoad (options) {
      const { typeId, type } = options
      uni.setNavigationBarTitle({
        title: type
      })
      this.$request({
        url: `/category/${typeId}`
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
    .books {
      padding: 30rpx;
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
          .others {
            font-size: 28rpx;
            color: #787878;
          }
        }
      }
    }
  }
</style>
