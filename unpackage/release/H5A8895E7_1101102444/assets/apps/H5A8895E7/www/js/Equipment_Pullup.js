mui.init({
	swipeBack: false,
	keyEventBind: {
		//		backbutton: true //关闭back按键监听
	},

	pullRefresh: {
		container: "#pullrefresh", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
		up: {
			height: 50, // 可选.默认50.触发上拉加载拖动距离
			auto: true, // 可选,默认false.自动上拉加载一次
			contentrefresh: "正在加载...", // 可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', // 可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: pullupRefresh
		}
	}

});
/**
 * 下拉刷新具体业务实现
 */

var count1 = -1;
var count2 = -1;
var count3 = -1;
var html1 = '';
var html2 = '';
var html3 = '';
var Status = [1, 2, 3];

function pullupRefresh() {
	//	console.log(count1+count2+count3)
	setTimeout(function() {
		var PageSize = 20;

		function WebApp_ExamineWorkTask_ISM1(UnitCode, Status, PageIndex, PageSize) {
			var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_ExamineWorkTask_ISM?dataKey=00-00-00-00&OrganiseUnitCode=' + UnitCode + '&Status=' + Status + '&PageIndex=' + PageIndex + '&PageSize=' + PageSize;
			console.log(url);
			//var mask = mui.createMask(); //遮罩层
			mui.ajax(url, {
				data: null,
				dataType: 'json', //返回
				type: 'get',
				timeout: 5000,
				//			beforeSend: function() {
				//				plus.nativeUI.showWaiting('加载中...', '');
				//				mask.show(); //显示遮罩层
				//			},
				//			complete: function() {
				//				plus.nativeUI.closeWaiting();
				//				mask.closed(); //关闭遮罩层
				//			},
				success: function(data) {
					//服务器返回响应，根据响应结果，分析是否登陆成功
					var getDatas = data['DataSource']['Tables'][0]['Datas'];
					//					console.log('yi ' + getDatas.length)
//					if(getDatas.length >= PageSize) {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
//					}
					//					else {
					//						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					//					}

					//var html = '';
					//var stutsNum = ['<i class="iconfont icon-shijian" style="color:#877EED"></i>', '<i class="iconfont icon-iconshandianfahuo" style="color:#DB4527"></i>', '<i class="iconfont icon-duigou-copy"style="color:#7FB80E"></i>'];
					mui.each(getDatas, function(index, item) {

						var bai = ((Number(item.ExamObjectCount) / Number(item.TotalObjectCount)) * 100).toFixed(2) + "%";
						//console.log(item.ExamObjectCount / );
						html1 +=
							'<div class="Equipment_patrol_con1">' +
							'<input class="sendId" type="hidden"value="' + item.TaskID + '" />' +
							'<input class="sendId1" type="hidden"value="' + item.TaskName + '" />' +
							//							'<div class="Equipment_patrol_ccon1">' +
							//							stutsNum[Number(item.status) - 1] +
							//							'</div>' +

							'<div class="Equipment_patrol_ccon2">' +
							'<p style="font-size:0.85rem;">' + item.TaskName + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;width:100%;">巡检单位：' + item.TaskName + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;width:100%;">任务期限：' + item.taskstartTime + '-' + item.TaskEndTime + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;width:100%;" class="Equipment_patrol_ccon2_spanp">任务进度：' + bai + '<span> 应检：' + item.TotalObjectCount + '</span>' + '<span> 已检：' + item.ExamObjectCount + '</span>' + '<span> 异常对象：' + item.Abnormal + '</span>' + '</p>' +
							'</div></div>';
						//					console.log(item.status)
					})
					document.getElementById('Equipment_patrol_con1A').innerHTML = html1;

				},
				error: function() {
					//异常处理
					mui.toast('数据请求失败')
				}
			});
		};

		WebApp_ExamineWorkTask_ISM1(localStorage.getItem('UnitCode'), Status[0], ++count1, PageSize);

		function WebApp_ExamineWorkTask_ISM2(UnitCode, Status, PageIndex, PageSize) {
			var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_ExamineWorkTask_ISM?dataKey=00-00-00-00&OrganiseUnitCode=' + UnitCode + '&Status=' + Status + '&PageIndex=' + PageIndex + '&PageSize=' + PageSize;
			console.log(url);
			//var mask = mui.createMask(); //遮罩层
			mui.ajax(url, {
				data: null,
				dataType: 'json', //返回
				type: 'get',
				timeout: 5000,
				//			beforeSend: function() {
				//				plus.nativeUI.showWaiting('加载中...', '');
				//				mask.show(); //显示遮罩层
				//			},
				//			complete: function() {
				//				plus.nativeUI.closeWaiting();
				//				mask.closed(); //关闭遮罩层
				//			},
				success: function(data) {
					//服务器返回响应，根据响应结果，分析是否登陆成功
					var getDatas = data['DataSource']['Tables'][0]['Datas'];
					//					console.log('er' + getDatas.length)
//					if(getDatas.length >= PageSize) {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
//					}
					//					else {
					//						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					//					}

					//var html = '';
					//					var stutsNum = ['<i class="iconfont icon-shijian" style="color:#877EED"></i>', '<i class="iconfont icon-iconshandianfahuo" style="color:#DB4527"></i>', '<i class="iconfont icon-duigou-copy"style="color:#7FB80E"></i>'];
					mui.each(getDatas, function(index, item) {

						var bai = ((Number(item.ExamObjectCount) / Number(item.TotalObjectCount)) * 100).toFixed(2) + "%";
						//console.log(item.ExamObjectCount / );
						html2 +=
							'<div class="Equipment_patrol_con1">' +
							'<input class="sendId" type="hidden"value="' + item.TaskID + '" />' +
							'<input class="sendId1" type="hidden"value="' + item.TaskName + '" />' +
							//							'<div class="Equipment_patrol_ccon1">' +
							//							stutsNum[Number(item.status) - 1] +
							//							'</div>' +

							'<div class="Equipment_patrol_ccon2">' +
							'<p style="font-size:0.85rem;">' + item.TaskName + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;width:100%;">巡检单位：' + item.TaskName + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;width:100%;">任务期限：' + item.taskstartTime + '-' + item.TaskEndTime + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;width:100%;" class="Equipment_patrol_ccon2_spanp">任务进度：' + bai + '<span> 应检：' + item.TotalObjectCount + '</span>' + '<span> 已检：' + item.ExamObjectCount + '</span>' + '<span> 异常对象：' + item.Abnormal + '</span>' + '</p>' +
							'</div></div>';
						//					console.log(item.status)
					})
					document.getElementById('Equipment_patrol_con1B').innerHTML = html2;

				},
				error: function() {
					//异常处理
					mui.toast('数据请求失败')
				}
			});
		};

		WebApp_ExamineWorkTask_ISM2(localStorage.getItem('UnitCode'), Status[1], ++count2, PageSize);

		function WebApp_ExamineWorkTask_ISM3(UnitCode, Status, PageIndex, PageSize) {
			var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_ExamineWorkTask_ISM?dataKey=00-00-00-00&OrganiseUnitCode=' + UnitCode + '&Status=' + Status + '&PageIndex=' + PageIndex + '&PageSize=' + PageSize;
			console.log(url);
			//var mask = mui.createMask(); //遮罩层
			mui.ajax(url, {
				data: null,
				dataType: 'json', //返回
				type: 'get',
				timeout: 5000,
				//			beforeSend: function() {
				//				plus.nativeUI.showWaiting('加载中...', '');
				//				mask.show(); //显示遮罩层
				//			},
				//			complete: function() {
				//				plus.nativeUI.closeWaiting();
				//				mask.closed(); //关闭遮罩层
				//			},
				success: function(data) {
					//服务器返回响应，根据响应结果，分析是否登陆成功
					var getDatas = data['DataSource']['Tables'][0]['Datas'];
					//					console.log('san' + getDatas.length)
//					if(getDatas.length >= PageSize) {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
//					}
					//					else {
					//						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					//					}

					//var html = '';
					//					var stutsNum = ['<i class="iconfont icon-shijian" style="color:#877EED"></i>', '<i class="iconfont icon-iconshandianfahuo" style="color:#DB4527"></i>', '<i class="iconfont icon-duigou-copy"style="color:#7FB80E"></i>'];
					mui.each(getDatas, function(index, item) {

						var bai = ((Number(item.ExamObjectCount) / Number(item.TotalObjectCount)) * 100).toFixed(2) + "%";
						//console.log(item.ExamObjectCount / );
						html3 +=
							'<div class="Equipment_patrol_con1">' +
							'<input class="sendId" type="hidden"value="' + item.TaskID + '" />' +
							'<input class="sendId1" type="hidden"value="' + item.TaskName + '" />' +
							//							'<div class="Equipment_patrol_ccon1">' +
							//							stutsNum[Number(item.status) - 1] +
							//							'</div>' +

							'<div class="Equipment_patrol_ccon2">' +
							'<p style="font-size:0.85rem;">' + item.TaskName + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;width:100%;">巡检单位：' + item.TaskName + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;width:100%;">任务期限：' + item.taskstartTime + '-' + item.TaskEndTime + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;width:100%;" class="Equipment_patrol_ccon2_spanp">任务进度：' + bai + '<span> 应检：' + item.TotalObjectCount + '</span>' + '<span> 已检：' + item.ExamObjectCount + '</span>' + '<span> 异常对象：' + item.Abnormal + '</span>' + '</p>' +
							'</div></div>';
						//					console.log(item.status)
					})
					document.getElementById('Equipment_patrol_con1C').innerHTML = html3;

				},
				error: function() {
					//异常处理
					mui.toast('数据请求失败')
				}
			});
		};

		WebApp_ExamineWorkTask_ISM3(localStorage.getItem('UnitCode'), Status[2], ++count3, PageSize);

	}, 700)
}

