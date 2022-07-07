<template>
	<view class="box">
    <view class="content">
      <van-skeleton title avatar avatar-size="240rpx" avatar-shape="square" row="3" :loading="loading">
        <view class="top">
          <image :src="booksInfo.cover" mode="widthFix" class="img"></image>
          <view class="base-info">
            <view class="book-name">{{booksInfo.name}}</view>
            <view class="score">
              <text class="label">书籍评分：</text>
              <text class="num">{{booksInfo.score}}</text>
              <text class="label">分</text>
            </view>
            <view class="author">
              <text class="label">作者：</text>
              <text class="name">{{booksInfo.author}}</text>
            </view>
            <view class="others" v-if="booksInfo.wordNum">{{booksInfo.type}} • {{booksInfo.status}} • {{booksInfo.wordNum}}万字</view>
            <view class="others" v-else>{{booksInfo.type}} • {{booksInfo.status}}</view>
          </view>
        </view>
        <view class="bg"></view>
      </van-skeleton>
      <van-skeleton row="15" :loading="loading">
        <view class="center">
          <view class="summary">
            <view class="label">简介</view>
            <text class="content">{{booksInfo.summary}}</text>
          </view>
          <view class="directory" @click="showDirectory">
            <view class="left">
              <view class="label">目录</view>
              <view>{{booksInfo.status === '连载' ? '连载中' : '已完结'}}</view>
              <view class="num">共{{booksInfo.totalChapters}}章</view>
            </view>
            <view class="iconfont">&#xe601;</view>
          </view>
          <view class="bg"></view>
          <view class="comment">
            <view class="tabbar">
              <view class="label">书评（{{comments.length}}条）</view>
              <view class="edit" @click="write">写书评</view>
            </view>
            <view class="comments" v-if="comments.length">
              <view class="infos">
                <image class="avatar" src="../../static/img/uploads/login.jpg"></image>
                <view class="name">{{comments[0].name}}</view>
              </view>
              <view class="content">
                <view class="text">{{comments[0].content}}</view>
                <view class="time">{{format(comments[0].time)}}</view>
              </view>
              <view class="all" @click="getAll">查看全部{{comments.length}}条书评<text class="iconfont">&#xe601;</text></view>
            </view>
            <view class="comments" v-else>
              <view class="content">
                <view class="special" @click="write">本书暂无精彩书评，快来写一条吧<text class="iconfont">&#xe601;</text></view>
              </view>
            </view>
          </view>
        </view>
      </van-skeleton>
    </view>
    <view class="footer">
      <view class="content">
        <view class="shelve" v-if="!isInShevles" @click="addShelves">
          <view class="iconfont">&#xe63d;</view>
          <text>加入书架</text>
        </view>
        <view class="shelve shelve-o" v-else>
          <view class="iconfont">&#xe63f;</view>
          <text>已在书架</text>
        </view>
        <view class="read" @click="read">立即阅读</view>
      </view>
    </view>
  </view>
</template>
<script>
  import { formatDate } from '../../utils/format'
	export default {
    data() {
      return {
        id: null,
        booksInfo: {},
        isInShevles: false,
        chapter: 1,
        loading: true,
        comments: [],
        isLogin: false
      }
    },
		onLoad (options) {
      this.id = options.id
      this.$request({
        url: `/books/${this.id}`
      }).then(res => this.booksInfo = res.data[0])

      if (this.isLogin) {
        this.$request({
          url: `/shelves/${this.id}`
        }).then(res => this.isInShevles = res.data)
      }
    },
    onShow() {
      this.isLogin = Object.keys(uni.getStorageSync('userInfo')).length === 0 ? false : true
      this.getComments()
      if (this.isLogin) {
        this.$request({
          url: `/history/${this.id}`
        }).then(res => this.chapter = res.data.length ? res.data[0].num : 1)
        this.$request({
          url: `/books/${this.id}`
        }).then(res => this.booksInfo = res.data[0])
      }
    },
    onReady() {
      this.loading = false
    },
    computed: {
      format() {
        return function (time) {
          return formatDate(new Date(time))
        }
      }
    },
    methods: {
      getComments() {
        this.$request({
          url: `/comment/${this.id}`
        }).then(res => this.comments = res.data)
      },
      showDirectory() {
        const name = this.booksInfo.name
        const status = this.booksInfo.status
        const num = this.booksInfo.totalChapters
        uni.navigateTo({
          url: `/pages/directory/index?id=${this.id}&name=${name}&status=${status}&num=${num}`
        })
      },
      addShelves() {
        if (this.isLogin) {
          this.$request({
            url: `/shelves/${this.id}`,
            method: 'POST'
          }).then(res => {
            if (res.statusCode === 200) {
              this.isInShevles = true
              uni.showToast({
                title: '加入成功',
                icon: 'success',
                mask: true
              })
            }
          })
        } else {
          this.$toast()
        }
      },
      read() {
        uni.navigateTo({
          url: `/pages/reader/index?bookId=${this.id}&chapter=${this.chapter}`
        })
      },
      getAll() {
        if (this.isLogin) {
          uni.navigateTo({
            url: `/pages/comments/index?bookId=${this.id}`
          })
        } else {
          this.$toast()
        }
      },
      write() {
        if (this.isLogin) {
          uni.navigateTo({
            url: `/pages/comments/index?bookId=${this.id}&flag=true`
          })
        } else {
          this.$toast()
        }
      }
    }
	}
