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
  } ${dateObj.getDate()} ${dateObj.getFullYear()} at ${dateObj.getHours()}:${dateObj.getMinutes()}`

  if (dateObj.getHours() > 12) {
    return `${newDate}PM`
  } else {
    return `${newDate}AM`
  }
}

module.exports = convertDate
