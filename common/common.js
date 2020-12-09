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
// 归档时间格式 按月分
function formatData(data){
	var arr = [];
	data.forEach(function(item, i){
		var tmpDate = new Date(item.time);
		var month = tmpDate.getMonth() + 1;
		var year = tmpDate.getFullYear();
		var tmpMonth = tmpDate.getMonth() + 1;
		if(i === 0){
			var tmpObj = {};
			tmpObj.date = year + '年' + month + '月';
			tmpObj.data = [];
			tmpObj.data.push(item.time);
			arr.push(tmpObj);
		}else{
			if(arr[arr.length-1]['date'] === (year + '年' + month + '月')){
				arr[arr.length-1]['data'].push(item.time);
			}else{
				var tmpObj = {};
				tmpObj.date = year + '年' + month + '月';
				tmpObj.data = [];
				tmpObj.data.push(item.time);
				arr.push(tmpObj);
			}
		}

	});
	return arr;
}


function readFile_promise(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path, 'utf8', (err, data) => {
			if (data) {
				resolve(data);
			} else {
				reject(err)
			}
		})
	})
}
module.exports = {
  formateTime,
  formatData
}