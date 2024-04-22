const { getUserLostRecord } = require("../../../api/user");

// pages/my/lostRecord/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lostRecordList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUserLostRecordList()
  },

  async getUserLostRecordList() {
    const openId = wx.getStorageSync("openId")
    const res = await getUserLostRecord(openId)
    if(res.code) {
      return wx.showToast({
        title: res.message,
      })
    }
    console.log(res)
    this.setData({
      lostRecordList: res.data
    })
  }
});
