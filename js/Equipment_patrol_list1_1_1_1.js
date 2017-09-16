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
		var urlTask = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetISMObjectInfo?dataKey=00-00-00-00&TaskObjectID=' + Id
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
				var imgVideo = '';
				var imgMp3 = '';
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
				//console.log(htmlArr)

				document.getElementById("Equipol1").innerHTML = htmlArr;

				if(getDatas1 == '') {
					document.getElementById('patrol_img').remove();
					document.getElementById('patrol_video').remove();
					document.getElementById('patrol_mp3').remove();
				}

				mui.each(getDatas1, function(index, item) {
					//console.log(item.Url)
					var dat = item.Url;
					var typeT = String(test(dat)).toLowerCase();

					function test(file_name) {
						var result = /\.[^\.]+/.exec(file_name);
						return result;
					}
//						console.log(String(typeT))
					if(typeT == '.jpg' || typeT == '.jpeg' || typeT == '.JPEG' || typeT == '.png' || typeT == '.gif' || typeT == '.bmp' || typeT == '.tif' || typeT == '.psd') {
						imgUrl +=
							'<p class="imgl">' +
							'<span>' +
							'<img  style="height: 3.5rem;" src="' + 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + item.Url + '" data-preview-src="" data-preview-group="1"/>' +
							'</span>' +
							'<span>' + item.Title + '</span>' +
							'</p>';
						//						'<span><img src="' + 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + item.Url + '" data-preview-src="" data-preview-group="1"/>' +
						//							'<font style="word-break:break-all;">' + item.Title + '</font>';
						//						'</span>';
					}

					if(typeT == '.mp4' || typeT == '.avi' || typeT == '.flv' || typeT == '.rmvb' || typeT == '.wmv' || typeT == '.3gp' || typeT == '.mkv' || typeT == '.mov' || typeT == '.ogg') {
						imgVideo +=
							'<p class="imgl img_video">' +
							'<input type="hidden" value="' + item.Url + '" />' +
							'<span class="iconfont icon-shipin" style="	font-size: 2.5rem;margin-top:0.4rem;"></span>' +
							'<span style="padding-top: 0.5rem;text-align: left;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">' +
							'<font>' + item.Title + '</font></span>' +
							'</p>';
						//							'<span class="iconfont icon-shipin videoV">' +
						//							'<input type="hidden" value="' + item.Url + '" />' +
						//							'<font></font>' +
						//							'</span>';
					}

					if(typeT == '.mp3' || typeT == '.wma' || typeT == '.wav') {
						imgMp3 +=
							'<p class="imgl_2">' +
							'<audio style="height: 47px;width:100%;" src="' + 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + item.Url + '"' + 'controls="controls">' +
							'</audio></p>';
						//							'<span class="iconfont icon-shipin videoV">' +
						//							'<input type="hidden" value="' + item.Url + '" />' +
						//							'<font></font>' +
						//							'</span>';
						//						console.log(imgMp3)
					}
				})

				if(imgUrl) {
					document.getElementById('patrol_img').innerHTML = imgUrl;
				} else {
					$('#patrol_img').remove();
				}
				if(imgVideo) {
					document.getElementById('patrol_video').innerHTML = imgVideo;

				} else {
					$('#patrol_video').remove();
				}
				if(imgMp3) {
					document.getElementById('patrol_mp3').innerHTML = imgMp3;
				} else {
					$('#patrol_mp3').remove();
					
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
	mui.previewImage();

	//视屏播放处理
	mui('#patrol_video').on('tap', '.img_video', function() {
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