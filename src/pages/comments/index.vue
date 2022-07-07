<template>
	<view class="box">
    <van-skeleton row="15" :loading="loading">
      <view class="books">
        <image :src="bookInfo.cover" class="image"></image>
        <view class="infos">
          <view class="bookname">{{bookInfo.name}}</view>
          <view class="author">{{bookInfo.author}}</view>
        </view>
        <view class="read" @click="read">立即免费阅读</view>
      </view>
      <view class="score">
        <view class="num">{{bookInfo.score}}<text class="label">分</text></view>
        <view class="bar">
          <view class="item" v-for="item in reviews" :key="item.id">
            <text>{{item.text}}</text>
            <van-progress :show-pivot="false" color="#fcc800" :percentage="item.num" style="width: 45vw; margin-left: 10rpx;" />
          </view>
        </view>
      </view>
      <view class="rate">
        <text>评价本书：</text>
        <van-rate
          :value="rate"
          allow-half
          color="#ffd21e"
          void-color="#eee"
          size="24"
          @change="changeRate"
        />
      </view>
      <view class="bg"></view>
      <view class="comments">
        <view class="tabbar">书评（{{comments.length}}条）</view>
        <view class="comment" v-for="item in comments" :key="item.id">
          <view class="infos">
            <view class="user-infos">
              <image class="avatar" src="../../static/img/uploads/login.jpg"></image>
              <view class="name">{{item.name}}</view>
            </view>
            <view class="iconfont more" @click="edit(item.id, item.content)">&#xe605;</view>
          </view>
          <view class="content">
            <view class="text">{{item.content}}</view>
            <view class="time">{{format(item.time)}}</view>
          </view>
        </view>
        <view v-if="!comments.length">
          <van-empty
            class="custom-image"
            image="https://img.yzcdn.cn/vant/custom-empty-image.png"
            description="本书暂无书评，快来踩沙发吧~"
          />
        </view>
      </view>
    </van-skeleton>
    <view class="footer">
      <view class="content">
        <view class="write" @click="write">发表对本书的看法...</view>
      </view>
    </view>
    <van-action-sheet
      :show="show"
      :actions="actions"
      cancel-text="取消"
      @close="onClose"
      @cancel="onClose"
      @select="onSelect"
    />
    <van-dialog
      use-slot
      title="修改评论"
      :show="modify"
      show-cancel-button
      @close="closeModify"
      @confirm="confirmModify"
    >
      <textarea v-model="selectedComment" @input="onChange" autofocus class="input" />
    </van-dialog>
    <van-dialog
      use-slot
      title="写书评"
      confirmButtonText="发表"
      :show="add"
      show-cancel-button
      @close="closeAdd"
      @confirm="confirmAdd"
    >
      <textarea v-model="currentComment" @input="onAddChange" placeholder="请尊重他人，友好评论" autofocus class="input" />
    </van-dialog>
  </view>
