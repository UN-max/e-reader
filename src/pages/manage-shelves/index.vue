<template>
  <view class="content">
    <view class="books">
      <van-checkbox-group :value="result">
        <view class="item" @click="toggle(item.id)" v-for="item in books" :key="item.id">
          <view class="book">
            <LazyLoad :src="item.cover" :imgStyle="imgStyle" />
            <view class="infos">
              <view class="name">{{item.name}}</view>
              <view class="author">{{item.author}}</view>
            </view>
          </view>
          <van-checkbox :name="item.id" checked-color="#fcc800"></van-checkbox>
        </view>
      </van-checkbox-group>
    </view>
    <view class="selects">
      <view class="content">
        <view class="all" v-show="!isAll" @click="selectAll">全选</view>
        <view class="cancel" v-show="isAll" @click="cancel">取消全选</view>
        <view class="del" @click="del" :class="{'empty': num(result) ? false : true}">删除({{num(result)}})</view>
      </view>
    </view>
	</view>
</template>
<script>

	export default {
    
    data() {
      return {
        books: [],
        result: [],
        imgStyle: 'flex: 1; width: 130rpx; height: 180rpx;'
      }
    },
		onLoad(options) {
      const { id } = options
      this.getBooks()
      this.toggle(id)
    },
    computed: {
      num() {
        return function(res) {
          return res.length
        }
      },
      isAll() {
        return this.num(this.result) === this.books.length ? true : false
      }
    },
    methods: {
      getBooks() {
        this.$request({
          url: '/shelves'
        }).then(res => this.books = res.data)
      },
      toggle(id) {
        const result = this.result.findIndex(item => item == id)
        if (result === -1) {
          this.result.push(id.toString())
        } else {
          this.result.splice(result, 1)
        }
      },
      selectAll() {
        const arr = this.books.map(item => item.id.toString())
        // 数组合并去重
        this.result = Array.from(new Set(this.result.concat(arr)))
      },
      cancel() {
        // 数组清空
        this.result = []
      },
      del() {
        if (this.result.length) {
          uni.showModal({
            title: '',
            content: '确定删除选书籍？',
            cancelColor: '#676767',
            confirmColor: '#fca000',
            success: res => {
              if (res.confirm) {
                this.result.forEach(item => {
                  const bookId = parseInt(item)
                  this.$request({
                    url: `/shelves/${bookId}`,
                    method: 'DELETE'
                  })
                })
                uni.showToast({
                  title: '删除成功',
                  icon: 'success'
                })
                this.getBooks()
                this.result = []
                this.showCheckBox = false
              }
            }
          })
        }
      }
    }
	}
</script>

<style scoped lang="scss">
  .content {
    .books {
      padding: 30rpx;
      .item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .book {
          flex: 1;
          display: flex;
          align-items: center;
          margin: 20rpx 0;
          .infos {
            flex: 4;
            padding-left: 30rpx;
            .name {
              font-weight: 700;
              margin-bottom: 20rpx;
            }
            .author {
              font-size: 28rpx;
              color: #787878;
            }
          }
        }
      }
    }
    .selects {
      height: 110rpx;
      .content {
        display: flex;
        position: fixed;
        bottom: 0;
        width: 100vw;
        height: 110rpx;
        line-height: 110rpx;
        text-align: center;
        color: #fca000;
        background-color: #fff;
        .all {
          flex: 1;
        }
        .cancel {
          flex: 1;
        }
        .del {
          flex: 1;
          &.empty {
            color: #f1d6a1
          }
        }
      }
    }
  }
</style>
