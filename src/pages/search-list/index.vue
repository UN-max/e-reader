<template>
	<view class="content">
    <view class="books">
      <view class="item" @click="handleClick(item.id)" v-for="item in books" :key="item.id">
        <LazyLoad :src="item.cover" :mode="widthFix" :imgStyle="imgStyle" />
        <view class="infos">
          <view class="top">
            <rich-text :nodes="reload(item.name)" class="name"></rich-text>
          </view>
          <rich-text :nodes="reload(item.summary)" class="summary"></rich-text>
          <view class="others" v-if="item.wordNum"><rich-text :nodes="reload(item.author)"></rich-text> • {{item.status}} • {{item.wordNum}}万字</view>
          <view class="others" v-else><rich-text :nodes="reload(item.author)"></rich-text> • {{item.status}}</view>
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
        wd: '',
        imgStyle: 'flex: 2; width: 150rpx; height: 200rpx;'
      }
    },
		onLoad (options) {
      this.wd = options.wd
      this.$request({
        url: `/search?wd=${this.wd}`
      }).then(res => this.books = res.data)
    },
    methods: {
      reload(text) {
        return text.replace(this.wd, `<font style="color: #d81d1d">${this.wd}</font>`) + '\xa0';
      },
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
            display: flex;
            font-size: 28rpx;
            color: #787878;
          }
        }
      }
    }
  }
</style>
