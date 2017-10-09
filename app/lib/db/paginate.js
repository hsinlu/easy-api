const mongoose = require('mongoose')
const {
  Query
} = mongoose

/**
 * 分页
 *
 * @param {number|string} pageIndex 分页索引，必须可转换为数字
 * @param {number|string} pageSize 分页大小，必须可转换为数字
 *
 * @return {Object}
 * {
 *  objects:    数据列表
 *  total:      数据总条数
 *  pageIndex:  当前页索引
 *  pageSize:   分页大小
 *  hasNext:    是否还有下一页数据
 * }
 */
Query.prototype.paginate = async function (pageIndex = 1, pageSize = 15) {
  const objects = await this.skip((pageIndex - 1) * pageSize).limit(pageSize)
  const total = await this.model.count(this.getQuery())
  return {
    objects,
    total,
    pageIndex,
    pageSize,
    hasNext: total > (pageIndex * pageSize)
  }
}
