/**
 * @description 获取正确的路经
 * @param {String} path  数据
 */
export function getNormalPath(path: string) {
  if (path.length === 0 || !path || path == 'undefined') {
      return path
  }
  const newPath = path.replace('//', '/')
  const length = newPath.length
  if (newPath[length - 1] === '/') {
      return newPath.slice(0, length - 1)
  }
  return newPath
}
