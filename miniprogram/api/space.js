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
 * @param {*} spaceList 地区列表
 */
export const getFoundRecord = async spaceList => {
  const res = await wx.cloud.callFunction({
    name: "getFoundRecord",
    data: {
      spaceList
    }
  });
  return res.result;
};

/**
 * 获取指定范围的地区失物列表
 * @param {*} spaceList 地区列表
 */
export const getLostRecord = async spaceList => {
  const res = await wx.cloud.callFunction({
    name: "getLostRecord",
    data: {
      spaceList
    }
  });
  return res.result;
};
