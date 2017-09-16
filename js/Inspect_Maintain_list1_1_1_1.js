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

	function WebApp_GetEmmObjectInfo(Id) {
		var urlTask = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEmmObjectInfo?dataKey=00-00-00-00&TaskObjectID=' + Id;
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

				var imgUrl = '';
				var imgVideo = '';
				var imgMp3 = '';

				mui.each(getDatas, function(index, item) {
					//					console.log(item.ItemData)
					var replac = eval((item.ItemData).replace(/&apos;+/ig, "'"));
					console.log(replac)
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
				//console.log(htmlArr)
				document.getElementById("Equipol1").innerHTML = htmlArr;
				mui.each(getDatas1, function(index, item) {

//					var iimg = '/uploadfiles/2017/20170725/1126/20170725112621233868.jpg';
//					var mp4 = '/uploadfiles/2017/20170725/1126/20170725112612076717.mp4';
//					var mp3 = '/uploadfiles/2017/20170725/1126/20170725112632232235.mp3';
					var dat = item.Url;
					var typeT = String(test(dat)).toLowerCase();

					function test(file_name) {
						var result = /\.[^\.]+/.exec(file_name);
						return result;
					}
					if(typeT == '.jpg' || typeT == '.jpeg' || typeT == '.JPEG' || typeT == '.png' || typeT == '.gif' || typeT == '.bmp' || typeT == '.tif' || typeT == '.psd') {
						imgUrl +=
							'<span >' +
							'<img  style="height: 3.5rem;" src="' + 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + item.Url + '" data-preview-src="" data-preview-group="1"/>' +
							'<font style="word-break:break-all;">' + item.Title + '</font>';
						'</span>';
					}

					if(typeT == '.mp4' || typeT == '.avi' || typeT == '.flv' || typeT == '.rmvb' || typeT == '.wmv' || typeT == '.3gp' || typeT == '.mkv' || typeT == '.mov' || typeT == '.ogg') {
						imgVideo +=
							'<span class="eqVideo">' +
							'<input type="hidden" value="' + item.Url + '" />' +
							'<img  style="height: 3.5rem;" src="images/shipin.png"/>' +
							'<font style="word-break:break-all;">' + item.Title + '</font>'+
						'</span>';
					}

					if(typeT == '.mp3' || typeT == '.wma' || typeT == '.wav') {
						imgMp3 +=
							'<span class="Micro_task_pspan_img" style="margin-top: 0;width:98%!important;display:block;">' +
							'<audio style="height: 47px;width:100%;" src="' + 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + item.Url + '"' + 'controls="controls">' +
							'</span>';
					}

				})
				//console.log(imgUrl)
				if(imgUrl != 0) {
					document.getElementById('patrol_img').innerHTML = imgUrl;
				} else {
					$("#patrol_img").remove();
				}
				if(imgVideo != 0) {
					document.getElementById('patrol_video').innerHTML = imgVideo;
				} else {
					$("#patrol_video").remove();
				}
				if(imgMp3 != 0) {
					document.getElementById('patrol_mp3').innerHTML = imgMp3;
				} else {
					$("#patrol_mp3").remove();
				}

				document.getElementById("Equipment_name1").innerHTML = localStorage.getItem('index_name');
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}

		});
	}
	WebApp_GetEmmObjectInfo(TaskObjectID);
	mui.previewImage();
	
		//视屏播放处理
	mui('#patrol_video').on('tap', '.eqVideo', function() {
//		console.log(this.firstChild.value)
		mui.openWindow({
			url: 'Video.html',
			id: 'Video.html',
			styles: {
				top: 0, //新页面顶部位置
				bottom: 0, //新页面底部位置
			},
			extras: {
				videoUrl: this.firstChild.value,
			},
			show: {
				duration: '300'
			},
			waiting: {
				autoShow: true, //自动显示等待框，默认为true
				title: '加载中...', //等待对话框上显示的提示内容
			}
		});
	})
	
})