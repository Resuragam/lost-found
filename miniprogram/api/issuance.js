/**
 * 用户发布丢失物品记录
 * @param {*} openId
 * @param {*} title 丢失物品记录标题
 * @param {*} lostTime 丢失物品时间
 * @param {*} address 丢失物品记录地址
 * @param {*} phoneNumber 丢失人联系方式
 * @param {*} desc 丢失物品详细描述
 * @param {*} imageFileList 丢失物品图片Id
 */
export const createLostRecord = async data => {
  const res = await wx.cloud.callFunction({
    name: "createLostRecord",
    data
  });
  return res.result;
};

/**
 * 用户发布物品招领记录
 * @param {*} openId
 * @param {*} title 物品招领记录标题
 * @param {*} foundTime 物品招领时间
 * @param {*} address 物品招领记录地址
 * @param {*} phoneNumber 招领人联系方式
 * @param {*} desc 物品详细描述
 * @param {*} imageFileList 物品图片Id
 */
export const createFoundRecord = async data => {
  const res = await wx.cloud.callFunction({
    name: "createFoundRecord",
    data
  });
  return res.result;
};
