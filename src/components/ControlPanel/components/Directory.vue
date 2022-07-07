<template>
  <van-popup position="left" overlay-style="background-color: transparent;"
    custom-style="width: 80vw; overflow: hidden;" :show="showDirectory" @close="onCloseDirectory">
    <view style="overflow: auto; height: calc(100vh - 120rpx)"
      :style="{backgroundColor: backgroundColor, color: color}" v-show="tag === 'directory'">
      <view class="infos">
        <view>{{bookInfo.status === '连载' ? '连载中' : '已完结'}}</view>
        <view class="num">共{{bookInfo.totalChapters}}章</view>
        <view class="iconfont reverse" @click="reverse">&#xe653;<text v-if="!isReverse">正序</text><text
            v-else>倒序</text></view>
      </view>
      <view class="directory" v-if="!isReverse">
        <view class="item" v-for="item in directoryInfo" :key="item.id" @click="toRead(item.id)">{{item.title}}</view>
      </view>
      <view class="directory" v-else>
        <view class="item" v-for="item in reverseDirectoryInfo" :key="item.id" @click="toRead(item.id)">{{item.title}}
        </view>
      </view>
    </view>
    <view style="overflow: auto; height: calc(100vh - 120rpx)"
      :style="{backgroundColor: backgroundColor, color: color}" v-show="tag === 'mark'">
      <view class="marks">
        <view class="item" v-for="item in marksInfo" :key="item.id" @click="toRead(item.num)">
          <view class="tit">{{item.title}}</view>
          <view class="wrapper">
            <view class="percent">{{percent(item.num)}}</view>
            <view class="time">{{time(item.time)}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="footer" :style="{backgroundColor: backgroundColor, color: color}">
      <view class="box">
        <view class="list" :class="tag === 'directory' ? 'activated' : ''" @click="toList">目录</view>
        <view v-if="isLogin" class="mark" :class="tag === 'mark' ? 'activated' : ''" @click="toMark">书签</view>
      </view>
    </view>
  </van-popup>
</template>

<script>
  import { formatDate } from '@/utils/format'
  export default {
    inject: ['root', 'panel'],
    data() {
      return {
        directoryInfo: [],
        reverseDirectoryInfo: [],
        isReverse: false
      }
    },
    mounted() {
      this.$request({
        url: `/books/${this.root.bookId}/directory`
      }).then(res => {
        this.directoryInfo = res.data
        this.directoryInfo.forEach(item => {
          this.root.chapters.push(item.id)
          this.reverseDirectoryInfo.unshift(item)
        })
      })
    },
    computed: {
      percent() {
        return function (x) {
          return Math.round(x / this.root.chapters.length * 10000) / 100 + '%'
        }
      },
      time() {
        return function (x) {
          x = new Date(x)
          return formatDate(x)
        }
      },
      ...['bookInfo', 'marksInfo', 'isLogin'].reduce((prev, curr) => {
        prev[curr] = function () {
          return this.root[curr]
        }
        return prev
      }, {}),
      ...['showDirectory', 'tag'].reduce((prev, curr) => {
        prev[curr] = {
          get() {
            return this.panel[curr]
          },
          set(val) {
            this.panel[curr] = val
          }
        }
        return prev
      }, {}),
      ...['backgroundColor', 'color'].reduce((prev, curr) => {
        prev[curr] = {
          get() {
            return this.root[curr]
          },
          set(val) {
            this.root[curr] = val
          }
        }
        return prev
      }, {}),
    },
    methods: {
      onCloseDirectory() {
        this.showDirectory = false
      },
      reverse() {
        this.isReverse = !this.isReverse
      },
      toRead(id) {
        this.panel.showDirectory = false
        this.panel.active = null
        this.panel.$parent.getContent(id)
      },
      toList() {
        this.tag = 'directory'
      },
      toMark() {
        this.panel.toMark()
      }
    }
  }
</script>

<style lang="scss" scoped>
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

  .directory {
    .item {
      padding: 0 30rpx 30rpx 30rpx;
    }
  }

  .marks {
    margin-top: 40rpx;

    .item {
      padding: 0 30rpx 60rpx;

      .wrapper {
        display: flex;
        justify-content: space-between;
        margin-top: 20rpx;
        font-size: 26rpx;
      }
    }
  }

  .footer {
    height: 120rpx;
    background-color: transparent;
    border-top: 1px solid #eee;

    .box {
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      height: 120rpx;

      .list {
        font-size: 32rpx;
        
        &.activated {
          font-weight: 700;
        }
      }

      .mark {
        font-size: 32rpx;

        &.activated {
          font-weight: 700;
        }
      }
    }
  }
</style>