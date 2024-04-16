import { createFoundRecord } from "../../../api/issuance";
import { uploadFile } from "../../../utils/file";

// pages/issuance/publishFound/index.js
Page({
  /**
   * 页面数据
   */
  data: {
    title: "",
    foundTime: "",
    address: "",
    phoneNumber: "",
    desc: "",
    imageList: [],
    imageFileList: []
  },

  /**
   * 监听上传图片
   */
  handleAddImage(e) {
    const { imageList } = this.data;
    const { files } = e.detail;

    // 方法1：选择完所有图片之后，统一上传，因此选择完就直接展示
    this.setData({
      imageList: [...imageList, ...files] // 此时设置了 fileList 之后才会展示选择的图片
    });
  },

  /**
   * 监听删除图片
   */
  handleRemoveImage(e) {
    const { index } = e.detail;
    const { imageList } = this.data;

    imageList.splice(index, 1);
    this.setData({
      imageList
    });
  },

  /**
   * 发布失物招领
   */
  async handlePublishRecord() {
    wx.showLoading({
      title: "发布...",
      mask: true
    });
    console.log(this.data);
    await this.uploadImage();
    await createFoundRecord({
      title: this.data.title,
      foundTime: this.data.foundTime,
      address: this.data.address,
      phoneNumber: this.data.phoneNumber,
      desc: this.data.desc,
      imageFileList: this.data.imageFileList
    });
    wx.hideLoading();
    wx.showToast({
      title: "发布成功",
      icon: "success",
      duration: 1000,
      mask: false
    });
  },

  /**
   * 上传多张图片
   */
  uploadImage: async function () {
    const { imageList } = this.data;
    const openId = wx.getStorageSync("openId");
    const taskQueue = [];

    console.log(imageList);
    for (let i = 0; i < imageList.length; i++) {
      taskQueue.push(
        uploadFile(imageList[i].url, `lost_record/${openId}_${Date.now()}`)
      );
    }
    const imageFileList = await Promise.all(taskQueue);
    this.setData({
      imageFileList
    });
  }
});
