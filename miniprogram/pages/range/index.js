// pages/range/index.js
Page({
  data: {
    value: [0, 1],
    value1: [0, 1],
    checkedNum: 2
  },
  onChange1(e) {
    this.setData({ value1: e.detail.value });
  }
});
