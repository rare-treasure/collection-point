// app.js
App({
  onThemeChange() {
    // 当用户改成暗黑模式，需要进行界面适配
  },
  onLaunch() {
    // 由于没有后端，使用checkSession检测是否登录，没有登录调用wx.login 拿到code，把code当成用户的登录标识，登陆了从本地存储取出code，并将其设置到globalData.token 上
    wx.checkSession({
      success: res => {
        // 登录未失效，可根据旧有的登录标识
      },
      fail() {
        // 重新登录
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log(res);
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
