mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
		//		backbutton: false //关闭back按键监听
	}
});

mui.plusReady(function() {

	// 显示当前时间
	var myDate = new Date();
	var operationStatistics_year = myDate.getFullYear();
	var operationStatistics_month = ((myDate.getMonth() + 1) < 10 ? "0" : "") + (myDate.getMonth() + 1);
	var operationStatistics_time = myDate.getFullYear() + '-' + ((myDate.getMonth() + 1) < 10 ? "0" : "") + (myDate.getMonth() + 1);
	//	document.getElementById('time').innerHTML = "<span>" + operationStatistics_time + "</span>";
	var present = operationStatistics_year + '-' + (myDate.getMonth() + 1) + '-' + myDate.getDate();

	//通过map得到classcode 
	//	var yunMapClassCode = new Map();

	function getClassCode() {
		mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEquipmentStatus?dataKey=00-00-00-00&ClassCode=EquipmentClass&UnitCode=' + localStorage.getItem("OrganiseUnitCode"), {
			async: false,
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
//				document.getElementById('equipName').value = '全部设备'
				localStorage.setItem('init_classcode', '');
//				for(var i = 0; i < getDatas.length; i++) {
//					yunMapClassCode.set(getDatas[i].ItemName, getDatas[i].ItemCode);
//				}
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}
	getClassCode();
	
		//根据月份获得当前月的天数
	function getDays(year, mouth) {
		//定义当月的天数；
		var days;
		//当月份为二月时，根据闰年还是非闰年判断天数
		if(mouth == 2) {
			days = year % 4 == 0 ? 29 : 28;
		} else if(mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
			//月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
			days = 31;
		} else {
			//其他月份，天数为：30.
			days = 30;
		}
		//输出天数
		return days;
	}
	
	//根据UnitCode和ClassCode以及startTime和endTime得到设备故障趋势
	function operationStatistics_first(UnitCode, ClassCode, startTime, endTime) {
		plus.nativeUI.showWaiting('正在加载');
		mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_Repair_Repair?dataKey=00-00-00-00&UnitCode=' + UnitCode + '&ClassCode=' + ClassCode + '&StartTime=' + startTime + '&EndTime=' + endTime + '&DateType=2&EnterpriseID=', {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var arr = [];
				var arrVal = [];
				//服务器返回响应，根据响应结果，分析是否登陆成功

				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				mui.each(getDatas, function(index, item) {
					arr.push(index + 1);
					arrVal.push(item.Total);
					//					console.log(item.Total)
				});
				yunFirst(arr, arrVal)
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}

		});
		setTimeout(function() {
			plus.nativeUI.closeWaiting();
		}, 500);
	};
	operationStatistics_first(localStorage.getItem('UnitCode'), localStorage.getItem('init_classcode'), operationStatistics_year + '-1-1', present);

//根据UnitCode和startTime和endTime得到设备故障分布及数量
	function operationStatistics_second(UnitCode, startTime, endTime) {

		mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_Repair_ClassType?dataKey=00-00-00-00&ApplicationID=' + localStorage.getItem('ApplicationID') + '&UnitCode=' + UnitCode + '&StartTime=' + startTime + ' 00:00:00&EndTime=' + endTime + ' 23:59:59', {

			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var arr = [];
				var arrVal = [];
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				
				if(getDatas.length == 0) {
					arr = [0];
					arrVal = [{ 'value': 0, 'name': '无' } ]
					
				} else {
					mui.each(getDatas, function(index, item) {
						arr.push(item.ClassName.slice(0, 4) + '(' + item.count + ')');
						arrVal.push({ 'value': item.count, 'name': item.ClassName.slice(0, 4) + '(' + item.count + ')' })
					});
					

				};
				yunSecond(arr, arrVal);
				console.log(arrVal)
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}

	operationStatistics_second(localStorage.getItem('UnitCode'), operationStatistics_year + '-' + operationStatistics_month + '-' + '01', operationStatistics_year + '-' + operationStatistics_month + '-' + getDays(operationStatistics_year, operationStatistics_month));

	function yunFirst(arr, arrVal) {
		var myChart1 = echarts.init(document.getElementById('malist2_1'));
		console.log(arr)
		console.log(arrVal)
		option1 = {
			backgroundColor: '#FFFFFF',

			grid: {
				top: '3.7%',
				left: '0',
				right: '3%',
				bottom: '0',
				containLabel: true
			},

			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: arr
			},
			yAxis: {
				type: 'value'
			},
			series: [{
				type: 'line',
				smooth: true,
				//			stack: '总量',
				data: arrVal,
			}]
		};
		myChart1.setOption(option1);
	}