</script>

<style scoped lang="scss">
  .box {
    .content {
      .bg {
        width: calc(100vw - 40rpx);
        height: 20rpx;
        background-color: #f4f4f4;
        margin: 15rpx auto 0;
      }
      .top {
        display: flex;
        background: #ffffff;
        z-index: 1;
        padding: 40rpx;
        .img {
          width: 250rpx;
        }
        .base-info {
          margin: 20rpx 0 20rpx 40rpx;
          font-size: 30rpx;
          .book-name {
            font-size: 40rpx;
            font-weight: 700;
            padding-bottom: 30rpx;
          }
          .score {
            color: #6c6b69;
            padding-bottom: 15rpx;
            .num {
              font-size: 32rpx;
              font-weight: 700;
            }
          }
          .author {
            color: #6c6b69;
            padding-bottom: 15rpx;
          }
          .others {
            color: #6c6b69;
          }
        }
      }
      .center {
        .summary {
          padding: 40rpx;
          .label {
            font-size: 38rpx;
            font-weight: 700;
            margin-bottom: 30rpx;
          }
          .content {
            color: #0c0c0c;
            font-size: 32rpx;
          }
        }
        .directory {
          padding: 0 40rpx 25rpx 40rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #979797;
          .left {
            display: flex;
            align-items: center;
            .label {
              color: #000;
              font-size: 36rpx;
              margin-right: 20rpx;
            }
            .num {
              margin-left: 10rpx;
            }
          }
          .more {
            float: right;
          }
        }
        .comment {
          .tabbar {
            padding: 40rpx;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .label {
              color: #000;
              font-size: 36rpx;
            }
            .edit {
              padding: 10rpx 20rpx;
              border-radius: 30rpx;
              background-color: #fcc800;
              font-size: 32rpx;
              &::before {
                content: '\e608';
                font-family: 'iconfont';
                margin-right: 10rpx;
              }
            }
          }
          .comments {
            padding: 0 40rpx;
            .infos {
              display: flex;
              align-items: center;
              color: #3b3a3a;
              .avatar {
                width: 70rpx;
                height: 70rpx;
                border-radius: 70rpx;
                margin-right: 20rpx;
              }
            }
            .content {
              font-size: 34rpx;
              margin: 30rpx 0;
              .time {
                color: #979797;
                font-size: 28rpx;
                text-align: right;
                margin-top: 30rpx;
              }
              .special {
                text-align: center;
                color: #979797;
                font-size: 32rpx;
              }
            }
          }
          .all {
            height: 100rpx;
            line-height: 100rpx;
            text-align: center;
            color: #353131;
            border-top: 1px solid #eee;
          }
        }
      }
    }
    .footer {
      height: 120rpx;
      .content {
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 120rpx;
        padding: 0 70rpx;
        background-color: #f6f6f6;
        .shelve {
          display: flex;
          align-items: center;
          color: #0c0c0c;
          font-size: 32rpx;
          &.shelve-o {
            color: #999999;
          }
          .iconfont {
            font-size: 60rpx;
            margin-right: 20rpx;
          }
        }
        .read {
          padding: 20rpx 80rpx;
          border-radius: 40rpx;
          background-color: #fcc800;
          font-size: 32rpx;
          font-weight: 700;
        }
      }
    }
    .input {
      padding: 30rpx;
      margin: auto;
    }
  }
</style>
