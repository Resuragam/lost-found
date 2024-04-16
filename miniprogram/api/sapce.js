// 用户修改个人信息
export const updateUserInfo = async (openId, nickname, fileId, phoneNumber) => {
  const res = await wx.cloud.callFunction({
    name: "updateUserInfo",
    data: {
      openId,
      nickname,
      fileId,
      phoneNumber
    }
  });
  return res.result;
};
