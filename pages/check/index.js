// pages/check/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal: "",
    siteData: [],
    checkbox: {},
    isComplete: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList(true);
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
  handleSearch(e) {
    this.setData({
      searchVal: e.detail,
    });
  },
  handleCheckbox(e) {
    let { no } = e.target.dataset;

    if(!no) {
      no = e.currentTarget.dataset.no || '';
    }

    if(no) {
      const checkbox = {
        ...this.data.checkbox,
        [no]: !this.data.checkbox[no]
      };

      const isCheckbox = Object.keys(checkbox).some(key => {
        return checkbox[key];
      })

      this.setData({
        checkbox,
        isCheckbox
      })
    }
  },
  handleTabs(e) {
    const { index } = e.detail || {};

    this.getList(index !== 1);
  },
  handleCopy(e) {
    const { no } = e.target.dataset || {};

    wx.setClipboardData({
      data: no,
      success: function () {
        // 添加下面的代码可以复写复制成功默认提示文本`内容已复制` 
        wx.hideToast();

        Toast('复制成功！');
      }
    })
  },
  getList(isSend) {
    this.setData({
      isComplete: false,
      siteData: [],
      checkbox: {}
    })

    setTimeout(() => {
      const data = isSend ? [{
        name: '站点之家',
        addr: '广东省广州市天河区石牌村25号',
        list: [{
          no: 'SF1309548419093',
          name: '顺丰快递',
          info: {
            addr: ['那然格市', '那然色布斯台音布拉格市'],
            name: ['小天', '小凡']
          },
          code: '9650',
          state: '今天到站',
          time: util.formatTime(new Date()),
          color: '#000'
        }],
        isCheckbox: false
      }] : []

      this.setData({
        isComplete: true,
        siteData: data
      })
    }, 1000)
  }
})