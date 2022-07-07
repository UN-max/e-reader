<template>
	<view class="content">
    <view class="title">
      <view class="featured">
        <view class="line"></view>
        <h4>主编力荐</h4>
      </view>
      <view class="label">
      	<view class="item">
          <image src="../../../static/img/uploads/best.png" mode="widthFix" class="img"></image>
          <text>品质</text>
        </view>
      	<view class="item">
          <image src="../../../static/img/uploads/best.png" mode="widthFix" class="img"></image>
          <text>人气</text>
        </view>
      </view>
    </view>
    <view class="books">
      <view class="item" @click="handleClick(item.id)" v-for="item in featured" :key="item.id">
        <image :src="item.cover" class="img"></image>
        <view class="titles">
          <text class="big-title">{{item.name}}</text>
          <text class="sub-title">{{item.type}}小说</text>
        </view>
      </view>
    </view>
	</view>
</template>
<script>
	export default {
    props: {
      featured: {
        type: Array,
        default() {
          return []
        }
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
      .featured {
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
      .label {
        display: flex;
        .item {
          display: flex;
          margin-left: 20rpx;
          font-size: 28rpx;
          .img {
            width: 30rpx;
            margin-right: 10rpx;
          }
        }
      }
    }
    .books {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      .item {
        flex: 1;
        height: 400rpx;
        display: flex;
				flex-direction: column;
				justify-content: center;
        align-items: center;
				overflow: hidden;
        .img {
          width: 200rpx;
        }
        .titles {
					margin-top: 20rpx;
          text-align: center;
          .big-title {
            font-weight: 700;
            display: -webkit-box; /*弹性伸缩盒子模型显示*/
            -webkit-box-orient: vertical; /*排列方式*/ 
            -webkit-line-clamp: 1; /*显示文本行数(这里控制多少行隐藏)*/
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
</style>
