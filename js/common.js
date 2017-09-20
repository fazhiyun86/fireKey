(function() {
	var common = {}
	
	
	/**
	 * 时间相加减
	 * date  需要转化字符串
	 */
	addDate = function(date, days) {
		var d = new Date(date);
		d.setDate(d.getDate() + days);
		var month = d.getMonth() + 1;
		var day = d.getDate();
		if(month < 10) {
			month = "0" + month;
		}
		if(day < 10) {
			day = "0" + day;
		}
		var val = d.getFullYear() + "-" + month + "-" + day;
		return val;
	}
	/**
	 * 当前日期在当前年为第几周
	 * a 当前时间年；  b 当前时间月； c 当前时间日；
	 */
	common.getYearWeek = function(a, b, c) {
		//date1是当前日期
		//date2是当年第一天
		//d是当前日期是今年第多少天
		//			    //用d + 当前年的第一天的周差距的和在除以7就是本年第几周
		var arr = [];
		var date1 = new Date(a, parseInt(b) - 1, c),
			date2 = new Date(a, 0, 1),
			d = Math.round((date1.valueOf() - date2.valueOf()) / 86400000);
		return(Math.ceil((d + ((date2.getDay() + 1) - 1)) / 7));
	};

	/**
	 * 时间自定义函数（格式化）
	 */
	Date.prototype.Format = function(fmt) { //author: meizz 
		var o = {
			//			    	"Y+": this.getFullYear(),
			"M+": this.getMonth() + 1, //月份 
			"d+": this.getDate(), //日 
			"h+": this.getHours(), //小时 
			"m+": this.getMinutes(), //分 
			"s+": this.getSeconds(), //秒 
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			"S": this.getMilliseconds() //毫秒 
		};
		if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;
	}


//	document.getElementById("dat").onclick = getTimeNow("2017-06-01", "2017-09-19");


	/**
	 * 首页时间选择（当前总周数， 本周结束时间， 本周起始时间）
	 */

	common.getTimeNow = function(stardata, endata) {
		var array = [];
		var CurrentDate; //当前时间
		var CurrentWeek; //当前周几
		var AllWeek; //当前周数
		var DateJoinStr; //拼接文本（周数，周末时间，周初时间）
		CurrentDate = new Date(endata); //时间格式转换
		var date = CurrentDate.toString();
		//	 			var CurrentDate2;  //

		//js日期格式化
		var Y = CurrentDate.Format("yyyy");
		var M = CurrentDate.Format("MM");
		var D = CurrentDate.Format("dd");

		AllWeek = common.getYearWeek(Y, M, D); //当前总周数
		CurrentWeek = CurrentDate.getDay(); //当前周几
		//本周起始时间（当前时间-当前周几+1）
		CurrentDate = new Date(addDate(date, 1 - CurrentWeek));
		DateJoinStr = '第' + AllWeek + '周 ' + addDate(CurrentDate.toString(), 6) + '~' + CurrentDate.Format("yyyy-MM-dd");
		array.push(DateJoinStr);
		CurrentDate = new Date(addDate(CurrentDate.toString(), -1));

		while(CurrentDate >= new Date(stardata)) {
			//判断整周
			//当前周数%7为0的时候，总周数减一
			if((CurrentDate.getDay()) % 7 == 0) {
				AllWeek = AllWeek - 1;
				//字符串拼接本周结束时间
				DateJoinStr ='第'+ AllWeek + '周 ' + CurrentDate.Format("yyyy-MM-dd");
			}
			//当前周数%7为1的时候， 字符串拼接本周起始时间，并添加到文本数组中
			if((CurrentDate.getDay()) % 7 == 1) {
				DateJoinStr = DateJoinStr + '~' + CurrentDate.Format("yyyy-MM-dd");
				array.push(DateJoinStr);
			}
			//当前时间减一天
			CurrentDate = new Date(addDate(CurrentDate.toString(), -1));
		}
		return array;
	}
	
	common.setAsideDate =  function (data) {
		var wrap = document.getElementById("table_view");
		
		var html = "";
		for(var i = 0; i < data.length; i++) {
			html += '<li class="OrganiseUnitIDLi">' +
				'<span class="table-view_Name">' + data[i] + '</span>' +
			'</li>';
		}
		
		var storageData = data[0]
		common.setStorageTime(storageData)
		
//		storageData = storageData.split(" ")[1]
//		storageData = storageData.split("~")
//		
//		localStorage.setItem("startTime", storageData[0])
//		localStorage.setItem("endTime", storageData[1])
		
		wrap.innerHTML = html
	}
	common.setStorageTime = function (str) {
		var storageData = str;
		storageData = storageData.split(" ")[1];
		storageData = storageData.split("~");
		
		localStorage.setItem("startTime", storageData[0]);
		localStorage.setItem("endTime", storageData[1]);
		
	}
	
	common.riskCompanyDataChange = function (info) {
		var tempName = {};
		var res = [];
		var len = info.length;
		for(var i = 0; i < len; i++) {
			var item = info[i];
			var name = item['OrganiseUnitID'];
			var obj = {
				k: item.DisplayName,
				v: item.AbnormalIndicatorCount
			}
			if(tempName[name]) {
				obj.k ? tempName[name].subItem.push(obj) : '';
			} else {
				obj.k ? item.subItem = [obj] : item.subItem = [];
				tempName[name] = item;
			}
		}
		for(var key in tempName) {
			res.push(tempName[key])
		}
		
		return res;
	}

	var t = [
                    {
                        "ID": "5cbe4eac-9ddf-11e7-814d-fa163e4635ff",
                        "OrganiseUnitID": "20c45a5c-66c7-11e7-9bf0-fa163ea287f1",
                        "OrganiseUnitName": "北京建工集团",
                        "ObjectCount": "1150",
                        "AbnormalCount": "0",
                        "AuditCount": "0",
                        "Rate": "0/8",
                        "Ratio": "0.00%",
                        "AbnormalIndicatorCount": "",
                        "DisplayName": "",
                        "IndicatorClassID": "",
                        "IsEnd": "0"
                    },
                    {
                        "ID": "5cbe4f19-9ddf-11e7-814d-fa163e4635ff",
                        "OrganiseUnitID": "25d11426-4a61-11e7-9bf0-fa163ea287f1",
                        "OrganiseUnitName": "北京城建集团",
                        "ObjectCount": "812",
                        "AbnormalCount": "2",
                        "AuditCount": "0",
                        "Rate": "1/7",
                        "Ratio": "21.89%",
                        "AbnormalIndicatorCount": "1",
                        "DisplayName": "接头是否无渗漏",
                        "IndicatorClassID": "24fd8c4a-9db9-11e7-814d-fa163e4635ff",
                        "IsEnd": "0"
                    },
                    {
                        "ID": "5cbe4f4c-9ddf-11e7-814d-fa163e4635ff",
                        "OrganiseUnitID": "25d11426-4a61-11e7-9bf0-fa163ea287f1",
                        "OrganiseUnitName": "北京城建集团",
                        "ObjectCount": "812",
                        "AbnormalCount": "2",
                        "AuditCount": "0",
                        "Rate": "1/7",
                        "Ratio": "21.89%",
                        "AbnormalIndicatorCount": "2",
                        "DisplayName": "消防通道是否畅通",
                        "IndicatorClassID": "4fe97a77-9db9-11e7-814d-fa163e4635ff",
                        "IsEnd": "0"
                    },
                    {
                        "ID": "5cbe4f6a-9ddf-11e7-814d-fa163e4635ff",
                        "OrganiseUnitID": "25d11426-4a61-11e7-9bf0-fa163ea287f1",
                        "OrganiseUnitName": "北京城建集团",
                        "ObjectCount": "812",
                        "AbnormalCount": "2",
                        "AuditCount": "0",
                        "Rate": "1/7",
                        "Ratio": "21.89%",
                        "AbnormalIndicatorCount": "1",
                        "DisplayName": "覆盖区域是否有烟头",
                        "IndicatorClassID": "48e0c2df-9db9-11e7-814d-fa163e4635ff",
                        "IsEnd": "0"
                    },
                    {
                        "ID": "5cbe4f89-9ddf-11e7-814d-fa163e4635ff",
                        "OrganiseUnitID": "9db33c3a-6fab-11e7-9bf0-fa163ea287f1",
                        "OrganiseUnitName": "中国建筑一局(集团)有限公司",
                        "ObjectCount": "248",
                        "AbnormalCount": "0",
                        "AuditCount": "0",
                        "Rate": "0/2",
                        "Ratio": "20.08%",
                        "AbnormalIndicatorCount": "",
                        "DisplayName": "",
                        "IndicatorClassID": "",
                        "IsEnd": "0"
                    },
                    {
                        "ID": "5cbe4fa8-9ddf-11e7-814d-fa163e4635ff",
                        "OrganiseUnitID": "e469992f-726b-11e7-9bf0-fa163ea287f1",
                        "OrganiseUnitName": "北京住总集团",
                        "ObjectCount": "0",
                        "AbnormalCount": "0",
                        "AuditCount": "0",
                        "Rate": "0/0",
                        "Ratio": "0.00%",
                        "AbnormalIndicatorCount": "",
                        "DisplayName": "",
                        "IndicatorClassID": "",
                        "IsEnd": "0"
                    }
                ]
	
	console.log(common.riskCompanyDataChange(t))
	
	
	window.common = common
})()