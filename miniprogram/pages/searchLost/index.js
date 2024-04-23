// pages/searchLost/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchHistoryRecordList: [],
    searchValue: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const record = wx.getStorageSync("searchHistoryRecordList");
    this.setData({
      searchHistoryRecordList: record
    });
  },

  toSearchLostRecord() {
    wx.navigateTo({
      url: "/pages/space/index?tab=lost",
      complete: result => {
        if (this.data.searchValue) {
          const recordList = Array.from(
            new Set([
              this.data.searchValue,
              ...this.data.searchHistoryRecordList
            ])
          );
          this.setData({
            searchHistoryRecordList: recordList
          });
          wx.setStorage({
            key: "searchHistoryRecordList",
            data: this.data.searchHistoryRecordList
          });
        }
      }
    });
  },

  onClickHistoryRecord(e) {
    this.toSearchLostRecord();
    this.setData({
      searchValue: e.currentTarget.dataset.search
    });
  }
});
