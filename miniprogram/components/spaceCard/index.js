// components/spaceCard/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    nickname: {
      type: String,
      value: ""
    },
    avatar: {
      type: String,
      value: ""
    },
    address: {
      type: String,
      value: ""
    },
    imageList: {
      type: Array,
      value: ""
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail: function () {
      wx.navigateTo({
        url: "/pages/detail/index"
      });
    }
  }
});
