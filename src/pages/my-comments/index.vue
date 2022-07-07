<template>
	<view class="box">
    <van-skeleton row="20" title :loading="loading">
      <view class="comments">
        <view class="tabbar">动态（{{comments.length}}条）</view>
        <view class="comment" v-for="item in comments" :key="item.id">
          <view class="infos">
            <view class="user-infos">
              <image class="avatar" src="../../static/img/uploads/login.jpg"></image>
              <view class="name">{{item.nickname}}</view>
            </view>
            <view class="iconfont more" @click="edit(item.id, item.content)">&#xe605;</view>
          </view>
          <view class="content">
            <view class="text">{{item.content}}</view>
            <view class="book-info" @click="handleClick(item.id)">
              <LazyLoad :src="item.cover" :imgStyle="imgStyle" />
              <view class="others">
                <view class="name">{{item.name}}</view>
                <view class="author">{{item.author}} · {{item.type}}</view>
              </view>
            </view>
            <view class="time">{{format(item.time)}}</view>
          </view>
        </view>
        <view v-if="!comments.length">
          <van-empty
            class="custom-image"
            image="https://img.yzcdn.cn/vant/custom-empty-image.png"
            description="暂无书评"
          />
        </view>
      </view>
    </van-skeleton>
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
  </view>
</template>
<script>

  import { formatDate } from '../../utils/format'
	export default {
    
    data() {
      return {
        bookId: null,
        comments: [],
        loading: true,
        show: false,
        actions: [{name: '修改评论'}, {name: '删除评论'}],
        selectedCommentId: null,
        selectedComment: '',
        modify: false,
        imgStyle: 'flex: 1; width: 80rpx; height: 100rpx;'
      }
    },
		onLoad (options) {
      this.bookId = options.bookId

      this.getComments()
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
      handleClick(id) {
        uni.navigateTo({
          url: `/pages/detail/index?id=${id}`
        })
      },
      getComments() {
        this.$request({
          url: `/comment`
        }).then(res => this.comments = res.data)
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
      }
    }
	}
</script>

<style scoped lang="scss">
  .box {
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
          .book-info {
            display: flex;
            align-items: center;
            padding: 20rpx 30rpx;
            margin: 20rpx 0;
            background-color: #f8f8f8;
            .others {
              flex: 7;
              margin-left: 20rpx;
              .author {
                color: #979797;
                font-size: 30rpx;
                margin-top: 20rpx;
              }
            }
          }
          .time {
            text-align: right;
            color: #979797;
            font-size: 28rpx;
            margin-top: 20rpx;
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
