mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
		//		backbutton: false //关闭back按键监听
	}
});
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	//	var IndicatorID = self.IndicatorID;
	var OrderID = self.OrderID;

	function WebApp_GetRectifyInfo(OrderID) {
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetRectifyInfo?dataKey=00-00-00-00&OrderID=' + OrderID;
		console.log(url);
		mui.ajax(url, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var getDatas1 = data['DataSource']['Tables'][1]['Datas'];
				var html = '';
				var html1 = '';
				//				var TaskDescript = getDatas1[0].TaskDescript.replace(/&lt;br\/&gt;/g,"<br/>");
				document.getElementById("Microtask1list2").innerHTML = getDatas[0].OrderCode;
				document.getElementById("Microtask1list3").innerHTML = getDatas[0].OrderName;
				document.getElementById("Microtask1list4").innerHTML = getDatas[0].RectifyContent;
				document.getElementById("Microtask1list6").innerHTML = getDatas[0].OrderUser;
				document.getElementById("Microtask1list7").innerHTML = getDatas[0].OrderDate;
				document.getElementById("Microtask1list6").innerHTML = getDatas[0].ReceiveUser;
				document.getElementById("Microtask1list7").innerHTML = getDatas[0].ReceiveDate;

				document.getElementById("Microtask1list8").innerHTML = getDatas[0].ProcDescript;
				document.getElementById("Microtask1list9").innerHTML = getDatas[0].ProcRecordUser;
				document.getElementById("Microtask1list4_1").innerHTML = getDatas[0].ProcDescript;
				document.getElementById("Microtask1list8_1").innerHTML = getDatas[0].ProcAuditUser;
				document.getElementById("Microtask1list9_1").innerHTML = getDatas[0].ProcAuditDate;
//				document.getElementById("Microtask1list11").innerHTML = getDatas[0].ProcAuditUser;
//				document.getElementById("Microtask1list12").innerHTML = getDatas[0].ProcAuditDate;




//				mui.each(getDatas1, function(index, item) {
//					html += '<span class="Micro_task_pspan_img">' +
//						'<span   style="width:20%;" >' +
//						'<img src="' + item.Url + '" data-preview-src="" data-preview-group="1"/>' +
//						'<font style="line-height: 1rem;">' + item.Title + '</font>' +
//						'<font></font>' +
//						'</span>' +
//						'</span>'
//				})
//				document.getElementById("Microtask1list13").innerHTML = html;
//				var Level = "";
//				if(!getDatas1[0].EstimateLevel) {
//					Level = '&nbsp';
//				} else {
//					var index = getDatas1[0].EstimateLevel - 1;
//					Level = getDatas[index].Name;
//				}
//
//				//mui.each(getDatas, function(index, item) {
//				html1 += '<p style="font-size:0.7rem;color:#757575;" class="Micro_task_pspan">' +
//					'<span  class="fontSize">工作评价：<font>' + Level + '</font></span>' +
//					'<span  class="fontSize">评论时间：<font>' + getDatas1[0].EstimateTime + '</font></span>' +
//					'</p>' +
//					'<p>备注：</p>' +
//					'<p style="color:#999999" >' + getDatas1[0].Estimate + '</p>'
//				//				})
//				document.querySelector(".Micro_task_1_list_pingjia").innerHTML = html1;
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	};
	WebApp_GetRectifyInfo(OrderID);
	mui.previewImage();
})