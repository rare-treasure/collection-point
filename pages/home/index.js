// pages/use/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgHeight: '64rpx',
    imgFit: 'heightFix'
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init();
    }
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