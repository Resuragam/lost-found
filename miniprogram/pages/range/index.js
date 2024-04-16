// pages/range/index.js
import { getSpaceList } from '../../api/sapce'
Page({
  data: {
    checkedNum: 0,
    spaceList: [],
    checkedSpaceList: []
  },
  onSpaceTagStatusChange(e) {
    let { checkedNum, checkedSpaceList } = this.data
    const { checked } = e.detail
    const { space } = e.currentTarget.dataset
    if(checked) {
      checkedSpaceList.push(space)
      checkedNum = checkedNum + 1
    }else {
      checkedSpaceList = checkedSpaceList.filter(s => s!== space)
      checkedNum = checkedNum - 1
    }
    this.setData({
      checkedNum,
      checkedSpaceList,
    })
    console.log(checkedSpaceList, e)
  },
  onLoad() {
    this.initSpaceList()
  },
  async initSpaceList() {
    const res = await getSpaceList()
    this.setData({
      spaceList: res.result.data
    })
  },
  toSpace() {
    wx.navigateTo({
      url: `/pages/space/index?space=${this.data.checkedSpaceList}`,
    })
  }
});
