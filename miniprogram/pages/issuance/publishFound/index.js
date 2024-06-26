import { createFoundRecord } from "../../../api/issuance";
import { uploadFile } from "../../../utils/file";
const filedKey = ['title', 'foundTime', 'address', 'phoneNumber', 'desc', 'imageList']
const filedKeyArrayMessage = {
  title: "请输入标题",
  foundTime: "请输入时间",
  address: "请输入位置信息",
  phoneNumber: "请输入联系方式",
  desc: "请输入物品描述信息",
  imageList: "请上传物品图片",
}
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
    imageFileList: [],
    timePickerVisible: false
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
    try {
      filedKey.forEach(key => {
        console.log(key, this.data[key])
        if(!this.data[key]) {
          throw new Error(filedKeyArrayMessage[key])
        }
        if(this.data[key] instanceof Array && !this.data[key].length) {
          throw new Error(filedKeyArrayMessage[key])
        }
      })
      wx.showLoading({
        title: "发布...",
        mask: true
      });
      console.log(this.data);
      await this.uploadImage();
      const res = await createFoundRecord({
        title: this.data.title,
        foundTime: this.data.foundTime,
        address: this.data.address,
        phoneNumber: this.data.phoneNumber,
        desc: this.data.desc,
        imageFileList: this.data.imageFileList,
        openId: wx.getStorageSync("openId")
      });
      if(res.code === 200) {
        getApp().globalData.foundTotal ++;
      }
      wx.hideLoading();
      wx.showToast({
        title: "发布成功",
        icon: "success",
        duration: 1000,
        mask: false,
        success() {
          wx.redirectTo({
            url: '/pages/space/index?tab=found',
          })
        }
      });
    }catch(err) {
      wx.showToast({
        title: err.message,
        icon: "none"
      })
    }
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
  },

  openTimePicker() {
    this.setData({
      timePickerVisible: true
    });
  },

  onConfirm(e) {
    const { value } = e?.detail;
    console.log("confirm", value);
    this.setData({
      foundTime: value
    });
    this.hidePicker();
  },

  hidePicker() {
    this.setData({
      timePickerVisible: false
    });
  }
});
