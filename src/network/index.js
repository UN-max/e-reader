const { baseURL } = require('../common/const')

function request(options) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${baseURL}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {'Authorization': 'Bearer ' + uni.getStorageSync('userInfo').token},
      success: res => {
        if (res && res.statusCode !== 200) {
          if (options.url !== '/test' && options.url !== '/shelves') {
            uni.showToast({
              title: `${res.data}`,
              icon: 'error',
              mask: true
            })
          }
        }
        resolve(res)
      },
      fail: err => {
        uni.showToast({
          title: '请求接口失败',
          icon: 'error'
        })
        reject(err)
      }
    })
  })
}

function toast() {
  uni.showModal({
    title: '',
    content: '请先登录！',
    cancelColor: '#676767',
    confirmColor: '#fca000',
    confirmText: '去登录',
    success: res => {
      if (res.confirm) {
        uni.navigateTo({
          url: '/pages/login/index'
        })
      }
    }
  })
}

module.exports = {
  request,
  toast
}