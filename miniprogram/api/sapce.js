// 用户修改个人信息
export const getSpaceList = async () => {
  const res = await wx.cloud.callFunction({
    name: "getSpaceList",
  });
  return res;
};
