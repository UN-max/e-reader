<template>
	<view class="content">
    <view class="title">
      <view class="recommend">
        <view class="line"></view>
        <h4>分类精选</h4>
      </view>
    </view>
    <van-tabs color="#fcc800" :ellipsis="false" @change="onChange">
      <van-tab v-for="item in categories" :key="item.id" :title="item.type">
        <view class="books">
          <view class="special" @click="handleClick(feature.id)">
            <image :src="feature.cover" :mode="widthFix" class="img">
            <view class="infos">
              <view class="top">
                <text class="name">{{feature.name}}</text>
                <view class="score">
                  <text class="num">{{feature.score}}</text>
                  <text>分</text>
                </view>
              </view>
              <view class="summary">{{feature.summary}}</view>
              <view class="author">{{feature.author}}</view>
            </view>
          </view>
          <view class="other">
            <view class="item" @click="handleClick(item1.id)" v-for="(item1, index) in recommend" :key="item1.id">
              <LazyLoad :src="item1.cover" :imgStyle="imgStyle" />
              <view class="titles">
                <text class="name">{{item1.name}}</text>
              </view>
            </view>
          </view>
        </view>
      </van-tab>
    </van-tabs>
	</view>
</template>
<script>
	export default {
    
		data() {
			return {
				categories: [],
        feature: {},
        recommend: [],
        imgStyle: 'width: 150rpx; height: 200rpx;'
			}
		},
		created() {
      this.$request({
        url: '/category'
      }).then(res => this.categories = res.data)
			this.$request({
        url: '/home/recommend/1'
      }).then(res => {
        this.feature = res.data[0]
        this.recommend = res.data.slice(1)
      })
		},
		methods: {
      handleClick (id) {
        uni.navigateTo({
          url: `/pages/detail/index?id=${id}`
        })
      },
      onChange(e) {
        const { index } = e.detail
        this.$request({
          url: `/home/recommend/${index+1}`
        }).then(res => {
          this.feature = res.data[0]
          this.recommend = res.data.slice(1)
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
      .recommend {
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
      box-sizing: border-box;
      margin: 20rpx;
      .special {
        display: flex;
        align-items: center;
        margin: 20rpx 0 0 15rpx;
        .img {
          flex: 2;
          width: 150rpx;
          height: 200rpx;
        }
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
      .other {
        display: flex;
        flex-wrap: wrap;
        .item {
          width: 25%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          overflow: hidden;
          margin-top: 30rpx;
          .titles {
            padding-top: 10rpx;
            .name {
              font-size: 32rpx;
            }
          }
        }
      }
    }
  }
</style>
