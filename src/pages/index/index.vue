<template>
	<view class="content">
    <view class="search" @click="ClickSearch">
      <van-search shape="round" disabled placeholder="请输入搜索关键词" />
    </view>
    <view class="body">
      <swiper class="swiper" autoplay :circular="true">
        <swiper-item v-for="(item, index) in banners" :key="index" class="swiper-item">
          <image :src="item.url" mode="scaleToFill"></image>
        </swiper-item>
      </swiper>
      <view class="nav">
        <view class="nav-item" v-for="item in nav" :key="item.id" @click="handleClick(item.name)">
          <image :src="item.url" mode="widthFix"></image>
          <text>{{item.text}}</text>
          <view class="mask"></view>
        </view>
      </view>
			<Featured :featured="featured" />
			<view class="bg"></view>
			<Ranking :ranking="ranking" />
			<view class="bg"></view>
      <Recommend id="recommend" />
      <view id="guess" class="bg"></view>
			<GuessYouLike :guess="guess" />
    </view>
	</view>
</template>
<script>
  import Featured from './childComps/Featured.vue'
	import Ranking from './childComps/Ranking.vue'
	import Recommend from './childComps/Recommend.vue'
	import GuessYouLike from './childComps/GuessYouLike.vue'
	export default {
    components: {
			Featured,
			Ranking,
			Recommend,
      GuessYouLike
    },
		data() {
			return {
        banners: [],
        nav: [],
				featured: [],
				ranking: [],
        guess: [],
        pageNum: 0
			}
		},
		onLoad() {
      this.getDatas()
    },
    onPullDownRefresh() {
      setTimeout(() => {
        this.pageNum = 0

        this.getDatas()
        
        uni.stopPullDownRefresh()
      }, 1000)
    },
    onReachBottom() {
      this.pageNum++

      this.$request({
        url: `/home/guess/${this.pageNum}`
      }).then(res => this.guess.push(...res.data))
    },
		methods: {
      getDatas() {
        this.$request({
          url: '/home'
        }).then(res => {
          this.banners = res.data.statics.banners
          this.nav = res.data.statics.navs
          this.featured = res.data.featured
          this.ranking = res.data.ranking.slice(0, 8)
        })

        this.$request({
          url: `/home/guess/${this.pageNum}`
        }).then(res => this.guess = res.data)

      },
      ClickSearch () {
        uni.navigateTo({
          url: '/pages/search/index'
        })
      },
      handleClick (name) {
        if (name === 'recommend') {
          let selQuery = uni.createSelectorQuery();
          selQuery.select('#guess').boundingClientRect()
          selQuery.exec(res => {
            uni.pageScrollTo({
              scrollTop: res[0].top,
              duration: 300
            });
          })
        } else if (name === 'feature') {
          let selQuery = uni.createSelectorQuery();
          selQuery.select('#recommend').boundingClientRect()
          selQuery.exec(res => {
            uni.pageScrollTo({
              scrollTop: res[0].top,
              duration: 300
            });
          })
        } else if (name === 'ranking') {
          uni.navigateTo({
            url: '/pages/ranking/index'
          })
        } else {
          uni.switchTab({
            url: '/pages/categories/index'
          })
        }
      }
		}
	}
</script>

<style scoped lang="scss">
  .content {
    .search {
      width: 100vw;
      position: fixed;
      z-index: 2;
    }
    .body {
      .bg {
        width: calc(100vw - 40rpx);
        height: 20rpx;
        background-color: #f4f4f4;
        margin: 15rpx auto 0;
      }
      .swiper {
        width: calc(100% - 40rpx);
        height: 340rpx;
        padding: 108rpx 20rpx 0 20rpx;
        .swiper-item {
          border-radius: 20rpx;
          overflow: hidden;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .nav {
        display: flex;
        padding: 20rpx;
        .nav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          image {
            width: 30%;
          }
          text {
            font-size: 28rpx;
          }
          .mask {
            margin-top: -78rpx;
            background-color: #f3f4f6;
            width: calc(100% - 15rpx);
            height: 90rpx;
            border-radius: 20rpx;
            z-index: -1;
          }
        }
      }
    }
  }
</style>