</template>
<script>
import { formatDate } from '../../utils/format'
	export default {
    data() {
      return {
        bookId: null,
        comments: [],
        bookInfo: null,
        loading: true,
        show: false,
        actions: [{name: '修改评论'}, {name: '删除评论'}],
        selectedCommentId: null,
        selectedComment: '',
        modify: false,
        currentComment: '',
        add: false,
        rate: 0,
        reviews: null
      }
    },
		onLoad (options) {
      this.bookId = options.bookId
      this.getComments()

      this.$request({
        url: `/rate/${this.bookId}`
      }).then(res => this.rate = res.data / 2)

      this.$request({
        url: `/rate/calc/${this.bookId}`
      }).then(res => this.reviews = res.data)

      if (options.flag) {
        this.write()
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
          url: `/books/${this.bookId}`
        }).then(res => this.bookInfo = res.data[0])
        this.$request({
          url: `/comment/${this.bookId}`
        }).then(res => this.comments = res.data)
      },
      read() {
        this.$request({
          url: `/history/${this.bookId}`
        }).then(res => {
          uni.navigateTo({
            url: `/pages/reader/index?bookId=${this.bookId}&chapter=${res.data.length ? res.data[0].num : 1}`
          })
        })
      },
      edit(id, content) {
        this.show = true
        this.selectedCommentId = id
        this.selectedComment = content
      },
      onClose() {
        this.show = false
      },
      onSelect(e) {
        if (e.detail.name === "修改评论") {
          this.show = false
          this.modify = true
        } else {
          uni.showModal({
            title: '',
            content: '确定要删除这条评论吗？',
            cancelColor: '#676767',
            confirmColor: '#fca000',
            success: res => {
              if (res.confirm) {
                this.$request({
                  url: `/comment/${this.selectedCommentId}`,
                  method: 'DELETE'
                }).then(res => {
                  if (res && res.statusCode === 200) {
                    uni.showToast({
                      title: '删除成功',
                      icon: 'success'
                    })
                    this.getComments()
                  }
                })
              }
            }
          })
        }
      },
      onChange(e) {
        this.selectedComment = e.detail.value
      },
      closeModify() {
        this.modify = false
      },
      confirmModify() {
        this.$request({
          url: `/comment/${this.selectedCommentId}`,
          method: 'POST',
          data: {
            content: this.selectedComment
          }
        }).then(res => {
          if (res && res.statusCode === 200) {
            uni.showToast({
              title: '修改成功',
              icon: 'success'
            })
            this.getComments()
          }
        })
        this.modify = false
      },
      write() {
        this.add = true
      },
      onAddChange(e) {
        this.currentComment = e.detail.value
      },
      closeAdd() {
        this.add = false
        this.currentComment = ''
      },
      confirmAdd() {
        if (!this.currentComment.trim()) {
          uni.showToast({
            title: '评论内容不能为空！',
            icon: 'error'
          })
        } else {
          this.$request({
            url: '/comment',
            method: 'POST',
            data: {
              bookId: this.bookId,
              content: this.currentComment
            }
          }).then(res => {
            if (res && res.statusCode === 200) {
              uni.showToast({
                title: '评论成功',
                icon: 'success'
              })
              this.getComments()
            }
          })
          this.add = false
          this.currentComment = ''
        }
      },
      changeRate(e) {
        this.rate = e.detail
        this.$request({
          url: `/rate/${this.bookId}`,
          method: 'POST',
          data: {
            score: this.rate * 2
          }
        }).then(res => this.bookInfo.score = res.data)
        this.$request({
          url: `/rate/calc/${this.bookId}`
        }).then(res => this.reviews = res.data)
      }
    }
	}
</script>

<style scoped lang="scss">
  .box {
    .bg {
      height: 15rpx;
      background-color: #f4f4f4;
      margin: 15rpx auto 0;
    }
    .books {
      display: flex;
      padding: 20rpx 40rpx 5rpx;
      .image {
        flex: 3;
        width: 120rpx;
        height: 150rpx;
      }
      .infos {
        flex: 7;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin: 0 40rpx 0 20rpx;
        .bookname {
          font-size: 34rpx;
        }
        .author {
          font-size: 30rpx;
          color: #979797;
        }
      }
      .read {
        flex: 6;
        align-self: flex-end;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        padding: 0 20rpx;
        border-radius: 40rpx;
        background-color: #fcc800;
        font-size: 32rpx;
      }
    }
    .score {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 20rpx 40rpx;
      .num {
        flex: 1;
        font-size: 50rpx;
        font-weight: 700;
        .label {
          font-size: 32rpx;
          font-weight: normal;
          margin-left: 10rpx;
        }
      }
      .bar {
        flex: 2;
        text-align: right;
        .item {
          display: flex;
          align-items: center;
          font-size: 28rpx;
          color: #979797;
          &:nth-child(-n + 2) {
            margin-left: 1em;
          }
        }
      }
    }
    .rate {
      padding: 0 40rpx 20rpx;
      font-size: 30rpx;
      color: #615d5d;
    }
    .comments {
      .tabbar {
        padding: 20rpx 40rpx;
        color: #000;
        font-size: 36rpx;
        font-weight: 700;
      }
      .comment {
        padding: 20rpx 40rpx;
        border-bottom: 1px solid #eee;
        .infos {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .user-infos {
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
          .more {
            font-size: 40rpx;
          }
        }
        .content {
          font-size: 34rpx;
          margin-top: 20rpx;
          .time {
            text-align: right;
            color: #979797;
            font-size: 28rpx;
            margin-top: 20rpx;
          }
        }
      }
    }
    .footer {
      height: 120rpx;
      .content {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 120rpx;
        text-align: center;
        color: #3b3838;
        border-top: 1px solid #eee;
        background-color: #fff;
        .write {
          width: 90vw;
          height: 80rpx;
          line-height: 80rpx;
          font-size: 32rpx;
          border-radius: 60rpx;
          background-color: #f6f6f6;
          &::before {
            content: '\e608';
            font-family: 'iconfont';
            color: #615d5d;
            margin-right: 10rpx;
          }
        }
      }
    }
    .input {
      padding: 30rpx;
      margin: auto;
    }
  }
</style>
