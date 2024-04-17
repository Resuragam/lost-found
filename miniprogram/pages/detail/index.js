import { getLostRecordDetail, getFoundRecordDetail } from "../../api/space";

// pages/detail/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 2,
    autoplay: true,
    duration: 500,
    interval: 5000,
    paginationPosition: "bottom",
    navigation: { type: "dots-bar" },

    title: "",
    imageFileList: [],
    desc: "",
    phoneNumber: "",
    address: "",
    time: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const { recordId, isFound } = options;
    console.log(typeof isFound);
    if (Number(isFound)) {
      this.initFoundRecordDetail(recordId);
    } else {
      this.initLostRecordDetail(recordId);
    }
  },

  async initLostRecordDetail(id) {
    const res = await getLostRecordDetail(id);
    const detail = res.data[0];
    console.log(detail);
    this.setData({
      address: detail.address,
      desc: detail.desc,
      imageFileList: detail.imageList,
      phoneNumber: detail.phoneNumber,
      time: detail.lostTime,
      title: detail.title
    });
  },

  async initFoundRecordDetail(id) {
    const res = await getFoundRecordDetail(id);
    const detail = res.data[0];
    console.log(detail);
    this.setData({
      address: detail.address,
      desc: detail.desc,
      imageFileList: detail.imageList,
      phoneNumber: detail.phoneNumber,
      time: detail.foundTime,
      title: detail.title
    });
  }
});
