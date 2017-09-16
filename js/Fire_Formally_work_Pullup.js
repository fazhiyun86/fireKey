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

var count = -1;
var html = '';

function pullupRefresh() {
	var PageSize = 20;

	function WebApp_GetFireworkList(UnitCode, PageIndex, PageSize) {
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetFireworkList?dataKey=00-00-00-00&UnitCode=' + UnitCode + '&PageIndex=' + PageIndex + '&PageSize=' + PageSize;
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
				if(getDatas.length >= PageSize) {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
				} else {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				}

				var stutsNum = [
					'<i class="iconfont icon-duigou-copy"style="color:#7FB80E"></i>',
					'<i class="iconfont icon-jinzhi"style="color:#DB4527"></i>',
					'<i class="iconfont icon-cuowu1" style="color:#DB4527"></i>',
					'<i class="iconfont icon-shijian" style="color:#877EED"></i>',
					'<i></i>',
					'<i class="iconfont icon-zhuyishixiang"style="color:#DB4527"></i>',
					'<i></i>'
				];
				mui.each(getDatas, function(index, item) {
					var bai = ((Number(item.ExamObjectCount) / Number(item.TotalObjectCount)) * 100).toFixed(2) + "%";
					//console.log(item.ExamObjectCount / );
					//					console.log(item.Status)
					html +=
						'<div class="Equipment_patrol_con1">' +
						'<input class="sendId" type="hidden"value="' + item.PermitID + '" />' +
						'<div class="Equipment_patrol_ccon1" style="width:5%;">' +
						stutsNum[Number(item.Status)] +
						'</div>' +
						'<div class="Equipment_patrol_ccon2">' +
						'<p style="font-size:0.85rem;width: 100%;">动火部位：' + item.RegionName + '</p>' +
						'<p style="font-size:0.7rem;color:#666666;width: 50%;">作业种类：' + item.JobType +
						'<p style="font-size:0.7rem;color:#666666;width: 50%;">作业级别：' + item.JobLevel + '</p>' +
						'<p style="font-size:0.7rem;color:#666666;width: 50%;">动火证书：' + item.PermitCode +
						'<p style="font-size:0.7rem;color:#666666;width: 50%;">申请单位：' + item.ApplyCompany +
						'<p style="font-size:0.85rem;width: 100%;">作业期限：' + item.StartTime + '-' + item.EndTime + '</p>' +
						'</div></div>';
					//	console.log(item.status)
				})
				document.getElementById('Equipment_patrol_con1').innerHTML = html;
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	};

	WebApp_GetFireworkList(localStorage.getItem('UnitCode'), ++count, PageSize);

}

mui.plusReady(function() {
	document.getElementById("address11").innerHTML = localStorage.getItem('index_name');

	function WebApp_GetFireworkList(UnitCode) {
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetFireworkList?dataKey=00-00-00-00&UnitCode=';
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
				console.log(getDatas.length)
				if(getDatas.length >= PageSize) {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
				} else {
					mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
				}
				//				if(getDatas <= 0) {
				//					document.querySelector(".Equipment_patrol_con").innerHTML = '<p style="text-align:center;"><span style="font-size:0.9rem;color:#999999;">暂无数据</span></p>';
				//					return;
				//				}

				var html = '';
				var stutsNum = [
					'<i class="iconfont icon-shijian" style="color:#877EED"></i>',
					'<i class="iconfont icon-iconshandianfahuo" style="color:#DB4527"></i>',
					'<i class="iconfont icon-duigou-copy"style="color:#7FB80E"></i>',
					'<i class="iconfont icon-jinzhi"style="color:#DB4527"></i>',
					'<i class="iconfont icon-zhuyishixiang"style="color:#DB4527"></i>'
				];
				mui.each(getDatas, function(index, item) {
					var bai = ((Number(item.ExamObjectCount) / Number(item.TotalObjectCount)) * 100).toFixed(2) + "%";
					//console.log(item.ExamObjectCount / );
					//console.log(item.Status)
					html +=
						'<div class="Equipment_patrol_con1">' +
						'<input class="sendId" type="hidden"value="' + item.PermitID + '" />' +
						'<div class="Equipment_patrol_ccon1">' +
						stutsNum[Number(item.Status) - 1] +
						'</div>' +
						'<div class="Equipment_patrol_ccon2">' +
						'<p style="font-size:0.85rem;width: 100%;">动火部位：' + item.RegionName + '</p>' +
						'<p style="font-size:0.7rem;color:#666666;width: 50%;">作业种类：' + item.JobType +
						'<p style="font-size:0.7rem;color:#666666;width: 50%;">作业级别：' + item.JobLevel + '</p>' +
						'<p style="font-size:0.7rem;color:#666666;width: 50%;">动火证书：' + item.PermitCode +
						'<p style="font-size:0.7rem;color:#666666;width: 50%;">申请单位：' + item.ApplyCompany +
						'<p style="font-size:0.85rem;width: 100%;">作业期限：' + item.StartTime + '-' + item.EndTime + '</p>' +
						'</div></div>';
					//	console.log(item.status)
				})
				document.getElementById('Equipment_patrol_con1').innerHTML = html;
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	};

	//	WebApp_GetFireworkList(localStorage.getItem('UnitCode'));

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