//var myChart2 = echarts.init(document.getElementById('malist2_2'));
	function yunSecond(arr, arrVal) {
		var myChart2 = echarts.init(document.getElementById('malist2_2'));
		option2 = {
//			color: ['#cb3e3a','#61a0a8','#e37c57','#c56f97','#835a7c','#b56452','#a3bd4a','#e2b296','#8086a4','#967995','#dd8689','#a5a8c0','#8989c3','#6c82d8','#7ebb62'],
			tooltip: {
				trigger: 'item',
				triggerOn: 'click',
				position: 'inside',
				formatter: "{a} <br/>{b} : {c}"
			},

			legend: {
				show: true,
				top: 15,
				right: 2,
				data: arr,
				orient: "vertical",
				align: 'right',
				textStyle: {
					fontSize: 10,
					color: '#666666'

				},
				/*改变文字前图标的大小*/
				itemHeight: 10,
				itemWidth: 10
			},
			calculable: true,
			series: [{
				name: '设备故障分布及数量',
				type: 'pie',
				/*大小*/
				radius: [15, 60],
				/*位置*/
				center: ['44%', '50%'],
				roseType: 'area',
				hoverAnimation: true,
				selectedOffset: 2,
				labelLine: {
					normal: {
						show: true,
						length: 3,
						length2: 3,
						smooth: true,
					},
					emphasis: {
						show: true
					}
				},
				data: arrVal
			}]
		};

		myChart2.setOption(option2);
	}

//	var myChart3 = echarts.init(document.getElementById('malist2_3'));
//	option3 = {
//		backgroundColor: '#FFFFFF',
//		color: ['#ED7D31'],
//		tooltip: {
//			trigger: 'axis',
//			axisPointer: { // 坐标轴指示器，坐标轴触发有效
//				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
//			}
//		},
//		grid: {
//			top: '3.5%',
//			left: '0',
//			right: '0',
//			bottom: '0',
//			containLabel: true
//		},
//		xAxis: [{
//			type: 'category',
//			data: ['Mon'],
//			axisTick: {
//				alignWithLabel: true
//			}
//		}],
//		yAxis: [{
//			type: 'value'
//		}],
//		series: [{
//			name: '直接访问',
//			type: 'bar',
//			barWidth: 30,
//			barMaxWidth: 50,
//			data: [10]
//		}]
//
//	};
//
//	var myChart4 = echarts.init(document.getElementById('malist2_4'));
//	option4 = {
//		backgroundColor: '#FFFFFF',
//		color: ['#5B9BD5'],
//		tooltip: {
//			trigger: 'axis',
//			axisPointer: { // 坐标轴指示器，坐标轴触发有效
//				type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
//			}
//		},
//		grid: {
//			top: '3.5%',
//			left: '0',
//			right: '0',
//			bottom: '0',
//			containLabel: true
//		},
//		xAxis: [{
//			type: 'category',
//			data: ['Mon'],
//			axisTick: {
//				alignWithLabel: true
//			}
//		}],
//		yAxis: [{
//			type: 'value'
//		}],
//		series: [{
//			name: '直接访问',
//			type: 'bar',
//			barWidth: 30,
//			barMaxWidth: 50,
//			data: [10]
//		}]
//
//	};

	
//	myChart3.setOption(option3);
//	myChart4.setOption(option4);

})