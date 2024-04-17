// pages/space/index.js
import { getFoundRecord, getLostRecord } from "../../api/space";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recordList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.getFoundRecordList();
    this.getLostRecordList();
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
      this.getLostRecordList();
    } else {
      this.getFoundRecordList();
    }
  }
});
