mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
		//		backbutton: false //关闭back按键监听
	}
});
mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	var TaskObjectID = self.TaskObjectID;
	var TaskName = self.TaskName;

	function WebApp_GetISMObjectInfo(Id) {
		var urlTask = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetISMObjectInfo?dataKey=00-00-00-00&TaskObjectID=' + Id;
		console.log(urlTask);
		mui.ajax(urlTask, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {

				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var getDatas1 = data['DataSource']['Tables'][1]['Datas'];
				//var html = '';
				var checkMode = [];
				var imgUrl = '';
				var htmlArr = '';
				var stuts = ['<i class="iconfont icon-zhuyishixiang" style="font-size:1rem;margin-right:0.4rem;color:#FF5722;"></i>', '<i class="iconfont icon-dangan1" style="font-size:1rem;color:#E70012;margin-right:0.4rem;color:#505050;"></i>']
				var color = ['#FF5722', '#505050'];

				mui.each(getDatas, function(index, item) {
					var replac = eval((item.ItemData).replace(/&apos;+/ig, "'"));
					if(replac) {
						for(var i = 0; i < replac.length; i++) {
							htmlArr += '<p>' +
								'<span>' + stuts[replac[i].IsNormal] + '<font>' + replac[i].DisplayName + '</font></span>' +
								'<span id="patrolfont1" style=color:' + color[replac[i].IsNormal] + ';>' + replac[i].Value + '</span>' +
								'</p>';
						}
					}

					if(item.IsRFIDScan == '1') {
						document.getElementById('patrol6').innerHTML = '检查方式：RFID';
					} else if(item.IsBarCodeScan == '1') {
						document.getElementById('patrol6').innerHTML = '检查方式：条形码';
					} else {
						document.getElementById('patrol6').innerHTML = '检查方式：';
					}

					document.getElementById('Equipment_patrol111').innerHTML = TaskName;
					if(item.EquipmentCode) {
						document.getElementById('patrol1').innerHTML = '设备编号：' + item.EquipmentCode;
					}
					if(item.ModelName) {
						document.getElementById('patrol2').innerHTML = '设备编号：' + item.ModelName;
					}
					if(item.InspectTime) {
						document.getElementById('patrol3').innerHTML = '设备编号：' + item.InspectTime;
					}
					if(item.InspectUser) {
						document.getElementById('patrol4').innerHTML = '设备编号：' + item.InspectUser;
					}
					if(item.Positions) {
						document.getElementById('patrol5').innerHTML = '设备位置：' + item.Positions;
					} 
//					alert(item.Positions)
//					document.getElementById('patrol1').innerHTML = '设备编号：' + item.EquipmentCode;
//					document.getElementById('patrol2').innerHTML = '设备型号：' + item.ModelName;
//					document.getElementById('patrol3').innerHTML = '检查时间：' + item.InspectTime;
//					document.getElementById('patrol4').innerHTML = '检查人：' + item.InspectUser;
//					document.getElementById('patrol5').innerHTML = '设备位置：' + item.Positions;

				})
				//				console.log(htmlArr)
				document.getElementById("Equipol1").innerHTML = htmlArr;
				mui.each(getDatas1, function(index, item) {
					imgUrl += '<span><img src="' + item.Url + '"/>' +
						//'<font>16:22:26</font>';
						'</span>';

				})
				if(imgUrl) {
					document.getElementById('patrol_img').innerHTML = imgUrl;

				}
				document.getElementById("Equipment_name1").innerHTML = localStorage.getItem('index_name');
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}

		});
	}
	WebApp_GetISMObjectInfo(TaskObjectID);

})