mui.init({
	swipeBack: false,
	keyEventBind: {
		//		backbutton: true //关闭back按键监听
	},
//	pullRefresh: {
//		container: '#Equipment_patrol_con1',
//		down: {
//			callback: pulldownRefresh
//		},
//		//		up: {
//		//			contentrefresh: '正在加载...',
//		//			callback: pullupRefresh
//		//		}
//	}
});
/**
 * 下拉刷新具体业务实现
 */

function pulldownRefresh() {
	setTimeout(function() {
		mui('#Equipment_patrol_con1').pullRefresh().endPulldownToRefresh(); //refresh completed
		document.getElementById("address11").innerHTML = localStorage.getItem('index_name');

		function WebApp_ExamineWorkTask_ISM(UnitCode) {
			var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_ExamineWorkTask_ISM?dataKey=00-00-00-00&OrganiseUnitCode=' + UnitCode;
			console.log(url);

			mui.ajax(url, {
				data: null,
				dataType: 'json', //返回
				type: 'get',
				timeout: 5000,

				success: function(data) {

				},
				error: function() {
					//异常处理
					mui.toast('数据请求失败')
				}
			});
		};
		WebApp_ExamineWorkTask_ISM(localStorage.getItem('OrganiseUnitCode'));

	}, 600);
}
var count = 0;

mui.plusReady(function() {

	document.getElementById("address11").innerHTML = localStorage.getItem('index_name');
	
//隐患整改
	function WebApp_GetRectifyList(UnitCode) {
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetRectifyList?dataKey=00-00-00-00&UnitCode=' + UnitCode;
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
				var html = '';
				var stutsNum = ['<i class="iconfont icon-shijian" style="color:#877EED"></i>', '<i class="iconfont icon-iconshandianfahuo" style="color:#DB4527"></i>', '<i class="iconfont icon-duigou-copy"style="color:#7FB80E"></i>'];
				mui.each(getDatas, function(index, item) {

					html +=
						'<div class="Equipment_patrol_con1">' +
						'<input class="sendId" type="hidden"value="' + item.OrderID + '" />' +
						'<div class="Equipment_patrol_ccon1">' +
						stutsNum[Number(item.status) - 1] +
						'</div>' +
						'<div class="Equipment_patrol_ccon2">' +
//						'<p style="font-size:0.85rem;">' + item.TaskName + '</p>' +
						'<p style="font-size:0.7rem;color:#666666;">整改单号：' + item.OrderCode + '</p>' + 
						'<p style="font-size:0.7rem;color:#666666;">整改期限：' + item.StartTime + '-' + item.EndTime + '</p>' +
						'<p style="font-size:0.7rem;color:#666666;" class="Equipment_patrol_ccon2_spanp">整改单位：' + item.OrganiseUnitName+
						'</div></div>'; 
						//console.log(item.status)
				})
				document.getElementById('Equipment_patrol_con1').innerHTML = html;
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	};
	WebApp_GetRectifyList(localStorage.getItem('OrganiseUnitCode'));

	//	mui('.Equipment_patrol_con_list').on('tap', '#Equipment_patrol_status1', function() {
	//		WebApp_ExamineWorkTask_ISM(localStorage.getItem('OrganiseUnitCode'), 0);
	//	})
	//	mui('.Equipment_patrol_con_list').on('tap', '#Equipment_patrol_status2', function() {
	//		WebApp_ExamineWorkTask_ISM(localStorage.getItem('OrganiseUnitCode'), 1);
	//	})
	//	mui('.Equipment_patrol_con_list').on('tap', '#Equipment_patrol_status3', function() {
	//		WebApp_ExamineWorkTask_ISM(localStorage.getItem('OrganiseUnitCode'), 2);
	//	})

})