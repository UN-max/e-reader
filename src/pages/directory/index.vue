
<template>
	<view class="content">
    <view class="infos">
      <view>{{status === '连载' ? '连载中' : '已完结'}}</view>
      <view class="num">共{{num}}章</view>
      <view class="iconfont reverse" @click="reverse">&#xe653;<text v-if="!isReverse">正序</text><text v-else>倒序</text></view>
    </view>
    <view class="chapters" v-if="!isReverse">
      <view class="item" v-for="item in directoryInfo" :key="item.id" @click="toRead(item.id)">{{item.title}}</view>
    </view>
    <view class="chapters" v-else>
      <view class="item" v-for="item in reverseDirectoryInfo" :key="item.id" @click="toRead(item.id)">{{item.title}}</view>
    </view>
	</view>
</template>
<script>
	export default {
    data() {
      return {
        directoryInfo: [],
        reverseDirectoryInfo: [],
        isReverse: false,
        status: '',
        num: null,
        id: null
      }
    },
		onLoad(options) {
      const { id, name, status, num } = options
      this.id = id
      this.status = status
      this.num = num
      uni.setNavigationBarTitle({
        title: `${name}`
      })
      this.$request({
        url: `/books/${id}/directory`,
      }).then(res => {
        this.directoryInfo = res.data
        this.directoryInfo.forEach(item => {
          this.reverseDirectoryInfo.unshift(item)
        })
      })
    },
    methods: {
      toRead(id) {
        uni.navigateTo({
          url: `/pages/reader/index?bookId=${this.id}&chapter=${id}`
        })
      },
      reverse() {
        this.isReverse = !this.isReverse
      }
    }
	}
</script>

<style scoped lang="scss">
  .content {
    .infos {
      display: flex;
      align-items: center;
      color: #979797;
      padding: 40rpx 30rpx;
      font-size: 30rpx;
      .num {
        margin-left: 10rpx;
      }
      .reverse {
        margin-left: auto;
        font-size: 26rpx;
      }
    }
    .chapters {
      .item {
        padding: 0 30rpx 30rpx 30rpx;
      }
    }
  }
</style>
