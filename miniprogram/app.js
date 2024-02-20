// app.js
App({
  onLaunch: function () {
    // 导航栏数据初始化
    const systemInfo = wx.getSystemInfoSync();
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    this.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuTop = menuButtonInfo.top;
    this.globalData.menuHeight = menuButtonInfo.height;
    // 云函数环境初始化
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      });
    }
  },
  globalData: {
    navBarHeight: 0,
    menuRight: 0,
    menuTop: 0,
    menuHeight: 0,
  },
});
