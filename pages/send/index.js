// pages/send/index.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: true,
    userInfo: app.globalData.userInfo,
    funcList: [{
      name: '我的包裹',
      iconName: 'package_active'
    }, {
      name: '寄件下单',
      iconName: 'sender'
    }, {
      name: '地址管理',
      iconName: 'addr'
    }]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    if(this.data.userInfo) {
      this.setData({
        'isLogin': false
      });
    }
  },
  getUserInfo(update) {
    if(!this.data.isLogin && !update) {
      return 
    }

    const self = this;

    function setUserInfo(userInfo) {
      self.setData({'userInfo': userInfo});
      self.setData({
        'isLogin': false
      });

      app.globalData.userInfo = userInfo;
      wx.setStorageSync('userInfo', userInfo);
    }

    // 已经授权，直接跟后台拿最新数据/使用缓存信息，没授权等用户授权在展示信息，不建议通过wx.login 拿到的code，去直接获取用户信息（之前授权过，但后面换手机或者删除了小程序）。
    wx.getSetting({
      withSubscriptions: true,
      success(res) {
        if(res.authSetting["scope.userInfo"] && !update) {
          const userInfo = wx.getStorageSync('userInfo');

          setUserInfo(userInfo)
        } else {
          wx.getUserProfile({
            desc: '登陆，获取用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
              setUserInfo(res.userInfo)
            },
            fail:(err) => {
              console.log(err);
            }
          })
        }
      },
    })
  },
  resetUserInfo() {
    this.getUserInfo(true)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handlePageChange(ev) {
    const { mode = '', url = '' } = ev.currentTarget.dataset || {};

    if(mode === 'switch') {
      wx.switchTab({
        url,
      })
    }
  }
})