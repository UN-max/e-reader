<template>
  <view class="main">
    <van-search
      :value="value"
      focus
      shape="round"
      placeholder="请输入搜索关键词"
      use-action-slot
      @change="onChange"
      @search="onSearch"
    >
      <view slot="action" @tap="onClick">搜索</view>
    </van-search>
    <SearchResult :wd="value" :showList="showList" :searchList="searchList" @search="handleSearch" @author="handleAuthor" @book="handleBook"></SearchResult>
    <swiper class="wrapper" v-show="!showList">
      <swiper-item>
        <scroll-view class="scroll" :scroll-y="true">
          <SearchList
            :hotSearch="hotSearch"
            :historySearch="historySearch"
            :booksList="booksList"
            @del="handleDel"
            @search="handleHistorySearch" />
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
  import SearchList from './childComps/SearchList.vue'
  import SearchResult from './childComps/SearchResult.vue'

  import debounce from '../../utils/debounce'

	export default {
    components: {
      SearchList,
      SearchResult
    },
		data() {
			return {
        value: '',
        hotSearch: [],
        historySearch: [],
        booksList: [],
        searchList: {},
        showList: false
			}
		},
    onLoad() {
      this.$request({
        url: '/search/hot'
      }).then(res => this.hotSearch = res.data)
      
      this.$request({
        url: '/search/ranking'
      }).then(res => this.booksList = res.data)
      
    },
    onShow() {
      this.$request({
        url: '/search/history'
      }).then(res => this.historySearch = res.data)
    },
		methods: {
      // 初略搜索（只需要展示作者信息或书名即可）
      onChange: debounce(function (e) {
        this.value = e.detail
        if (this.value !== '') {
          this.showList = true
          this.$request({
            url: `/search/baseinfo?wd=${this.value}`
          }).then(res => this.searchList = res.data)
        } else {
          this.showList = false
        }
      }),
      // 详细搜索（需要展示详细信息）
      onSearch() {
        if (this.value !== '') {
          uni.navigateTo({
            url: `/pages/search-list/index?wd=${this.value}`
          })
        }
      },
      onClick() {
        if (this.value !== '') {
          uni.navigateTo({
            url: `/pages/search-list/index?wd=${this.value}`
          })
        }
      },
      handleDel () {
        uni.showModal({
          title: '',
          content: '确定删除所有搜索历史？',
          cancelColor: '#676767',
          confirmColor: '#fca000',
          success: res => {
            if (res.confirm) {
              this.$request({
                url: '/search',
                method: 'DELETE'
              }).then(res => this.historySearch = res.data)
            }
          }
        })
      },
      handleSearch() {
        uni.navigateTo({
          url: `/pages/search-list/index?wd=${this.value}`
        })
      },
      handleAuthor(author) {
        uni.navigateTo({
          url: `/pages/search-list/index?wd=${author}`
        })
      },
      handleBook(name) {
        uni.navigateTo({
          url: `/pages/search-list/index?wd=${name}`
        })
      },
      handleHistorySearch(value) {
        uni.navigateTo({
          url: `/pages/search-list/index?wd=${value}`
        })
      }
		}
	}
</script>

<style scoped lang="scss">
  .main {
    .list {
      .icon-sousuo1 {
        font-size: 40rpx;
        color: black;
      }
    }
    .wrapper {
      height: calc(100vh - 100rpx);
      .scroll {
        height: calc(100vh - 100rpx);
        overflow: scroll;
      }
    }
  }
</style>
