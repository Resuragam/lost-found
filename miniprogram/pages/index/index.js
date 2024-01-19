Page({
    toRangeSelect() {
        wx.navigateTo({
            url: '/pages/range/index',
        });
    },
    toSearchLost() {
      wx.navigateTo({
        url: '/pages/searchLost/index',
      })
    },
    toIssuancePublishFound() {
      wx.navigateTo({
        url: '/pages/issuance/publishFound/index',
      })
    },
    toIssuancePublishLost() {
      wx.navigateTo({
        url: '/pages/issuance/publishLost/index',
      })
    },
    toFoundSpace() {
      wx.navigateTo({
        url: '/pages/space/index',
      })
    }
});
