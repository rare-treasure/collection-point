// pages/tab-bar/tabbar.js
import tabBarConf from '../config/tab-bar';

Component({
  /**
   * 组件的初始数据
   */
  data: {
    otherConfList: tabBarConf.list,
    pageList: tabBarConf.list.map(item => item.wxmlPath || ''),
    iconPath: tabBarConf.iconPath,
    active: 0
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      if(this.data.active !== event.detail) {
        const url = '/' + this.data.pageList[event.detail];

        wx.switchTab({
          url,
        });

        this.setData({ active: event.detail });
      }
    },
    // 在tab页中show生命周期，通过getTabBar() 进行调用
    init() {
      const page = getCurrentPages().pop();
      const idx = this.data.pageList.findIndex(pageUrl => pageUrl === `${page.route}`);

      if(idx >= 0) {
        this.setData({
      　  active: idx
        });
      }
    }
  }
})
