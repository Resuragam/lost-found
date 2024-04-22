import { getUserFoundRecord } from "../../../api/user";

// pages/my/foundRecord/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    foundRecordList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserFoundRecordList()
  },

  async getUserFoundRecordList() {
    const openId = wx.getStorageSync("openId")
    const res = await getUserFoundRecord(openId)
    if(res.code) {
      return wx.showToast({
        title: res.message,
      })
    }
    console.log(res)
    this.setData({
      foundRecordList: res.data
    })
  }
});
