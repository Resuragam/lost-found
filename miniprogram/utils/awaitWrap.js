export const awaitWrap = (p, errMsg) => {
  return p.then((data) => [null, data]).catch(err => [err, null])
}