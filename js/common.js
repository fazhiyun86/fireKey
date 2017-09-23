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
		var oneStr = "";
		for(var i = 0; i < data.length; i++) {
			var item = data[i]
			var weekName = item.split(" ");
			var myTime = weekName[1].split("~");
			
			html += '<li class="OrganiseUnitIDLi">' +
				'<span class="table-view_Name">'+weekName[0]+' '+ myTime[1] +'~'+ myTime[0] + '</span>' +
			'</li>';
			if(i === 0) {
				oneStr += weekName[0]+' '+ myTime[1] +'~'+ myTime[0]; 
			}
		}
		
		common.setStorageTime(oneStr)
		
		wrap.innerHTML = html
	}
	common.setStorageTime = function (str) {
		
		var oneArray = str.split(" ");
		var storageData = oneArray[1].split("~");
		
		document.getElementById("2017date").innerHTML = oneArray[0];
		
		localStorage.setItem("startTime", storageData[0]);
		localStorage.setItem("endTime", storageData[1]);	
	}
	
	/**
	 * 高低风险子页面数据格式转换
	 * @param {Object} info
	 */
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
	/***
	 * 饼图基本配置项
	 */
	
	common.pipeChartsBase = function (){
		var option = {
		    title : {
		        text: '',
//		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        right: 'right',
		        data: []
		    },
		    series : [
		        {
		            name: '问题',
		            type: 'pie',
		            radius : '55%',
		            center: ['35%', '60%'],
		            data:[],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		return option;
	}
	/**
	 * 饼图的配置项
	 * @param {Object} info
	 */
	
	common.pipeChartsDataChange = function (info) {
		var tempName = {};
		var len = info.length;
		
		for(var i = 0; i < len; i++) {
			var item = info[i]
			var temp = {};
			var name = item['OrganiseUnitID'];
			var obj = {
				name: item.DisplayName,
				value: item.AbnormalIndicatorCount
			}
			if(tempName[name]) {
				if(obj.name) {
					tempName[name].data.push(obj);
					tempName[name].legendData.push(item.DisplayName);
				}
			} else {
				temp.title = item.OrganiseUnitName;
				if (obj.name) {
					temp.data = [obj];
					temp.legendData = [item.DisplayName];
				} else{
					temp.data = [];
					temp.legendData = [];
				}
				tempName[name] = temp;
			}
		}
		
		var res= [];
		for(var key in tempName) {
			res.push(tempName[key])
		}
		
		var optionArr = []
		
		for (var i = 0; i < res.length; i++) {
			var baseOpt = common.pipeChartsBase();
			var item = res[i];
			baseOpt.title.text = item.title;
			baseOpt.legend.data = item.legendData;
			baseOpt.series[0].data = item.data;
			optionArr.push(baseOpt);
		}
		return optionArr
	}
	
	/**
	 * 柱状图基本配置项
	 */
	
	common.barChartsBase = function () {
		var option = {
		    title: {
				text: '-',
			},
            tooltip: {},
            color: ["#eaa906"],
            xAxis: {
                data: []
            },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        top: '5%',
		        containLabel: true
		    },
            yAxis: {},
            series: [{
                name: '-',
                type: 'bar',
                data: []
            }]
        };
        return option;
	}
	
	var ddd = [
            {
                "Name": "DFI_AllCountTable",
                "Key": "CompanyID",
                "Datas": [
                    {
                        "CompanyID": "123456",
                        "CompanyName": "A1工程",
                        "AllFireCount": "982"
                    }
                ]
            },
            {
                "Name": "DFI_OrgCountTable",
                "Key": "ID",
                "Datas": [
                    {
                        "ID": "f7b0990d-a03e-11e7-814d-fa163e4635ff",
                        "DateValue": "2017/9/11 0:00:00",
                        "CompanyID": "123456",
                        "FireCount": "12"
                    },
                    {
                        "ID": "f7b09937-a03e-11e7-814d-fa163e4635ff",
                        "DateValue": "2017/9/12 0:00:00",
                        "CompanyID": "123456",
                        "FireCount": "123"
                    },
                ]
            }
        ]
   	/***
	 * 在柱状图里面转化时间格式
	 */
	
	common.barDateSplit = function (str) {
		str = str || "";
		return str.split(" ")[0]
	}
	
	common.barChartsDataChange = function (data) {
		var companyDataArr = data[0]["Datas"];
		var valueDataArr = data[1]["Datas"];
		
		var comLen = companyDataArr.length;
		var valLen = valueDataArr.length;
		
		var result = [];
		
		for(var i = 0; i < comLen; i++) {
			var item = companyDataArr[i];
			var index = item.CompanyID;
			
			var XValArr = [];
			var YValArr = [];
			var title = item.CompanyName;
			for(var j = 0; j < valLen; j++) {
				var jtem = valueDataArr[j]
				
				var X = jtem.DateValue;
				var Y = jtem.FireCount;
				
				if(index == jtem.CompanyID) {
					XValArr.push(common.barDateSplit(X));
					YValArr.push(Y);
				}
			}
			var baseOption = common.barChartsBase();
			
			baseOption.title.text = title;
			baseOption.xAxis.data = XValArr;
			baseOption.series[0].data = YValArr;
			
			result.push(baseOption);
		}
		return result;
	}
	
	console.log(common.barChartsDataChange(ddd))
	
	window.common = common
})()