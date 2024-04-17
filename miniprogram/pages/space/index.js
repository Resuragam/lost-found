// pages/space/index.js
import { getFoundRecord, getLostRecord } from "../../api/space";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recordList: [],
    defaultTabValue: "lost",
    tabValue: "lost"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    const { tab } = options;
    if (tab === "lost") {
      this.setData({
        tabValue: "lost"
      });
      this.getLostRecordList();
    } else {
      this.setData({
        tabValue: "found"
      });
      this.getFoundRecordList();
    }
  },

  /**
   * 获取寻物记录
   */
  async getFoundRecordList() {
    const { data } = await getFoundRecord();
    console.log("获取失物记录", data);
    this.setData({
      recordList: data
    });
  },

  /**
   * 获取失物记录
   */
  async getLostRecordList() {
    const { data } = await getLostRecord();
    console.log("获取失物记录", data);
    this.setData({
      recordList: data
    });
  },

  onTabChange(e) {
    console.log(e);
    const { detail } = e;
    if (detail.value === "lost") {
      this.setData({
        tabValue: "lost"
      });
      this.getLostRecordList();
    } else {
      this.setData({
        tabValue: "found"
      });
      this.getFoundRecordList();
    }
  }
});
