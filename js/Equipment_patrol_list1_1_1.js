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
	console.log(TaskName)
	console.log(TaskGroupID)
	
	function WebApp_GetISMObject(Id) {
		var urlTask = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetISMObject?dataKey=00-00-00-00&TaskGroupID=' + Id;
		console.log(urlTask);
		mui.ajax(urlTask, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var html = '';
				var fontColor = ['color:#484848','color:#E70012'];
				var ClolorErr = '';
				mui.each(getDatas, function(index, item) {
//					console.log(item.IsNormal+item.EquipmentCode) 
					if(item.InspectTime && item.IsNormal == 0){  
						ClolorErr = fontColor[1];
					}else{
						ClolorErr = fontColor[0];
					}
					
					html += 
					'<div class="Equipment_patrol_con1">'+
					'<input class="sendId1" type="hidden"value="'+ item.TaskObjectID +'" />'+
					'<input class="sendId1" type="hidden"value="'+ TaskName +'" />'+
					'<div>' +
						'<p style=' + ClolorErr + '>' + 
						item.EquipmentName +
						'</p>' +
						'<p class="Equipment_patrol_list1_1_1_p">' +
						'<span>设备编号：' +
						item.EquipmentCode +
						'</span><span>设备型号' +
						item.ModelName +
						'</span><span>检查时间：' +
						item.InspectTime +
						'</span><span>设备位置：' +
						item.Positions +
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
	WebApp_GetISMObject(TaskGroupID);

})