<template>
	<view class="content">
    <view class="books">
      <van-skeleton title avatar avatar-size="160rpx" avatar-shape="square" row="1" :loading="loading">
        <view class="item" @click="handleClick(item.id)" v-for="item in books" :key="item.id">
          <view class="book">
            <LazyLoad :src="item.cover" :imgStyle="imgStyle" />
            <view class="infos">
              <view class="name">{{item.name}}</view>
              <view class="title">{{item.title}}</view>
              <view class="time">浏览时间：{{format(item.time)}}</view>
            </view>
          </view>
          <button class="shelves" @click.stop="addToShelves(item.id)" v-if="!~shelves.indexOf(item.id)">加入书架</button>
          <button class="reading" @click.stop="open(item.id, item.chapter)" v-else>打开阅读</button>
        </view>
        <view v-if="!books.length">
          <van-empty
            class="custom-image"
            image="https://img.yzcdn.cn/vant/custom-empty-image.png"
            description="暂无浏览历史~"
          />
        </view>
      </van-skeleton>
    </view>

	</view>
</template>
<script>

  import { formatDate } from '../../utils/format'
	export default {
    
    data() {
      return {
        books: [],
        shelves: [],
        isInshelves: false,
        loading: true,
        imgStyle: 'flex: 1; width: 130rpx; height: 180rpx;'
      }
    },
    onLoad() {
      this.$request({
        url: '/shelves'
      }).then(res => {
        res.data.forEach(item => {
          this.shelves.push(item.id)
        })
      })
    },
		onShow() {
      this.$request({
        url: '/history'
      }).then(res => this.books = res.data)
    },
    onReady() {
      this.loading = false
    },
    computed: {
      format() {
        return function (time) {
          let day = formatDate(new Date()).split(' ')[0]
          time = time.split(' ')[0]
          const days = (Date.parse(day.replace(/-/g, '/')) - Date.parse(time.replace(/-/g, '/'))) / (1 * 24 * 60 * 60 * 1000)
          if (!days) {
            return '今天'
          } else if (days === 1) {
            return '昨天'
          } else if (days === 2) {
            return '前天'
          } else {
            return time
          }
        }
      }
    },
    methods: {
      handleClick (id) {
        uni.navigateTo({
          url: `/pages/detail/index?id=${id}`
        })
      },
      open(id, chapter) {
        uni.navigateTo({
          url: `/pages/reader/index?bookId=${id}&chapter=${chapter}`
        })
      },
      addToShelves(id) {
        this.$request({
          url: `/shelves/${id}`,
          method: 'POST'
        }).then(res => {
          uni.showToast({
            title: '已加入书架'
          })
          this.shelves.push(id)
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
        .book {
          flex: 1;
          display: flex;
          align-items: center;
          margin: 20rpx 0;
          overflow: hidden;
          .infos {
            flex: 3;
            padding-left: 30rpx;
            .name {
              font-weight: 700;
              margin-bottom: 20rpx;
            }
            .time,
            .title {
              font-size: 28rpx;
              color: #787878;
              margin-bottom: 5rpx;
            }
          }
        }
        .shelves,
        .reading {
          background-color: transparent;
          font-size: 28rpx;
          margin: 0;
        }
        .shelves {
          color: #fca000;
        }
      }
    }
  }
</style>
