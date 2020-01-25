function formateTime(value) {
  if (!value) {
    return null;
  }
  var d = new Date(value)

  var year = d.getFullYear()
  // 月份比较特殊， 0是一月11是12月
  var month = d.getMonth() + 1;
  month = month < 10 ? '0' + month : month
  var day = d.getDate()
  day = day < 10 ? '0' + day : day
  var hours = d.getHours()
  var mins = d.getMinutes()
  mins = mins < 10 ? '0' + mins : mins
  let time = year + '-' + month + '-' + day + ' ' + hours + ':' + mins
  return time;
}