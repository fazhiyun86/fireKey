mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
		//		backbutton: false //关闭back按键监听
	}
});
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var ClassCode = self.ClassCode;

	function WebApp_GetFrieWorkExamine_StatisticalGroupByRegion(OrganiseUnitCode) {
		var urlTask = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetFrieWorkExamine_StatisticalGroupByRegion?dataKey=00-00-00-000&OrganiseUnitCode=' + OrganiseUnitCode;
		console.log(urlTask);
		mui.ajax(urlTask, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var html = '';
				var TotalItemCount = []
				var CountFn = [];
				var monthDay = [];
				var monthDay1 = [];
				var RegionName = [];
				var result = []
				mui.each(getDatas, function(index, item) {
					TotalItemCount.push(item.TotalItemCount);
//					console.log(item.TotalItemCount)
					monthDay.push(item.monthDay);
					RegionName.push(item.RegionName);
//					console.log(monthDay) 
				})

				function RName(RegionName) {
					for(var i = 0; i < RegionName.length; i++) {
						if(result.indexOf(RegionName[i]) == -1) {
							if(result.indexOf(RegionName[i]) != 0) {
								result.push(RegionName[i]);
//								console.log(RegionName[i])
							}
						}
					}
				}

				RName(RegionName)
				//				console.log(result)
				for(var i = 0; i < Number(RegionName.length) / Number(result.length); i++) {
					monthDay1.push(monthDay[i]);
				}
//				console.log(monthDay)
//				console.log(monthDay1)

				//数组分类处理
				var dataArr = TotalItemCount;
				var s = parseInt(dataArr.length / monthDay1.length);
				var n = 0;
				for(var i = 1; i <= s; i++) {
					var star = (i - 1) * monthDay1.length;
					CountFn[n++] = dataArr.slice(star, star + Number(monthDay1.length));
				}
				var y = dataArr.length - s * Number(monthDay1.length);
				if(y > 0) {
					CountFn[n++] = dataArr.slice(s * Number(monthDay1.length));
				}
//				console.log(CountFn[0]);

//				console.log(TotalItemCount)
				var myChart = echarts.init(document.getElementById('Fire_work_charts'));

				var colors = ['#5793f3', '#d14a61', '#008000', '#002449', '#FFFFCC', '#6C6C6C', '#00CE05', '#D600FF', '#D6F089', '#08E0FF'];

				option = {
					color: colors,

					tooltip: {
						trigger: 'none',
						axisPointer: {
							//							type: 'cross'
						}
					},
					legend: {
						top: '3%',
//						data: [result[0], result[1], result[2], result[3], result[4], result[5]]
						data:function(){
							var result1 = [];
							for (var i = 0; i < result.length; i++) {
								result1.push(result[i]);
							}
							return result1
						}()
					},
					grid: {
						left: 30,
						right: 5,
						top: 40,
						bottom: 33
					},
					xAxis: [{
							type: 'category',
							data: monthDay1,
						},
						
					],
					yAxis: [{
//						type: ''
					}],
					series: function() {
						var series = [];
//						console.log(CountFn)
						
						for(var i = 0; i < CountFn.length; i++) {
							series.push({
								name: result[i],
								type: 'line',
								smooth: true,
								data: CountFn[i]
							});
//							console.log(CountFn[i]);
						}
						 return series
					}()
					
				};

				myChart.setOption(option);

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}

		});
	}
//	WebApp_GetFrieWorkExamine_StatisticalGroupByRegion(localStorage.getItem('OrganiseUnitCode'));
	var myDate = new Date();
	var time = myDate.getFullYear() + '-' + ((myDate.getMonth() + 1) < 10 ? "0" : "") + (myDate.getMonth() + 1) + '-' + (myDate.getDate() < 10 ? "0" : "") + myDate.getDate();
	var starttime = myDate.getFullYear() + '-' + ((myDate.getMonth() + 1) < 10 ? "0" : "") + (myDate.getMonth() + 1) + '-' + myDate.getDate();
	document.getElementById("data123").innerHTML = starttime + "</br>";

	function WebApp_GetFrieWorkExamine_IndicatorStatistical(OrganiseUnitCode) {
		var urlT = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetFrieWorkExamine_IndicatorStatistical?dataKey=00-00-00-000&OrganiseUnitCode=' + OrganiseUnitCode;
//		console.log(urlT);
		mui.ajax(urlT, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var html = '';

				mui.each(getDatas, function(index, item) {
					html +=
						'<p class="Fire_Send Fire_Send_bm">' +
						'<input class="sendId1" type="hidden"value="' + item.IndicatorID + '" />' +
						'<span style="text-align: right;width: 60%;">' + item.IndicatorDisplayName + '</span>' +
						'<span style="text-align: center;font-size:0.9rem ;color: #FF4081;width: 20%;">' + item.NormalItemCount + '</span>' +
						'<span style="text-align: center;font-size:0.9rem ;color: #E73339;width: 20%;">' + item.AbnormalItemCount + '</span>' +
						'</p>';
				})
				document.getElementById("Fire_work_d").innerHTML = html;
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}

		});
	}
	WebApp_GetFrieWorkExamine_IndicatorStatistical(localStorage.getItem('UnitCode'));

})