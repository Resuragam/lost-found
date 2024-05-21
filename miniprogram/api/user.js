// 获取用户 openid
export const getOpendId = async () => {
  const res = await wx.cloud.callFunction({
    name: "getOpenId"
  });
  return res.result.openid;
};

// 用户登录功能
export const login = async openId => {
  const res = await wx.cloud.callFunction({
    name: "login",
    data: {
      openId
    }
  });
  return res.result.data;
};

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

/**
 * 用户修改学院绑定信息
 * @param {string} openId 
 * @param {string} college 
 * @param {string} studentNumber 
 */
export const updateSchoolInfo = async (openId, college, studentNumber) => {
  const res = await wx.cloud.callFunction({
    name: "updateSchoolInfo",
    data: {
      openId,
      college,
      studentNumber,
    }
  });
  return res.result;
};

/**
 * 根据 openId 获取当前用户的发布失物记录
 * @param { string } openId 用户openId
 */
export const getUserLostRecord = async (openId) => {
  const res = await wx.cloud.callFunction({
    name: "getUserLostRecord",
    data: {
      openId
    }
  });
  return res.result;
}; 

/**
 * 根据 openId 获取当前用户的发布寻物记录
 * @param { string } openId 用户openId
 */
export const getUserFoundRecord = async (openId) => {
  const res = await wx.cloud.callFunction({
    name: "getUserFoundRecord",
    data: {
      openId
    }
  });
  return res.result;
}; 