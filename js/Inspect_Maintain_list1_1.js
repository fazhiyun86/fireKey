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
document.getElementById("address22").innerHTML = localStorage.getItem('index_name');
	function WebApp_GetEMMTaskGroup(Id) {
		var urlTask = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEMMTaskGroup?dataKey=00-00-00-00&TaskID=' + Id;
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
					'<input class="sendId1" type="hidden" value="'+ item.TaskGroupID +'" />'+
					'<input class="sendId1" type="hidden"value="'+ TaskName +'" />'+
					'<div style="width:100%;text-align:left;"><p>' +
						item.TaskGroupName +
						'</p>' +
						'<p class="Equipment_patrol_list1_1_data"><span>保养单位：' +
						item.TaskGroupName +
						'</span><span>完成检查：' +
						item.TotalObjectCount +
						'</span><span>异常检查项：' +
						item.ErrObjectCount +
						'</span></p>' +
						'</div></div>';
				})
				document.getElementById('Equipment_patrol_list1_1_TaskName').innerHTML = TaskName;
				document.getElementById('Equipment_patrol_list1_1_conid1').innerHTML = html;
				
				setTimeout(function() {
					var datas = document.getElementById('Equipment_patrol_list1_1_conid1').innerText;
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
	WebApp_GetEMMTaskGroup(TaskId);

})