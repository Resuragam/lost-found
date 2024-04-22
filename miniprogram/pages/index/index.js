import { getSpaceList } from "../../api/space";
import { getFoundRecord, getLostRecord } from "../../api/space";
Page({
  data: {
    spaceList: [],
    lostRecordList: [],
    foundRecordList: []
  },
  onShow() {
    this.getTabBar().init();
    this.initSpaceList();
    this.getLostRecordList();
    this.getFoundRecordList();
  },
  async initSpaceList() {
    const res = await getSpaceList();
    console.log("[sapce list]", res.result.data);
    this.setData({
      spaceList: res.result.data
    });
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
      url: "/pages/space/index?tab=lost"
    });
  },
  toFoundSpace() {
    wx.navigateTo({
      url: "/pages/space/index?tab=found"
    });
  },
  /**
   * 获取寻物记录
   */
  async getFoundRecordList() {
    const { data } = await getFoundRecord();
    console.log("获取寻物记录", data);
    this.setData({
      foundRecordList: data
    });
  },
  /**
   * 获取失物记录
   */
  async getLostRecordList() {
    const { data } = await getLostRecord();
    console.log("获取失物记录", data);
    this.setData({
      lostRecordList: data
    });
  }
});
