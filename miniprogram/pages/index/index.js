import { getSpaceList } from "../../api/space";
import { getFoundRecord, getLostRecord } from "../../api/space";
const app = getApp();
Page({
  data: {
    spaceList: [],
    lostRecordList: [],
    foundRecordList: []
  },
  async onShow() {
    wx.showLoading({
      title: "加载中..."
    });
    const queue = [
      this.initSpaceList(),
      this.getLostRecordList(),
      this.getFoundRecordList()
    ];
    this.getTabBar().init();
    await Promise.all(queue);
    wx.hideLoading();
  },
  async initSpaceList() {
    const res = await getSpaceList();
    console.log("[sapce list]", res.result.data);
    this.setData({
      spaceList: res.result.data
    });
  },
  toRangeSelect() {
    if (app.globalData.status !== 2) {
      return wx.showToast({
        title: "请先前往个人中心绑定学生信息",
        icon: "none"
      });
    }
    wx.navigateTo({
      url: "/pages/range/index"
    });
  },
  toSearchLost() {
    if (app.globalData.status !== 2) {
      return wx.showToast({
        title: "请先前往个人中心绑定学生信息",
        icon: "none"
      });
    }
    wx.navigateTo({
      url: "/pages/searchLost/index"
    });
  },
  toIssuancePublishFound() {
    if (app.globalData.status !== 2) {
      return wx.showToast({
        title: "请先前往个人中心绑定学生信息",
        icon: "none"
      });
    }
    wx.navigateTo({
      url: "/pages/issuance/publishFound/index"
    });
  },
  toIssuancePublishLost() {
    if (app.globalData.status !== 2) {
      return wx.showToast({
        title: "请先前往个人中心绑定学生信息",
        icon: "none"
      });
    }
    wx.navigateTo({
      url: "/pages/issuance/publishLost/index"
    });
  },
  toLostSpace() {
    if (app.globalData.status !== 2) {
      return wx.showToast({
        title: "请先前往个人中心绑定学生信息",
        icon: "none"
      });
    }
    wx.navigateTo({
      url: "/pages/space/index?tab=lost"
    });
  },
  toFoundSpace() {
    if (app.globalData.status !== 2) {
      return wx.showToast({
        title: "请先前往个人中心绑定学生信息",
        icon: "none"
      });
    }
    wx.navigateTo({
      url: "/pages/space/index?tab=found"
    });
  },
  toPublishLost() {
    if (app.globalData.status !== 2) {
      return wx.showToast({
        title: "请先前往个人中心绑定学生信息",
        icon: "none"
      });
    }
    wx.navigateTo({
      url: "/pages/issuance/publishLost/index"
    });
  },
  toPublishFound() {
    if (app.globalData.status !== 2) {
      return wx.showToast({
        title: "请先前往个人中心绑定学生信息",
        icon: "none"
      });
    }
    wx.navigateTo({
      url: "/pages/issuance/publishFound/index"
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
