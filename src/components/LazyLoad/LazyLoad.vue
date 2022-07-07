<template>
  <image :src="imageSrc" :mode="mode" :class="className" :style="imgStyle"></image>
</template>

<script>
  export default {
    name: 'LazyLoad',
    props: {
      src: {
        type: String,
        default: ''
      },
      mode: {
        type: String,
        default: 'aspectFit'
      },
      imgStyle: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        imageSrc: require('@/static/img/lazy.png'),
        className: 'img-' + this.getGUID()
      };
    },
    mounted() {
      this.handleObserve()
    },
    methods: {
      handleObserve() {
        const observer = uni.createIntersectionObserver(this).relativeToViewport()
        observer.observe(`.${this.className}`, (res) => {
          if (res.intersectionRatio > 0) {
            this.imageSrc = this.src
            observer.disconnect()
          }
        })
      },
      getGUID() { // 全局唯一标识符
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = (Math.random() * 16) | 0;
          const v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        })
      }
    }
  }
</script>

<style scoped>

</style>