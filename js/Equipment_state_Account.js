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

	function WebApp_GetEqListByClass(UnitCode) {
		var urlTask = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEqListByClass?dataKey=00-00-00-000&ClassCode=' + ClassCode + '&UnitCode=' + UnitCode;
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
					//					<div>
					//						<p>烟感报警器</p>
					//						<p style="width:35%">CD45S64W4514</p>
					//						<p style="width:15%">正常</p>
					//						<p>监控警报</p>
					//					</div>
					html += 
						'<div class="conSend" style="overflow-x: hidden;">' +
						'<input class="sendId1" type="hidden"value="' + item.EquipmentCode + '" />' +
						'<p style="width:35%">' + item.EquipmentName + '</p>' +
						'<p style="width:25%">' + item.EquipmentCode + '</p>' +
						'<p style="width:15%">' + item.EquipmentStatus + '</p>' +
						'<p style="width:25%">' + item.ClassName + '</p>' +
						'</div>';
				})
				document.getElementById("Equipment_c2").innerHTML = html;
				
				setTimeout(function(){
					var datas = document.getElementById("Equipment_c2").innerText;
					if(datas == ''){
						mui.toast('网络环境不佳')
					}
				},4000)

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}

		});
	}
	WebApp_GetEqListByClass(localStorage.getItem('UnitCode'))
})