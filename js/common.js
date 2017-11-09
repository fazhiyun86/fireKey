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
	function isLeapYear(year) {
		return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
	}
	
	
	function getMonthDays(year, month) {
	    return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(year) ? 29 : 28);
	}
	common.getYearWeek = function(y, m, d) {
	    var now = new Date(y, m - 1, d),
	        year = now.getFullYear(),
	        month = now.getMonth(),
	        days = now.getDate();
        
	    //那一天是那一年中的第多少天
	    for (var i = 0; i < month; i++) {
	        days += getMonthDays(year, i);
	    }
 
	    //那一年第一天是星期几
	    var yearFirstDay = new Date(year, 0, 1).getDay() || 7;
	 
	    var week = null;
	    if (yearFirstDay == 1) {
	        week = Math.ceil(days / yearFirstDay);
	    } else {
	        days -= (7 - yearFirstDay + 1);
	        week = Math.ceil(days / 7) + 1;
	    }
		 
	    return week;
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
		//	 var CurrentDate2;  //

		//js日期格式化
		var Y = CurrentDate.Format("yyyy");
		var M = CurrentDate.Format("MM");
		var D = CurrentDate.Format("dd");
		AllWeek = common.getYearWeek(Y, M, D); //当前总周数
		
		CurrentWeek = CurrentDate.getDay(); //当前周几
		if(CurrentWeek === 0) {
			CurrentWeek = 7;
		}
		
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
//		console.log(str)
		localStorage.setItem("oneDate", str);
		
		var oneArray = str.split(" ");
		var storageData = oneArray[1].split("~");
		
		document.getElementById("2017date").innerHTML = oneArray[0];
		
		localStorage.setItem("curWeek",oneArray[0]);
		
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
        		textStyle: {
        			fontSize: '13',
        			align: 'center'
        		}
		    },
		    tooltip : {
		        trigger: 'item',
             	position: ['0%', '50%'],
		        formatter: "{b} : {c} ({d}%)"
		    },
		    legend: {
	        	type: 'scroll',
	        	orient: 'vertical',
	            show: true,
		        right: 0,
		        top: 20,
		        bottom: 20,
		        textStyle: {
		        	fontSize: 7
		        },
	            formatter: function (name) {
				    return (name.length > 8 ? (name.slice(0,8)+"...") : name ); 
				},
		        data: []
		    },
		    series : [
		        {
		            name: '问题',
		            type: 'pie',
		            radius : '60%',
		            center: ['35%', '50%'],
		            data:[],
		            labelLine: {
		                normal: {
		                    show: true
		                }
		            },
		            label: {
		                normal: {
		                    show: true,
		                    position: 'inner',
		                    formatter: '{c}',
		                    fontSize: 7
		                }
		            },
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
	
	common.pipeChartsDataChange = function (data) {
		var result = [];
		
		var tempName = {};
		var total = data['DataSource']['Tables'][0]['Datas'];
		var info = data['DataSource']['Tables'][1]['Datas'];
		var len = info.length;
		
		
		// 总数
		for(var i = 0; i < total.length; i++) {

			var item = total[i];
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
		
		// 下面的每一项
		for(var i = 0; i < len; i++) {

			var item = info[i];
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
				temp.subName = item['ParentOrganiseUnitName'];
				
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
			baseOpt.title.text = item.title || '本周总数量';
			baseOpt.title.subtext = item.subName;
			// 如果没有数据就不向结果里面添加数据 
			if(item.legendData.length === 0) continue;
			
			baseOpt.legend.data = item.legendData;
			baseOpt.series[0].data = item.data;
			optionArr.push(baseOpt);
		}
		
		return optionArr
	}
	
	function stringInsertBR(str) {
		if (!str) return '';
		var result = '';
		str = str.split('');

		for (var i = 0; i < str.length; i++) {
			if(!str[i]) continue;
			result += str[i];
			if (!(i%4)&&i != 0) result += '\r\n';
		}

		return result;
	}
	
	/**
	 * 柱状图基本配置项
	 */
	
	common.barChartsBase = function () {
		var option = {
		    title: {
				text: '-',
        		textStyle: {
        			fontSize: '13'
        		}
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
		        top: '15%',
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
	
	/**
	 * 线性图表的配置项
	 */
	common.lineBaseOption = function () {
//		function a(min){
//			text = min + 20
//			return text
//		};
		var option = {
        	title:{
        		text: "",
        		textStyle: {
        			fontSize: '11'
        		},
				padding:[2,5,20,10],
        	},
            tooltip: {},
            color: ["#eaa906"],
            xAxis: {
            	splitLine:{
		    		show:true,
		    		lineStyle: {
		    			color:['#ccc'],
		    			type: 'dotted',
		    		}
		    	},
			    axisTick :{
		    		inside: 'true',
		    		length: 0,
		    	},
				axisLabel: {
					formatter:'{value}日'
				},
                data: [],
//              axisLabel:{
//              	interval:0,
//              }
            },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '15%',
		        top: '15%',
		        containLabel: true
		    },
		    dataZoom:[{
	            type: 'slider',
	            backgroundColor:'rgba(255,255,255,0.2)',
//	            fillerColor:'rgba(255,255,255,0.2)',
	            textStyle:false,
	            xAxisIndex: [0],
	            filterMode: 'filter',
//	            width: 50, 
                height: '10%',
//              handleSize: 8,
                showDataShadow: false,
                bottom:'1%',
                start: 80,
                end: 100,
        	}],
            yAxis: {
            	type:'value',
            	boundaryGap: [0, 40],
            	splitLine:{
		    		show: false,
		    	},
		    	axisTick :{
		    		inside: 'true',
		    		length: 0,
		    	},
	    		nameLocation: 'start',  
            },
            series: [{
                name: '',
                type: 'line',
	            label: {
	                normal: {
	                    show: true,
	                    position: 'top'
	                }
	            },
		    	data:[],
				itemStyle: {
                	normal: {				                    		                  
                		color: '#92d050',
                		lineStyle: {
                			color:'#c09205',
                			width:'2',
                		}
                	},
                },
            }]
        };
        
        
        return option;
        
	}
	
	/**
	 * 动火统计部分配置项
	 * @param {Object} data
	 */
	common.lineCharts = function (data) {
		var totalData = data[0]["Datas"];
		var subCompanyData = data[1]['Datas'];
		var result = [];
		
		// 从小到大排序
		totalData = totalData.sort(function (a, b) {
			return a.DateValue - b.DateValue	
		})
		
		var totalLen = totalData.length;
		var totalX = [];
		var totalY = [];
		var totalTitle = '';
		
		for (var i = 0; i < totalLen; i++) {
			var item = totalData[i];
			totalX.push(item.DateValue)
			totalY.push(item.FireCount)
			totalTitle = item.FireTitle;
		}
		var sumOption = common.lineBaseOption();
		sumOption.xAxis.data = totalX;
		sumOption.series[0].data = totalY;
		sumOption.title = {
			text: totalTitle,
			textStyle: {
				color: '#DB4527',
				fontSize: '14.5',
			},
			padding:[2,5,20,5],
			left: 'center'
		} ;
		sumOption.IsEnd = '1';
		sumOption.OrgID = '';
		
		result.push(sumOption)
		//
		var subLen = subCompanyData.length;
		
		var tempName = {};
		for (var j = 0; j < subLen; j++) {
			var jtem = subCompanyData[j];
			var index = jtem.OrgID;
			
			if (tempName[index]) {
				tempName[index].push(jtem)
			} else {
				tempName[index] = []
				tempName[index].push(jtem)
			}
		}
		for (var key in tempName) {
			var target = tempName[key]
			
			target = target.sort(function (a, b) {
				return a.DateValue - b.DateValue	
			})
			
			var tempX = [];
			var tempY = [];
			var tempTitle = '';
			var IsEnd, OrgID;
			for (var i = 0; i < target.length; i++) {
				var item = target[i];
				tempTitle = item.OrgName;
				tempX.push(item.DateValue);
				tempY.push(item.FireCount);
				IsEnd = item.IsEnd;
				OrgID = item.OrgID;
			}
			
			var tempOption = common.lineBaseOption();
			tempOption.title.text = tempTitle;
			tempOption.xAxis.data = totalX;
			tempOption.series[0].data = totalY;
			tempOption.IsEnd = IsEnd;
			tempOption.OrgID = OrgID;
			
			result.push(tempOption)
		}
		
		return result;
	}
	
	/**
	 * GUID 生成随机码
	 */
	
	common.guid = function () {
	    function S4() {
	       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	    }
	    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	}
	
	common.setHide = function (id){
		var oNode = document.getElementById(id);
		var classVal = oNode.getAttribute("class");
		classVal = classVal.concat(" hide");
		oNode.setAttribute("class", classVal );
	}
	/**
	 * 
	 * @param {Object} data
	 */
	common.formateArea = function (data) {
		var originDataArr = data[0]["Datas"];
		var subDataArr = data[1]["Datas"];
		
		var oriLen = originDataArr.length;
		var valLen = subDataArr.length;
		
		var result = [];
		
		for(var i = 0; i < oriLen; i++) {
			var item = originDataArr[i];
			var index = item.OrganiseUnitID;
			item.children = [];

			var title = item.CompanyName;
			for(var j = 0; j < valLen; j++) {
				var jtem = subDataArr[j]
				
				if(index == jtem.OrganiseUnitID) {
					item.children.push(jtem);
				}
			}
			
			result.push(item);
		}
		return result;
	}
	
	window.common = common
})()