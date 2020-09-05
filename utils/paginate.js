const paginate = (req, res, data) => {
  const page = parseInt(req.query.page, 10) || 1
  const limit = parseInt(req.query.limit, 10) || 12
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = data.length
  const totalPage = Math.ceil(total / limit)

  if (parseInt(req.query.limit) !== 0) {
    data = data.slice(startIndex, endIndex)
  }

  const paginatedData = {}

  if (endIndex < total) {
    paginatedData.next = {
      page: page + 1,
      limit
    }
  }
  if (parseInt(req.query.limit) !== 0) {
    res.status(200).json({
      status: 'success',
      count: data.length,
      totalPage,
      paginatedData,
      data: data
    })
  } else {
    res.status(200).json({
      status: 'success',
      data: data
    })
  }
}

module.exports = paginate
