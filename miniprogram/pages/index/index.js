import { getSpaceList } from '../../api/sapce'
Page({
  data: {
    spaceList: []
  },
  onShow() {
    this.getTabBar().init();
    this.initSpaceList()
  },
  async initSpaceList() {
    const res = await getSpaceList()
    console.log('[sapce list]', res.result.data)
    this.setData({
      spaceList: res.result.data
    })
  },
  toRangeSelect() {
    wx.navigateTo({
      url: "/pages/range/index"
    });
  },
  toSearchLost() {
    wx.navigateTo({
      url: "/pages/searchLost/index"
    });
  },
  toIssuancePublishFound() {
    wx.navigateTo({
      url: "/pages/issuance/publishFound/index"
    });
  },
  toIssuancePublishLost() {
    wx.navigateTo({
      url: "/pages/issuance/publishLost/index"
    });
  },
  toLostSpace() {
    wx.navigateTo({
      url: "/pages/space/index"
    });
  },
  toFoundSpace() {
    wx.navigateTo({
      url: "/pages/space/index"
    });
  }
});
