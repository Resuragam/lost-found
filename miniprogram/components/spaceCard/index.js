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
    title: {
      type: String,
      value: ""
    },
    imageList: {
      type: Array,
      value: ""
    },
    recordId: {
      type: String,
      value: null
    },
    isFound: {
      type: Boolean,
      value: false
    }
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
      const isFound = this.properties.isFound ? 1 : 0;
      wx.navigateTo({
        url: `/pages/detail/index?isFound=${isFound}&recordId=${this.properties.recordId}`
      });
    }
  }
});
