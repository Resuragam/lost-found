// pages/my/bindSchool/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    college: "",
    studentNumber: ""
  },

  bindSchool() {
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
  }
});
