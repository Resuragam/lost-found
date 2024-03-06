// custom-tab-bar/index.js
// custom-tab-bar/index.ts
Component({
  //  组件的属性列表
  properties: {},
  //  组件的初始数据
  data: {
    value: 0,
    list: [
      {
        url: "/pages/index/index"
      },
      {
        url: "/pages/test/index"
      }
    ],
    visible: true
  },
  //  组件的方法列表
  methods: {
    onChange(e) {
      this.setData({ value: e.detail.value });
      wx.switchTab({
        url: this.data.list[e.detail.value].url
      });
    },
    init() {
      const page = getCurrentPages().pop();
      this.setData({
        value: this.data.list.findIndex(item => item.url === `/${page?.route}`)
      });
    },
    handleShowOverlay() {
      this.setData({
        visible: true
      });
    }
  }
});
