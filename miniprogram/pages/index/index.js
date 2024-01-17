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
    }
});