mui.plusReady(function() {

	document.getElementById("address11").innerHTML = localStorage.getItem('index_name');

	mui('.Equipment_patrol_con_list').on('tap', '#Equipment_patrol_status1', function() {
		$('.Equipment_patrol_con_list > p').attr('class', '');
		$('#Equipment_patrol_status1').attr('class', 'dataDcl');

		$("#Equipment_patrol_con1A").css('display', 'block');
		$("#Equipment_patrol_con1B").css('display', 'none');
		$("#Equipment_patrol_con1C").css('display', 'none');
		//		document.getElementById('Equipment_patrol_con1').innerHTML = '1';
		//		document.getElementById('Equipment_patrol_con1').innerHTML = html1;

	})
	mui('.Equipment_patrol_con_list').on('tap', '#Equipment_patrol_status2', function() {
		$('.Equipment_patrol_con_list > p').attr('class', '');
		$('#Equipment_patrol_status2').attr('class', 'dataDcl');

		$("#Equipment_patrol_con1A").css('display', 'none');
		$("#Equipment_patrol_con1B").css('display', 'block');
		$("#Equipment_patrol_con1C").css('display', 'none');
		//		document.getElementById('Equipment_patrol_con1').innerHTML = '2';
		//		document.getElementById('Equipment_patrol_con1').innerHTML = html2;

	})
	mui('.Equipment_patrol_con_list').on('tap', '#Equipment_patrol_status3', function() {
		$('.Equipment_patrol_con_list > p').attr('class', '');
		$('#Equipment_patrol_status3').attr('class', 'dataDcl');

		$("#Equipment_patrol_con1A").css('display', 'none');
		$("#Equipment_patrol_con1B").css('display', 'none');
		$("#Equipment_patrol_con1C").css('display', 'block');
		//		document.getElementById('Equipment_patrol_con1').innerHTML = '3';
		//		document.getElementById('Equipment_patrol_con1').innerHTML = html3;

	})

})