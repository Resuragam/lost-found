// pages/issuance/publishFound/index.js
Page({
  /**
   * 页面数据
   */
  data: {
    title: "",
    time: "",
    address: "",
    phoneNumber: "",
    desc: "",
    imageList: []
  },

  /**
   * 发布寻物信息
   */
  handlePublish() {
    console.log(this.data);
  }
});
