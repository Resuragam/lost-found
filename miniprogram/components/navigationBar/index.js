// components/navigation-bar/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "失物招领"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuTop: app.globalData.menuTop,
    menuHeight: app.globalData.menuHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {},

  lifetimes: {
    attached: function () {
      console.log(this.data);
      console.log("app", app, app.globalData);
    }
  }
});
