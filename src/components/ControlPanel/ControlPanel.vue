<template>
  <view>
    <van-popup position="bottom" overlay-style="background-color: transparent;"
      custom-style="background-color: #333331;" :show="show" @close="onClose">
      <view class="pop" :class="{'show-setting': showSettings}">
        <ChangeChapter v-if="!showBrightness && !showSettings"></ChangeChapter>
        <Brightness v-if="showBrightness"></Brightness>
        <ReadSetting v-if="showSettings"></ReadSetting>
        <van-tabbar :active="active" @change="onTab" active-color="#e6a74c" inactive-color="#c5c5c5" :border="false">
          <van-tabbar-item icon="home-o">目录</van-tabbar-item>
          <van-tabbar-item>
            <view class="iconfont" slot="icon" v-if="!isDark">
              &#xe650;
            </view>
            <view v-if="!isDark">夜间</view>
            <view class="iconfont" slot="icon" v-if="isDark">
              &#xe672;
            </view>
            <view v-if="isDark">白天</view>
          </van-tabbar-item>
          <van-tabbar-item icon="bulb-o">亮度</van-tabbar-item>
          <van-tabbar-item icon="setting-o">阅读设置</van-tabbar-item>
        </van-tabbar>
      </view>
    </van-popup>
    <Directory></Directory>
  </view>
</template>

<script>
  import ChangeChapter from "./components/ChangeChapter.vue";
  import Brightness from './components/Brightness.vue'
  import ReadSetting from './components/ReadSetting';
  import Directory from "./components/Directory.vue";

  import { COLOR, THEME_MAP } from '../ControlPanel/constants';

  export default {
    components: {
      ChangeChapter,
      Brightness,
      ReadSetting,
      Directory
    },
    inject: ['root'],
    data() {
      return {
        active: null,
        show: false,
        showBrightness: false,
        showSettings: false,
        showDirectory: false,
        brightness: 0.2,
        isDark: false,
        selectTheme: 1, // 选择的主题
        tag: 'directory', // 显示目录还是书签
        COLOR,
        THEME_MAP
      }
    },
    provide() {
      return {
        panel: this,
      }
    },
    methods: {
      showPanel() {
        this.show = true
        this.active = null
        this.showBrightness = false
        this.showSettings = false
      },
      onClose() {
        this.show = false
      },
      onTab(e) {
        this.active = e.detail
        if (this.active === 0) {
          this.show = false
          this.showDirectory = true
          if (this.tag === 'mark') {
            this.toMark()
          }
          this.active = null
        } else if (this.active === 1) {
          this.active = null
          this.isDark = !this.isDark
          this.selectTheme = this.isDark ? 0 : 1
          if (this.isDark) {
            uni.setNavigationBarColor({
              frontColor: "#ffffff",
              backgroundColor: "#181818"
            })
            this.root.backgroundColor = '#181818'
            this.root.color = '#6b6b6b'
          } else {
            uni.setNavigationBarColor({
              frontColor: "#000000",
              backgroundColor: "#f4e7c7"
            })
            this.changeBackgroundColor(this.COLOR.ORANGE)
          }
        } else if (this.active === 2) {
          this.showSettings = false
          this.showBrightness = !this.showBrightness
          if (!this.showBrightness) {
            this.active = null
          }
        } else if (this.active === 3) {
          this.showBrightness = false
          this.showSettings = !this.showSettings
          if (!this.showSettings) {
            this.active = null
          }
        }
      },
      toMark() {
        this.tag = 'mark'
        this.$request({
          url: `/bookmark/${this.root.bookId}`
        }).then(res => this.root.marksInfo = res.data)
      },
      changeBackgroundColor(id) {
        this.isDark = false
        this.selectTheme = id
        this.root.backgroundColor = this.THEME_MAP[id].backgroundColor
        this.root.color = this.THEME_MAP[id].color
      
        uni.setNavigationBarColor({
          frontColor: [COLOR.BLACK, COLOR.BROWN].includes(id) ? "#ffffff" : "#000000",
          backgroundColor: `${this.root.backgroundColor}`
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .pop {
    height: 20vh;

    &.show-setting {
      height: 40vh;
    }
  }
</style>