import { updateSchoolInfo } from "../../../api/user";
const app = getApp()
// pages/my/bindSchool/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    college: "",
    studentNumber: ""
  },

  onLoad() {
    this.setData({
      college: app.globalData.college,
      studentNumber: app.globalData.studentNumber
    })
  },

  async bindSchool() {
    if (!this.data.college) {
      return wx.showToast({
        title: "请输入学院信息",
        icon: "none"
      });
    }
    if (!this.data.studentNumber) {
      return wx.showToast({
        title: "请输入学号信息",
        icon: "none"
      });
    }
    wx.showLoading({
      title: '绑定中...',
    })
    const openId = wx.getStorageSync("openId");
    const res = await updateSchoolInfo(
      openId,
      this.data.college,
      this.data.studentNumber
    );
    if(res.code === 200) {
      app.globalData.college = this.data.college
      app.globalData.studentNumber = this.data.studentNumber
      wx.showToast({
        title: '绑定成功，正在审核中',
        icon: 'none',
        duration: 2000
      })
    }else {
      wx.showToast({
        title: '请稍后重试...',
        icon: 'error',
        duration: 2000
      })
    }
  }
});
