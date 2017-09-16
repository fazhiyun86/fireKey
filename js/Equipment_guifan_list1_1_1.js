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
	var TaskGroupID = self.TaskGroupID;
	var TaskName = self.TaskName;
//	console.log(TaskName)
//	console.log(TaskGroupID)
	function WebApp_GetEXAMItem(Id) {
		var urlTask = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEXAMItem?dataKey=00-00-00-00&TaskObjectID=' + Id;
//		console.log(urlTask);
		mui.ajax(urlTask, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var html = '';
				mui.each(getDatas, function(index, item) {
					html += 
					'<div class="Equipment_patrol_con1">'+
					'<input class="sendId1" type="hidden"value="'+ item.TaskItemID +'" />'+
					'<input class="sendId1" type="hidden"value="'+ TaskName +'" />'+
					'<div>' +
						'<p>' +
						item.ItemName +
						'</p>' +
						'<p class="Equipment_patrol_list1_1_1_p">' +
						'<span>检查人：' +
						item.ExamUser +
						'</span><span>评分标准:' +
						item.StandardScore +
						'</span><span>分数：' +
						item.Score +
						'</span><span>检查时间：' +
						item.ExamTime +
						'</span></p>' +
						'</div></div>';
				})
				document.getElementById('list1askName1').innerHTML = TaskName;
				document.getElementById('conid1').innerHTML = html;
				
				setTimeout(function() {
					var datas = document.getElementById('conid1').innerText;
					if( datas == '') {
						mui.toast('网络环境不佳');
					}
				}, 4000)
				
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}
	WebApp_GetEXAMItem(TaskGroupID);

})