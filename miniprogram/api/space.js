/**
 * 获取地区范围列表
 */
export const getSpaceList = async () => {
  const res = await wx.cloud.callFunction({
    name: "getSpaceList"
  });
  return res;
};

/**
 * 获取指定范围的地区寻物列表
 * @param { string } spaceList 地区列表
 * @param { string } search 搜索关键词
 */
export const getFoundRecord = async (spaceList, search) => {
  const res = await wx.cloud.callFunction({
    name: "getFoundRecord",
    data: {
      spaceList,
      search
    }
  });
  return res.result;
};

/**
 * 获取指定范围的地区失物列表
 * @param { string } spaceList 地区列表
 * @param { string } search 搜索关键词
 */
export const getLostRecord = async (spaceList, search) => {
  const res = await wx.cloud.callFunction({
    name: "getLostRecord",
    data: {
      spaceList,
      search
    }
  });
  return res.result;
};

/**
 * 获取指定失物详情
 * @param {*} recordId id
 */
export const getLostRecordDetail = async recordId => {
  const res = await wx.cloud.callFunction({
    name: "getLostRecordDetail",
    data: {
      recordId
    }
  });
  return res.result;
};

/**
 * 获取指定寻物详情
 * @param { string } recordId id
 */
export const getFoundRecordDetail = async recordId => {
  const res = await wx.cloud.callFunction({
    name: "getFoundRecordDetail",
    data: {
      recordId
    }
  });
  return res.result;
};
