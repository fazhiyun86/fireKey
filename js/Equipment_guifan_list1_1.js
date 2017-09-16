mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
//		backbutton: false //关闭back按键监听
	}
});
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var TaskId = self.taskId;
	var TaskName = self.TaskName;
//	console.log(TaskId)
document.getElementById("gaddress22").innerHTML = localStorage.getItem('index_name');
	function WebApp_GetEXAMTaskGroup(Id) {
		var urlTask = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEXAMTaskGroup?dataKey=00-00-00-00&TaskID=' + Id;
		console.log(urlTask);
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
					'<input class="sendId1" type="hidden" value="'+ item.TaskObjectID +'" />'+
					'<input class="sendId1" type="hidden"value="'+ TaskName +'" />'+
					'<div><p style="color:#666666;">' +
						item.TaskObjectName +
						'</p>' +
						'<p class="Equipment_patrol_list1_1_data"><span>检查项目：' +
						item.TotalItemCount +
						'</span><span>完成检查：' +
						item.ExamItemCount +
						'</span><span>异常检查：' +
						item.ErrItemCount +
						'</span></p>' +
						'</div></div>';
						
				})
				document.getElementById('Equipment_guifan_list1_1_TaskName').innerHTML = TaskName;
				document.getElementById('Equipment_guifan_list1_1_conid1').innerHTML = html;
				
				setTimeout(function() {
					var datas = document.getElementById('Equipment_guifan_list1_1_conid1').innerText;
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
	WebApp_GetEXAMTaskGroup(TaskId);

})