// pages/space/index.js
import { getFoundRecord } from "../../api/space";
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
    this.getFoundRecordList();
  },

  /**
   * 获取失物记录
   */
  async getFoundRecordList() {
    const { data } = await getFoundRecord();
    this.setData({
      recordList: data
    });
    console.log(res);
  }
});
