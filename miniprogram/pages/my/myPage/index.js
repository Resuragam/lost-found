// pages/my/myPage/index.js
Page({
    toInfo() {
      wx.navigateTo({
        url: '/pages/my/info/index',
      })
    },
    toFoundRecord() {
      wx.navigateTo({
        url: '/pages/my/foundRecord/index',
      })
    },
    toLostRecord() {
      wx.navigateTo({
        url: '/pages/my/lostRecord/index',
      })
    }
})