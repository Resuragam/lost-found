// 获取用户 openid 
export const getOpendId = async () => {
  const res = await wx.cloud.callFunction({
    name: "getOpenId"
  })
  return res.result.openid
}

// 用户登录功能
export const login = async (openId) => {
  const res = await wx.cloud.callFunction({
    name: "login",
    data: {
      openId
    }
  })
  return res.result.data
}