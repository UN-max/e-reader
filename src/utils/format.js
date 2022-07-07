const formatDate = time => {
  const year = time.getFullYear() + '-'
  const month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1
  const date = time.getDate() < 10 ? '-0' + time.getDate() : '-' + time.getDate()
  const hours = time.getHours() < 10 ? ' 0' + time.getHours() : ' ' + time.getHours()
  const minutes = time.getMinutes() < 10 ? ':0' + time.getMinutes() : ':' + time.getMinutes()
  const seconds = time.getSeconds() < 10 ? ':0' + time.getSeconds() : ':' + time.getSeconds()
  return year + month + date + hours + minutes + seconds
}

export {
  formatDate
}