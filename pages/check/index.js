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
    isRefresher: true,
    isComplete: false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().init();
    }

    this.setData({
      isRefresher: true
    })
  },
  handleSearch(e) {
    this.setData({
      searchVal: e.detail,
    });
  },
  handleCheckbox(e) {
    let { no, index } = e.target.dataset;

    if(!no) {
      no = e.currentTarget.dataset.no || '';
    }

    if(!index && index !== 0) {
      index = e.currentTarget.dataset.index;
    }

    if(no && (index || index === 0)) {
      const checkbox = {
        ...this.data.checkbox,
        [no]: !this.data.checkbox[no]
      };

      const { isCheckbox } = (this.data.siteData[index] || {});
      const siteData = this.data.siteData;

      siteData[index] = {
        ...siteData[index],
        isCheckbox: !isCheckbox
      }

      this.setData({
        checkbox,
        siteData
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
  handlePickUp() {

  },
  getList(isSend, isAdd = false) {
    const siteData = this.data.siteData;
    this.setData({
      checkbox: {},
      ...(isAdd ? {
        isRefresher: true
      } : {})
    })

    const pr = new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = isSend ? new Array(Math.ceil(Math.random() * 10)).join(',').split(',').map((item, idx) => {
          return {
            name: '站点之家' + (idx + 1) +'号', 
            addr: '广东省广州市天河区石牌村' + Math.floor(Math.random() * 100) * (idx + 1) +'号',
            list: [{
              no: 'SF' + Math.floor(Math.random() * Date.now()),
              name: '顺丰快递',
              info: {
                addr: ['那然格市', '那然色布斯台音布拉格市'],
                name: ['小天', '小凡']
              },
              code: Math.floor(Math.random() * 9000 + 1000),
              state: '今天到站',
              time: util.formatTime(new Date()),
              color: '#000'
            }],
            isCheckbox: false
          }
        }) : []

        this.setData({
          ...(isAdd? {} : { isComplete: true, 
            isRefresher: false, }),
          siteData: isAdd ? [...siteData, ...data] : data
        })

        resolve();
      }, 1000)
    });

    return pr;
  },
  handleRefreshList() {
    this.getList(true)
  },
  handleLoadMoreList() {
    wx.showLoading({
      title: '加载中…'
    });

    this.getList(true, true).finally(() => {
      wx.hideLoading()
    });
  }
})