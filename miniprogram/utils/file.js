/**
 * 上传文件到微信云托管对象存储
 * @param {*} file 微信本地文件，通过选择图片，聊天文件等接口获取
 * @param {*} path 对象存储路径，根路径直接填文件名，文件夹例子 test/文件名，不要 / 开头
 * @param {*} onCall 上传回调，文件上传过程监听，返回false时会中断上传
 */
export const uploadFile = (file, path, onCall = () => {}) => {
  return new Promise((resolve, reject) => {
    const task = wx.cloud.uploadFile({
      cloudPath: path,
      filePath: file,
      config: {
        env: "lost-found-1gt37wpb57342ea8" // 需要替换成自己的微信云托管环境ID
      },
      success: res => resolve(res.fileID),
      fail: e => {
        const info = e.toString();
        if (info.indexOf("abort") != -1) {
          reject(new Error("【文件上传失败】中断上传"));
        } else {
          reject(new Error("【文件上传失败】网络或其他错误"));
        }
      }
    });
    task.onProgressUpdate(res => {
      if (onCall(res) == false) {
        task.abort();
      }
    });
  });
};

/**
 * 删除微信云托管对象存储文件
 * @param {*} fileID 对象存储文件ID，可以是单个fileID，也可以是ID列表
 */
export const deleteFile = async fileID => {
  const list = typeof fileID === "string" ? [fileID] : fileID;
  return await wx.cloud.deleteFile({
    fileList: list,
    config: {
      env: "lost-found-1gt37wpb57342ea8" // 需要替换自己的环境ID
    }
  });
};
