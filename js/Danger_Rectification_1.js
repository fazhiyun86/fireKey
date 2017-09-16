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
				
				var imgUrl = '';
				var imgVideo = '';
				var imgMp3 = '';
				//var TaskDescript = getDatas1[0].TaskDescript.replace(/&lt;br\/&gt;/g,"<br/>");
				document.getElementById("Microtask1list2").innerHTML = getDatas[0].OrderCode;
				document.getElementById("Microtask1list3").innerHTML = getDatas[0].OrderName;
				document.getElementById("Microtask1list4_22").innerHTML = getDatas[0].RectifyContent;
				document.getElementById("Microtask1list6").innerHTML = getDatas[0].OrderUser;
				document.getElementById("Microtask1list7").innerHTML = getDatas[0].OrderDate;
				document.getElementById("Microtask1list6").innerHTML = getDatas[0].ReceiveUser;
				document.getElementById("Microtask1list7_1").innerHTML = getDatas[0].ReceiveDate;

				document.getElementById("Microtask1list8").innerHTML = getDatas[0].ProcRecordUser;
				document.getElementById("Microtask1list9").innerHTML = getDatas[0].ProcRecordDate;
				document.getElementById("Microtask1list4_1").innerHTML = getDatas[0].ProcDescript;


				document.getElementById("Microtask1list8_1").innerHTML = getDatas[0].ProcVerifyUser;
				document.getElementById("Microtask1list9_1").innerHTML = getDatas[0].ProcVerifyDate;
				document.getElementById("Microtask1list10").innerHTML = getDatas[0].ProcVerifyDescript;

				document.getElementById("Microtask1list11").innerHTML = getDatas[0].ProcAuditUser;
				document.getElementById("Microtask1list12").innerHTML = getDatas[0].ProcAuditDate;
				document.getElementById("Microtask1list13").innerHTML = getDatas[0].ProcAuditDescript;

				mui.each(getDatas1, function(index, item) {
//					console.log(localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + item.Url)

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
						'<span class="Micro_task_pspan_img">' +
						'<span  style="width:20%;" >' +
						'<img  style="height: 3.5rem;" src="http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + item.Url + '" data-preview-src="" data-preview-group="1"/>' +
						'<font style="line-height: 1rem;">' + item.Title + '</font>' +
						'</span>'+
						'</span>';
					}
					
					if(typeT == '.mp4' || typeT == '.avi' || typeT == '.flv' || typeT == '.rmvb' || typeT == '.wmv' || typeT == '.3gp' || typeT == '.mkv' || typeT == '.mov' || typeT == '.ogg') {
						imgVideo +=
						'<span class="Micro_task_pspan_img pspan_Video">' +
							'<input type="hidden" value="' + item.Url + '" />' +
							'<span style="width:20%;" >' +
							'<img  style="height: 3.5rem;" src="images/shipin.png"/>' +
							'<font style="line-height: 1rem;">' + item.Title + '</font>' +
						'</span>'+
						'</span>';
						
							
					}

					if(typeT == '.mp3' || typeT == '.wma' || typeT == '.wav') {
						imgMp3 +=
							'<span class="Micro_task_pspan_img" style="margin-top: 0;width:98%!important;display:block;">' +
							'<audio style="height: 47px;width:100%;" src="' + 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + item.Url + '"' + 'controls="controls">' +
							'</span>';
					}
				
				})

				if(imgUrl != 0) {
					document.getElementById('Microtask1listImg1').innerHTML = imgUrl;
				} else {
					$("#Microtask1listImg1").remove();
				}
				if(imgVideo != 0) {
					document.getElementById('Microtask1listVideo1').innerHTML = imgVideo;
				} else {
					$("#Microtask1listVideo1").remove();
				}
				if(imgMp3 != 0) {
					document.getElementById('Microtask1listMp31').innerHTML = imgMp3;
				} else {
					$("#Microtask1listMp31").remove();
				}
				
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
	
		//视屏播放处理
	mui('#Microtask1listVideo1').on('tap', '.pspan_Video', function() {
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