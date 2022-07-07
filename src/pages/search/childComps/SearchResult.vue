<template>
  <view class="list" v-show="showList">
    <van-cell @click="handleSearch" center title-style="margin-left: 20rpx;" label="书名、作者、简介等">
      <view slot="icon">
        <view class="iconfont icon-sousuo1">&#xe625;</view>
      </view>
      <view slot="title">
        <view class="van-cell-text">搜索 <text class="wd">{{wd}}</text></view>
      </view>
    </van-cell>
    <view class="author">
      <van-cell icon="contact" v-for="item in searchList.authors" :key="item.id" @click="handleAuthor(item.author)" title-style="margin-left: 10rpx;">
        <view slot="title" style="display: flex;">
          <rich-text :nodes="reload(item.author)"></rich-text>
          <van-tag size="medium" color="#fcc800" text-color="#000" style="margin-left: 10rpx;">作者</van-tag>
        </view>
      </van-cell>
    </view>
    <view class="book">
      <van-cell v-for="item in searchList.books" :key="item.id" @click="handleBook(item.name)" icon="search" title-style="margin-left: 10rpx;">
        <view slot="title">
          <rich-text :nodes="reload(item.name)"></rich-text>
        </view>
      </van-cell>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      showList: {
        type: Boolean,
        default: false
      },
      searchList: {
        type: Object,
        default() {
          return {}
        }
      },
      wd: {
        type: String,
        default: ''
      }
    },
    methods: {
      reload(text) {
        return text.replace(this.wd, `<font style="color: #d81d1d">${this.wd}</font>`)
      },
      handleSearch() {
        this.$emit('search')
      },
      handleAuthor(author) {
        this.$emit('author',  author)
      },
      handleBook(name) {
        this.$emit('book', name)
      }
    }
  }
</script>

<style scoped lang="scss">
  .list {
    .icon-sousuo1 {
      font-size: 40rpx;
      color: black;
    }
    .wd {
      color: #d81d1d;
      margin-left: 10rpx;
    }
  }
</style>