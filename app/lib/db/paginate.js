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
 *  list:       数据列表
 *  totalCount: 数据总条数
 *  pageIndex:  当前页索引
 *  pageSize:   分页大小
 *  hasNext:    是否还有下一页数据
 * }
 */
Query.prototype.paginate = async function (pageIndex = 1, pageSize = 15) {
  if (typeof pageIndex === 'string') pageIndex = parseInt(pageIndex)
  if (typeof pageSize === 'string') pageSize = parseInt(pageSize)

  let list = await this.skip((pageIndex - 1) * pageSize).limit(pageSize)
  let totalCount = await this.model.count(this.getQuery())

  let hasNext = totalCount > (pageIndex * pageSize)

  return {
    list,
    totalCount,
    pageIndex,
    pageSize,
    hasNext
  }
}
