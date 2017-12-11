featureCommon= {
	getGender: function (code) {
		return code == 1 ? '男':
				code == 2 ? '女':
							'未知';
	},
	//证照审核和证照查询中显示图片
	getImgs: function (urlStr, titleStr) {
		var imgTitleArr = titleStr.split(',');
		var imgArr = urlStr.split(',');
		var html = '';
		for(var i = 0; i < imgArr.length; i++) {
			html += '<img src="'+ imgArr[i] +'" title="'+ imgTitleArr[i] +'" alt="'+ imgTitleArr[i] +'" />';
		}
		return html;
	},
	//转换时间格式  2017/11/12 0:00:00  -->  2017-11-12
	formatDate: function (date, year){
		if(!date) return '';
		date = new Date(date);
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		
		month = month<10 ? '0'+month: month;
		day = day<10 ? '0'+day: day;
		if(year) {
			return ''+ year +'年'+ month +'月'+ day+ '日'; 
		}
		return ''+ year +'-'+ month +'-'+ day;
	},
	formatTime: function (date, toSec){
		if(!date) return ''; 
		var YMD = this.formatDate(date);
		date = new Date(date);
		var hour = date.getHours();
		var min = date.getMinutes();
		
		hour = hour<10 ? '0'+hour : hour;
		min = min <10 ? '0'+min : min;
		
		var time = YMD + ' ' + hour + ':' + min;
		
		if(toSec) {
			var sec = date.getSeconds();
			sec = sec < 10 ? '0'+sec : sec;
			
			time = time + ':' + sec;
		}
		return time;
	},
}