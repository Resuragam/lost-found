// pages/space/index.js
import { getFoundRecord, getLostRecord } from "../../api/space";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    recordList: [],
    defaultTabValue: "lost",
    tabValue: "lost",
    search: "",
    space: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options);
    const { tab, search, space } = options;
    if (tab === "lost") {
      this.setData({
        tabValue: "lost",
        search,
        space
      });
      this.getLostRecordList();
    } else {
      this.setData({
        tabValue: "found",
        search,
        space
      });
      this.getFoundRecordList();
    }
  },

  /**
   * 获取寻物记录
   */
  async getFoundRecordList() {
    const { data } = await getFoundRecord(this.data.space, this.data.search);
    console.log("获取失物记录", data);
    this.setData({
      recordList: data
    });
  },

  /**
   * 获取失物记录
   */
  async getLostRecordList() {
    const { data } = await getLostRecord(this.data.space, this.data.search);
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
