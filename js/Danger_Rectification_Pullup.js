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

	setTimeout(function() {

		var PageSize = 20;
		//隐患整改
		function WebApp_GetRectifyList1(UnitCode, Status, PageIndex, PageSize) {
			var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetRectifyList?dataKey=00-00-00-00&UnitCode=' + UnitCode + '&Status=' + Status + '&PageIndex=' + PageIndex + '&PageSize=' + PageSize;
			console.log(url);
			//		var mask = mui.createMask(); //遮罩层
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

//					if(getDatas.length >= PageSize) {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
//					}
					//					else {
					//						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					//					}
					//				var stutsNum = ['<i class="iconfont icon-shijian" style="color:#877EED"></i>', '<i class="iconfont icon-iconshandianfahuo" style="color:#DB4527"></i>', '<i class="iconfont icon-duigou-copy"style="color:#7FB80E"></i>'];
					mui.each(getDatas, function(index, item) {

						html1 +=
							'<div class="Equipment_patrol_con1">' +
							'<input class="sendId" type="hidden"value="' + item.OrderID + '" />' +
							//						'<div class="Equipment_patrol_ccon1">' +
							//						stutsNum[Number(item.status) - 1] +
							//						'</div>' +
							'<div class="Equipment_patrol_ccon2">' +
							'<p style="font-size:0.85rem;width:100%;">' + item.OrderName + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;">整改单号：' + item.OrderCode + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;">整改期限：' + item.StartTime + '-' + item.EndTime + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;" class="Equipment_patrol_ccon2_spanp">整改单位：' + item.OrganiseUnitName +
							'</div></div>';
						//console.log(item.status)
					})
					document.getElementById('Equipment_patrol_con1A').innerHTML = html1;
				},
				error: function() {
					//异常处理
					mui.toast('数据请求失败')
				}
			});
		};
		WebApp_GetRectifyList1(localStorage.getItem('UnitCode'), Status[0], ++count1, PageSize);

		function WebApp_GetRectifyList2(UnitCode, Status, PageIndex, PageSize) {
			var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetRectifyList?dataKey=00-00-00-00&UnitCode=' + UnitCode + '&Status=' + Status + '&PageIndex=' + PageIndex + '&PageSize=' + PageSize;
			console.log(url);
			//		var mask = mui.createMask(); //遮罩层
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

//					if(getDatas.length >= PageSize) {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
//					}
					//					else {
					//						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					//					}
					//				var stutsNum = ['<i class="iconfont icon-shijian" style="color:#877EED"></i>', '<i class="iconfont icon-iconshandianfahuo" style="color:#DB4527"></i>', '<i class="iconfont icon-duigou-copy"style="color:#7FB80E"></i>'];
					mui.each(getDatas, function(index, item) {

						html2 +=
							'<div class="Equipment_patrol_con1">' +
							'<input class="sendId" type="hidden"value="' + item.OrderID + '" />' +
							//						'<div class="Equipment_patrol_ccon1">' +
							//						stutsNum[Number(item.status) - 1] +
							//						'</div>' +
							'<div class="Equipment_patrol_ccon2">' +
							'<p style="font-size:0.85rem;width:100%;">' + item.OrderName + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;">整改单号：' + item.OrderCode + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;">整改期限：' + item.StartTime + '-' + item.EndTime + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;" class="Equipment_patrol_ccon2_spanp">整改单位：' + item.OrganiseUnitName +
							'</div></div>';
						//console.log(item.status)
					})
					document.getElementById('Equipment_patrol_con1B').innerHTML = html2;
				},
				error: function() {
					//异常处理
					mui.toast('数据请求失败')
				}
			});
		};
		WebApp_GetRectifyList2(localStorage.getItem('UnitCode'), Status[1], ++count2, PageSize);

		function WebApp_GetRectifyList3(UnitCode, Status, PageIndex, PageSize) {
			var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetRectifyList?dataKey=00-00-00-00&UnitCode=' + UnitCode + '&Status=' + Status + '&PageIndex=' + PageIndex + '&PageSize=' + PageSize;
			console.log(url);
			//		var mask = mui.createMask(); //遮罩层
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

//					if(getDatas.length >= PageSize) {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
//					}
					//					else {
					//						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					//					}
					//				var stutsNum = ['<i class="iconfont icon-shijian" style="color:#877EED"></i>', '<i class="iconfont icon-iconshandianfahuo" style="color:#DB4527"></i>', '<i class="iconfont icon-duigou-copy"style="color:#7FB80E"></i>'];
					mui.each(getDatas, function(index, item) {

						html3 +=
							'<div class="Equipment_patrol_con1">' +
							'<input class="sendId" type="hidden"value="' + item.OrderID + '" />' +
							//						'<div class="Equipment_patrol_ccon1">' +
							//						stutsNum[Number(item.status) - 1] +
							//						'</div>' +
							'<div class="Equipment_patrol_ccon2">' +
							'<p style="font-size:0.85rem;width:100%;">' + item.OrderName + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;">整改单号：' + item.OrderCode + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;">整改期限：' + item.StartTime + '-' + item.EndTime + '</p>' +
							'<p style="font-size:0.7rem;color:#666666;" class="Equipment_patrol_ccon2_spanp">整改单位：' + item.OrganiseUnitName +
							'</div></div>';
						//console.log(item.status)
					})
					document.getElementById('Equipment_patrol_con1C').innerHTML = html3;
				},
				error: function() {
					//异常处理
					mui.toast('数据请求失败')
				}
			});
		};
		WebApp_GetRectifyList3(localStorage.getItem('UnitCode'), Status[2], ++count3, PageSize);

		
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