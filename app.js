// app.js
App({
  onThemeChange() {
    // 当用户改成暗黑模式，需要进行界面适配
  },
  onLaunch() {
    // 检测token, 是否存在，不存在直接调用登录，存在则使用checkSession检测是否登录（由于没有后端），没有登录调用wx.login 拿到code，把code当成用户的登录标识，登陆了从本地存储取出code，并将其设置到 globalData.token 上
    const token = wx.getStorageSync('token');
    
    if(token) {
      const that = this;
      wx.checkSession({
        success: () => {
          // 登录未失效，可根据旧有的登录标识
          this.globalData.token = token;
        },
        fail() {
          // 重新登录
          that.login();
        }
      })
    } else {
      this.login();
    }
  },
  login() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.setStorageSync('token', res.code);

        this.globalData.token = res.code;
      },
      fail(err) {
        console.error('登录出错了！', err);
      }
    })
  },
  globalData: {
    token: '',
    userInfo: wx.getStorageSync('userInfo') || null
  }
})
