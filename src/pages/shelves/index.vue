<template>
	<view class="content">
    <view class="books" v-if="isLogin">
      <view class="item" @click="handleClick(item.id, item.num)" @longpress="longPress(item.id)" v-for="item in books" :key="item.id">
        <view class="book">
          <LazyLoad :src="item.cover" :imgStyle="imgStyle" />
          <view class="infos">
            <view class="name">{{item.name}}</view>
            <view class="author">{{item.num ? '读到：' + item.title : item.author}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="add" @click="add">
      <view class="field">
        <van-icon name="plus" size="40rpx" />
      </view>
      <view class="text">添加你喜欢的小说</view>
    </view>
	</view>
</template>
<script>

	export default {
    
    data() {
      return {
        books: [],
        isLogin: false,
        imgStyle: 'flex: 1; width: 130rpx; height: 180rpx;'
      }
    },
		onShow() {
      this.isLogin = Object.keys(uni.getStorageSync('userInfo')).length === 0 ? false : true
      this.getShelves()
    },
    onPullDownRefresh() {
      this.getShelves()
      uni.stopPullDownRefresh()
    },
    methods: {
      getShelves() {
        this.$request({
          url: '/shelves'
        }).then(res => this.books = res.data)
      },
      handleClick (id, chapter) {
        if (chapter) {
          uni.navigateTo({
            url: `/pages/reader/index?bookId=${id}&chapter=${chapter}`
          })
        } else {
          uni.navigateTo({
            url: `/pages/reader/index?bookId=${id}`
          })
        }
      },
      add() {
        uni.switchTab({
          url: '/pages/index/index'
        })
      },
      longPress(id) {
        uni.navigateTo({
          url: `/pages/manage-shelves/index?id=${id}`
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
        justify-content: space-between;
        align-items: center;
        .book {
          flex: 1;
          display: flex;
          align-items: center;
          margin: 20rpx 0;
          .infos {
            flex: 4;
            padding-left: 30rpx;
            .name {
              font-weight: 700;
              margin-bottom: 20rpx;
            }
            .author {
              font-size: 28rpx;
              color: #787878;
            }
          }
        }
      }
    }
    .add {
      display: flex;
      align-items: center;
      padding: 0 30rpx 30rpx 30rpx;
      .field {
        width: 130rpx;
        height: 180rpx;
        line-height: 180rpx;
        text-align: center;
        background-color: #f7f8fa;
        margin-right: 30rpx;
      }
      .text {
        font-size: 30rpx;
        color: #787878;
      }
    }
  }
</style>
