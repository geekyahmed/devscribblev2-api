const convertDate = () => {
  let month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]

  const dateObj = new Date()

  var newDate = `${
    month[dateObj.getMonth()]
  } ${dateObj.getDate()} ${dateObj.getFullYear()}`

  return newDate
}

module.exports = convertDate
