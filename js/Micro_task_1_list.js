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
	var TaskID = self.TaskID;

	function CMDS_MiniTask_GetTaskOne(TaskID) {
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/CMDS_MiniTask_GetTaskOne?dataKey=00-00-00-00&TaskID=' + TaskID;
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
				var getDatas2 = data['DataSource']['Tables'][2]['Datas'];
				var html = '';
				var html1 = '';

				var imgUrl = '';
				var imgVideo = '';
				var imgMp3 = '';
				//				var TaskDescript = getDatas1[0].TaskDescript.replace(/&lt;br\/&gt;/g,"<br/>");
				document.getElementById("Microtask1list1").innerHTML = getDatas1[0].TaskName;
				document.getElementById("Microtask1list2").innerHTML = getDatas1[0].Taskcode;
				document.getElementById("Microtask1list3").innerHTML = getDatas1[0].RegionName;
				document.getElementById("Microtask1list4").innerHTML = getDatas1[0].TaskDescript;
				document.getElementById("Microtask1list5").innerHTML = getDatas1[0].TaskStartTime + '至' + getDatas1[0].TaskEndTime;
				document.getElementById("Microtask1list6").innerHTML = getDatas1[0].ExecutorUser;
				document.getElementById("Microtask1list7").innerHTML = getDatas1[0].ReleaseTime;
				document.getElementById("Microtask1list8").innerHTML = getDatas1[0].TaskResult;
				document.getElementById("Microtask1list9").innerHTML = getDatas1[0].PostName;
				document.getElementById("Microtask1list10").innerHTML = getDatas1[0].ExecuteDescript;
				document.getElementById("Microtask1list11").innerHTML = getDatas1[0].ReleaseUser;
				document.getElementById("Microtask1list12").innerHTML = getDatas1[0].ExecuteTime;
				mui.each(getDatas2, function(index, item) {

//					var iimg = '/uploadfiles/2017/20170725/1126/20170725112621233868.jpg';
//					var mp4 = '/uploadfiles/2017/20170725/1126/20170725112612076717.mp4';
//					var mp3 = '/uploadfiles/2017/20170725/1126/20170725112632232235.mp3';
					var dat = item.Url;
					console.log(dat) 
					var typeT = test(dat);
					function test(file_name) {
						var result = file_name.lastIndexOf("\.")
						file_name  = file_name.substring(result + 1, file_name.length).toLowerCase();
						return '.'+file_name;
					}  
					console.log(typeT) 
					
					if(typeT == '.jpg' || typeT == '.jpeg' || typeT == '.JPEG' || typeT == '.png' || typeT == '.gif' || typeT == '.bmp' || typeT == '.tif' || typeT == '.psd') {
						imgUrl += '<span class="Micro_task_pspan_img">' +
							'<span   style="width:20%;" >' +
							'<img  style="height: 3.5rem;" src="'+item.Url + '" data-preview-src="" data-preview-group="1"/>' +
							'<font style="line-height: 1rem;">' + item.Title + '</font>' +
							'<font></font>' +
							'</span>' +
							'</span>';
					}

					if(typeT == '.mp4' || typeT == '.avi' || typeT == '.flv' || typeT == '.rmvb' || typeT == '.wmv' || typeT == '.3gp' || typeT == '.mkv' || typeT == '.mov' || typeT == '.ogg') {
						imgVideo +=
							'<span class="Micro_task_pspan_img MtVideo">' +
							'<input type="hidden" value="' + item.Url + '" />' +
							'<span   style="width:20%;" >' +
							'<img  src="images/shipin.png"/>' +
							'<font style="line-height: 1rem;">' + item.Title + '</font>' +
							'<font></font>' +
							'</span>' +
							'</span>'
					}

					if(typeT == '.mp3' || typeT == '.wma' || typeT == '.wav') {
						imgMp3 +=
							'<span class="Micro_task_pspan_img" style="margin-top: 0;width:98%!important;display:block;">' +
							'<audio style="height: 47px;width:100%;" src="'+ item.Url  + '"controls="controls">' +
							'</span>';
					}
				})
				//				console.log(imgUrl)
				if(imgUrl != 0) {
					document.getElementById('Microtask1list13A').innerHTML = imgUrl;
				} else {
					$("#Microtask1list13A").remove();
				}
				if(imgVideo != 0) {
					document.getElementById('Microtask1list13B').innerHTML = imgVideo;
				} else {
					$("#Microtask1list13B").remove();
				}
				if(imgMp3 != 0) {
					document.getElementById('Microtask1list13C').innerHTML = imgMp3;
				} else {
					$("#Microtask1list13C").remove();
				}

				var Level = "";
				if(!getDatas1[0].EstimateLevel) {
					Level = '&nbsp';
				} else {
					var index = getDatas1[0].EstimateLevel - 1;
					Level = getDatas[index].Name;
				}

				//mui.each(getDatas, function(index, item) {
				html1 += '<p style="font-size:0.65rem!important;" class="Micro_task_pspan">' +
					'<span  class="fontSize">工作评价：<font>' + Level + '</font></span>' +
					'<span  class="fontSize">评论时间：<font>' + getDatas1[0].EstimateTime + '</font></span>' +
					'</p>' +
					'<p style="color: #494949;border-bottom:0; font-size:0.75rem;">备注：</p>' +
					'<p style="color:#ACACB4" >' + getDatas1[0].Estimate + '</p>';
				//				})
				document.querySelector(".Micro_task_1_list_pingjia").innerHTML = html1;
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	};
	CMDS_MiniTask_GetTaskOne(TaskID);
	mui.previewImage();
	
		//视屏播放处理
	mui('#Microtask1list13B').on('tap', '.MtVideo', function() {
		console.log(this.firstChild.value)
		mui.openWindow({
			url: 'VideoWei.html',
			id: 'VideoWei.html',
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