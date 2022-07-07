<template>
	<view class="content">
    <view class="title">
      <view class="ranking">
        <view class="line"></view>
        <h4>排行榜</h4>
      </view>
    </view>
    <view class="books">
      <view class="item" @click="handleClick(item.id)" v-for="(item, index) in ranking" :key="item.id">
        <LazyLoad :src="item.cover" :imgStyle="imgStyle" />
        <view class="infos">
					<view class="rank" v-if="index !== 0 && index !== 1 && index !== 2">{{index + 1}}</view>
					<view class="rank special" v-if="index === 0">
					  <image src="../../../static/img/uploads/one.png" mode="widthFix" class="image"></image>
					</view>
					<view class="rank special" v-if="index === 1">
					  <image src="../../../static/img/uploads/two.png" mode="widthFix" class="image"></image>
					</view>
					<view class="rank special" v-if="index === 2">
					  <image src="../../../static/img/uploads/three.png" mode="widthFix" class="image"></image>
					</view>
          <view class="titles">
						<text class="big-title">{{item.name}}</text>
						<text class="sub-title">{{item.type}}小说</text>
					</view>
        </view>
      </view>
    </view>
	</view>
</template>
<script>
	export default {
    
    props: {
      ranking: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        imgStyle: 'width: 100rpx; height: 130rpx;'
      }
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
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20rpx;
      .ranking {
        display: flex;
        align-items: center;
        .line {
          width: 10rpx;
          height: 40rpx;
          border-radius: 10rpx;
          background-color: #fcc800;
          margin-right: 15rpx;
        }
        h4 {
          font-size: 40rpx;
        }
      }
    }
    .books {
      box-sizing: border-box;
      display: flex;
      align-items: center;
			flex-wrap: wrap;
      .item {
				width: calc(50% - 20rpx);
				height: 200rpx;
        display: flex;
        align-items: center;
				overflow: hidden;
				margin-left: 20rpx;
        .infos {
					display: flex;
					.rank {
						flex: 2;
					  text-align: center;
					  color: #c5c5bd;
					  font-weight: 700;
					  margin: 0 10rpx;
					}
					.special {
						margin-top: -5rpx;
            .image {
              width: 45rpx;
            }
					}
          .titles {
						flex: 9;
						.big-title {
						  font-weight: 700;
						  display: -webkit-box; /*弹性伸缩盒子模型显示*/
						  -webkit-box-orient: vertical; /*排列方式*/ 
						  -webkit-line-clamp: 2; /*显示文本行数(这里控制多少行隐藏)*/
						  overflow: hidden; /*溢出隐藏*/
						  text-overflow: clip;
						  font-size: 30rpx;
						}
						.sub-title {
						  font-size: 26rpx;
						  color: #787878;
						}
					}
        }
      }
    }
  }
</style>

