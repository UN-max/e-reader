<template>
  <view>
    <scroll-view class="scroll" scroll-y="true" :scroll-top="scrollTop" :refresher-enabled="isLogin" :refresher-triggered="triggered"
      refresher-default-style="none" @refresherrefresh="onRefresh"
      @refresherrestore="onRestore" :style="{backgroundColor: backgroundColor, color: color}">
      <view class="refresh" slot="refresher">
        <view class="iconfont" v-if="!mark">&#xe610;</view>
        <view class="iconfont active" v-else>&#xe64d;</view>
      </view>
      <view>
        <van-skeleton row="21" :loading="loading">
          <view class="content"
            :style="{fontSize: fontSize + 'rpx', lineHeight: lineHeight +'rpx', backgroundColor: backgroundColor, color: color}"
            @click="handleClick" @touchstart="touchstart" @touchend="touchend">
            {{bookInfo.content}}
          </view>
        </van-skeleton>
      </view>
    </scroll-view>
    <ControlPanel ref="panel"></ControlPanel>
  </view>
</template>
<script>
  import { formatDate } from '../../utils/format'
  export default {
    provide() {
      return {
        root: this
      }
    },
    data() {
      return {
        bookId: null,
        isLogin: false,
        chapter: 1,
        chapters: [],
        bookInfo: {},
        fontSize: 32,
        lineHeight: 60,
        backgroundColor: '#f4e7c7',
        color: '#392a0b',
        touchStartX: 0, // 触屏起始点x  
        touchStartY: 0, // 触屏起始点y  
        loading: true,
        triggered: false, // 是否触发下拉
        mark: false, // 是否已添加为书签
        marks: [], // 书签列表
        marksInfo: [],
        scrollTop: 1
      }
    },
    onLoad(options) {
      this.isLogin = Object.keys(uni.getStorageSync('userInfo')).length === 0 ? false : true

      this.bookId = options.bookId
      this.chapter = options.chapter ? options.chapter : 1
      this.getContent(this.chapter)
      
      if (this.isLogin) {
        this.$request({
          url: `/bookmark/${this.bookId}`
        }).then(res => {
          this.marksInfo = res.data
          this.marks = this.marksInfo.map(item => item.num)
          this.mark = this.marks.includes(this.chapter) ? true : false
        })
      }
    },
    onReady() {
      uni.setNavigationBarColor({
        frontColor: "#000000",
        backgroundColor: "#f4e7c7"
      })
      this.loading = false
    },
    onUnload() {
      if (this.isLogin) {
        this.$request({
          url: `/history/${this.bookId}`,
          method: 'POST',
          data: {
            num: this.chapter,
            time: formatDate(new Date())
          }
        })
      }
    },
    methods: {
      onRefresh() {
        this.triggered = true
        this.$request({
          url: `/bookmark/${this.bookId}`,
          method: 'POST',
          data: {
            num: this.chapter
          }
        }).then(res => {
          if (res && res.statusCode === 200) {
            this.mark = res.data
            if (this.mark) {
              this.marks.push(this.chapter)
              uni.showToast({
                title: '添加书签成功',
                icon: 'success',
                mask: true
              })
            } else {
              this.marks.splice(this.marks.indexOf(this.chapter), 1)
              uni.showToast({
                title: '书签已移除',
                icon: 'success',
                mask: true
              })
            }
          }
          this.onRestore()
        })
      },
      onRestore() { //自定义下拉刷新被复位
        this.triggered = false; // 需要重置
      },
      getContent(chapter) {
        this.$request({
          url: `/books/${this.bookId}/directory/${chapter}`
        }).then(res => {
          this.bookInfo = res.data[0]
          this.chapter = this.bookInfo.chapterNum
          this.mark = this.marks.includes(this.chapter) ? true : false
          uni.setNavigationBarTitle({
            title: `${this.bookInfo.title}`
          })
          if (this.scrollTop) {
            this.scrollTop = 0
          } else {
            this.scrollTop = 1
          }
        })
      },
      handleClick() {
        this.$refs.panel.showPanel()
      },
      touchstart(e) {
        this.touchStartX = e.touches[0].clientX;
        this.touchStartY = e.touches[0].clientY;
      },
      touchend(e) {
        let deltaX = e.changedTouches[0].clientX - this.touchStartX;
        let deltaY = e.changedTouches[0].clientY - this.touchStartY;
        if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX >= 0) {
            this.last()
          } else {
            this.next()
          }
        }
      },
      last() {
        this.chapter -= 1
        if (this.chapter < this.chapters[0]) {
          uni.showToast({
            title: '前面没章节了',
            icon: 'error',
            mask: true
          })
        } else {
          if (this.chapters.indexOf(this.chapter) === -1) { // 没找到
            this.last()
          }
          this.getContent(this.chapter)
        }
      },
      next() {
        this.chapter += 1
        if (this.chapter > this.chapters[this.chapters.length - 1]) {
          uni.showToast({
            title: '全书完~',
            icon: 'error',
            mask: true
          })
        } else {
          if (this.chapters.indexOf(this.chapter) === -1) { // 没找到
            this.next()
          }
          this.getContent(this.chapter)
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .scroll {
    height: 100vh;

    .refresh {
      width: 100vw;
      height: 100rpx;
      line-height: 100rpx;
      text-align: right;
      margin-right: 60rpx;
      // background-color: #ccc;

      // background-color: transparent!important;
      .active {
        color: #eda63e !important;
      }
    }
  }

  .content {
    white-space: pre-wrap;
    padding: 0 20rpx 40rpx 20rpx;
  }
</style>