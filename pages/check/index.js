// pages/check/index.js
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';

const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchVal: "",
    siteData: [],
    checkbox: {},
    colors: {
      '顺丰快递': '#231F20',
      '圆通速递': '#47086C',
      '中通速递': '#1296db',
      '百世汇通': '#00253A',
      '申通快递': '#d81e06',
      '韵达快递': '#F5C51D',
    },
    activeTabIdx: 0,
    isRefresher: false,
    isComplete: false,
    isEndPage: false,
    isLoading: false
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

    this.setData({
      isRefresher: true,
      activeTabIdx: index,
      siteData: [],
      isComplete: false
    })
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
  handlePickUp(e) {
    const { all } = e.target.dataset;
    const isAll = all === '1';

    Dialog.confirm({
      title: '取件提醒',
      message: '是否要取出当前站点' + (!isAll ? '选中' : '全部') + '的快递？',
      zIndex: 99999
    }).then(() => {
      // 调接口
      // 接口成功后，手动匹配数据删除对应的订单

    })
  },
  handleRejection() {

  },
  getList(isAdd = false) {
    const siteData = this.data.siteData;
    this.setData({
      checkbox: {}
    })
    const isSend = this.data.activeTabIdx === 1;
    const expressNameList = Object.keys(this.data.colors);

    const pr = new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = !isSend ? new Array(3).join(',').split(',').map((item, idx) => {
          return {
            name: '站点之家' + (idx + 1) +'号', 
            addr: '广东省广州市天河区石牌村' + Math.floor(Math.random() * 100) * (idx + 1) +'号',
            list: new Array(10).join(',').split(',').map((sub, subIdx) => {
              const expressName = expressNameList[Math.floor(Math.random() * 5)];

              return {
                no: (expressName === '顺丰快递' ? 'SF' : '') + Math.floor(Math.random() * Date.now() * (subIdx + 1)),
                name: expressName,
                info: {
                  addr: ['那然格市', '那然色布斯台音布拉格市'],
                  name: ['小天', '小凡']
                },
                code: Math.floor(Math.random() * 9000 + 1000),
                state: '今天到站',
                time: util.formatTime(new Date()),
                color: this.data.colors[expressName] || ''
              }
            }),
            isCheckbox: false
          }
        }) : [];

        const { isRefresher, isComplete } = this.data;
        const isEndPage = Math.random() > 0.5;

        this.setData({
          ...(isRefresher ? {
            isRefresher: false
          } : {}),
          ...(!isComplete ? {
            isComplete: true
          } : {}),
          siteData: isAdd ? [...siteData, ...data] : data,
          isEndPage
        })

        resolve();
      }, 1000)
    });

    return pr;
  },
  handleRefreshList() {
    this.setData({
      isRefresher: true,
      isLoading: false
    })

    this.getList().finally(() => {
      this.setData({
        isLoading: true
      })
    })
  },
  handleLoadMoreList() {
    if(this.data.isEndPage) {
      return;
    }

    this.getList(true);
  }
})