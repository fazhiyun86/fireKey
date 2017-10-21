mui.init();

mui.plusReady(function() {

	plus.nativeUI.showWaiting('加载中...') /*ios基础上为安卓端修改*/
	var ApplicationID = 'e2b16b1a-a0ab-11e6-b7b0-02004c4f4f50';
	//	var ApplicationID = 'a121e2e6-c0e6-11e6-98bc-000c29624c55';
	
	// 更新下载的情况需要
	var appID = '25074475045226193'

	localStorage.setItem('ApplicationID', ApplicationID);
	var serverAddress, portNum;
	if(localStorage.getItem('serverAddress') != null && localStorage.getItem('portNum') != null) {
		document.getElementById("serverAddress").value = localStorage.getItem('serverAddress');
		document.getElementById("portNum").value = localStorage.getItem('portNum');
	} else if(document.getElementById('serverAddress').value.length == 0) {

		mui('.mui-off-canvas-wrap').offCanvas('toggle');
	} else {
		serverAddress = document.getElementById("serverAddress").value;
		portNum = document.getElementById("portNum").value;
		localStorage.setItem("serverAddress", serverAddress);
		portNum = 8002;
		localStorage.setItem("portNum", portNum);
	}

	plus.screen.lockOrientation("portrait-primary"); //禁止横屏

	//系统设置侧滑打开
	var NumTime = 0;
	function five() {
		NumTime += 1;
		if(NumTime >= 5) {
			NumTime = 0;
			mui('.mui-off-canvas-wrap').offCanvas('toggle');
		}
	}
	setInterval(function() {
		NumTime = 0;
	}, 5000);
	
	document.querySelector('#logo').addEventListener('tap', function() {
		
		five();
	});
	
	
	
//	mui('.mui-off-canvas-wrap').offCanvas('toggle');
//	document.querySelector('.checkUpdate').addEventListener('tap', function() {
////		mui.toast('当前版本1.0.1');
//	});

	//	document.querySelector('.quitUse').addEventListener('tap', function() {
	//		mui('.mui-off-canvas-wrap').offCanvas('toggle');
	//		serverAddress = document.getElementById("serverAddress").value;
	//		portNum = document.getElementById("portNum").value;
	//		localStorage.setItem("serverAddress", serverAddress);
	//		localStorage.setItem("portNum", portNum);
	//		mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetApplicationInfo?dataKey=00-00-00-00&ApplicationID=' + localStorage.getItem('ApplicationID'), {
	//			data: null,
	//			dataType: 'json', //返回
	//			type: 'get',
	//			timeout: 5000,
	//			success: function(data) {
	//				//服务器返回响应，根据响应结果，分析是否登陆成功
	//				var getDatas = data['DataSource']['Tables'][0]['Datas'];
	//				mui.each(getDatas, function(index, item) {
	//					document.getElementById('logo_name_1').innerHTML = item.ApplicationName;
	//					document.getElementById('logo_name_2').innerHTML = item.ShortName;
	//					document.getElementById('logo').innerHTML = "<img src = " + "http://" + localStorage.getItem('serverAddress') + ":" + localStorage.getItem('portNum') + item.IconUrl + ">"
	//				});
	//
	//			},
	//			error: function() {
	//				//异常处理
	//				mui.toast('数据请求失败')
	//			}
	//		});
	//	})

	//关闭侧滑菜单触发主页面ajax请求
	document.getElementById("backdrop").addEventListener('tap', function() {
		
		//阻止默认事件
		event.detail.gesture.preventDefault();
		serverAddress = document.getElementById("serverAddress").value;
		portNum = document.getElementById("portNum").value;
		localStorage.setItem("serverAddress", serverAddress);
		localStorage.setItem("portNum", portNum);
		mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetApplicationInfo?dataKey=00-00-00-00&ApplicationID=' + localStorage.getItem('ApplicationID'), {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				
				mui.each(getDatas, function(index, item) {
					document.getElementById('logo_name_1').innerHTML = item.ApplicationName;
					document.getElementById('logo_name_2').innerHTML = item.ShortName;
					document.getElementById('logo').innerHTML = "<img src = " + "http://" + localStorage.getItem('serverAddress') + ":" + localStorage.getItem('portNum') + item.IconUrl + ">"
				});

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	});

	document.querySelector('.mui-inner-wrap').addEventListener('drag', function(event) {
		event.stopPropagation();
	})

	//点击保存按钮，保存端口号，对应的服务器ip，侧滑关闭
	//	document.getElementById("save").addEventListener('tap', function() {
	//		mui('.mui-off-canvas-wrap').offCanvas('toggle');
	//		serverAddress = document.getElementById("serverAddress").value;
	//		portNum = document.getElementById("portNum").value;
	//		localStorage.setItem("serverAddress", serverAddress);
	//		localStorage.setItem("portNum", portNum);
	//		mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetApplicationInfo?dataKey=00-00-00-00&ApplicationID=' + localStorage.getItem('ApplicationID'), {
	//			data: null,
	//			dataType: 'json', //返回
	//			type: 'get',
	//			timeout: 5000,
	//			success: function(data) {
	//				//服务器返回响应，根据响应结果，分析是否登陆成功
	//				var getDatas = data['DataSource']['Tables'][0]['Datas'];
	//				mui.each(getDatas, function(index, item) {
	//					document.getElementById('logo_name_1').innerHTML = item.ApplicationName;
	//					document.getElementById('logo_name_2').innerHTML = item.ShortName;
	//					document.getElementById('logo').innerHTML = "<img src = " + "http://" + localStorage.getItem('serverAddress') + ":" + localStorage.getItem('portNum') + item.IconUrl + ">"
	//				});
	//
	//			},
	//			error: function() {
	//				//异常处理
	//				mui.toast('数据请求失败')
	//			}
	//		});
	//	});

	//记住密码模块
	var iActive = document.getElementById("mySwitch").classList.contains("mui-active");
	if(iActive) {
		//console.log("打开状态");
		document.getElementById("userCode").value = localStorage.getItem('userCodeVa');
		document.getElementById("passWord").value = localStorage.getItem('passWordVa');
	} else {
		//console.log("关闭状态"); 
		document.getElementById("userCode").value = null;
		document.getElementById("passWord").value = null;
	}
	//push模块
	/*mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/SendData/WebApp_PostUserToken?datakey=00-00-00-00', {
		data: JSON.stringify({
			user: document.getElementById("userCode").value,
			token: plus.push.getClientInfo().clientid,
		}),
		headers: {
			'Content-Type': 'application/json'
		},
		dataType: 'json',
		type: 'post',
		timeout: 5000,
		processData: false,
		success: function(data) {

		},
	});*/
	//软件更新模块
	var content = {
		"status": '1.0',
		"version": "1.0.1", 
		"releaseTime": "2017-08-15"
	};
			
	var server = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_CheckAppVersion?dataKey=00-00-00-00&AppVersion=' + content.version + '&appID=' + appID;
		
	document.querySelector(".version").innerHTML = 'FPC_tz_jg_v'+content.version;
	document.querySelector(".releaseTime").innerHTML = content.releaseTime;
	document.querySelector('.checkUpdate').addEventListener('tap', function() {
		if(mui.os.android) {
			mui.toast('当前版本'+content.version);
			mui.getJSON(server, null, function(data) {
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				if(getDatas[0].appinfo != '1') {
					plus.nativeUI.confirm(' ', confirmCB, '版本更新', ['取消', '确认']);
	
					function confirmCB(event) {
						if(event.index == 1) {
							var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + getDatas[0].appName; // 下载文件地址
							var dtask = plus.downloader.createDownload('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + getDatas[0].appinfo, {}, function(d, status) {
								if(status == 200) { // 下载成功
									var path = d.filename;
									plus.runtime.install(path);
								} else { //下载失败
									alert("Download failed: " + status);
								}
							});
							dtask.start();
						}
					}
				}
			});
		}
	});

	//登录模块
	//有缓存自动登录
	if(localStorage.getItem('userCodeVa') && localStorage.getItem('passWordVa')) {
		var userCodeVa = localStorage.getItem('userCodeVa');
		var passWordVa = localStorage.getItem('passWordVa');
		mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/User/UserLogin', {
			data: JSON.stringify({
				UserCode: userCodeVa,
				Password: passWordVa,
				ApplicationID: localStorage.getItem('ApplicationID')
			}),
			headers: {
				'Content-Type': 'application/json'
			}, //提交
			dataType: 'json', //返回
			type: 'post',
			timeout: 5000,
			processData: false,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				// var getDatas = data['DataSource']['Tables'][0]['Datas'];
				// mui.each(getDatas, function (index, item) {					 	
				if(data.msg == 1) {

					localStorage.setItem('UnitCode', data.UnitCode);
					localStorage.setItem('OrganiseUnitCode', data.UnitCode);
					var isActive = document.getElementById("mySwitch").classList.contains("mui-active");

					if(isActive) {
						localStorage.setItem('userCodeVa', userCodeVa);
						localStorage.setItem('passWordVa', passWordVa);
						document.getElementById("userCode").value = localStorage.getItem('userCodeVa');
						document.getElementById("passWord").value = localStorage.getItem('passWordVa');
					} else {
						//document.getElementById("userCode").value = null;
						document.getElementById("passWord").value = null;
						localStorage.setItem('userCodeVa', document.getElementById("userCode").value);
						localStorage.setItem('passWordVa', document.getElementById("passWord").value);
					}
					/*plus.webview.open('main.html','main',null,"slide-in-right");*/
					mui.openWindow({
						url: 'main.html',
						id: 'main',
						styles: {

						},
						extras: {
							userCodeVa: document.getElementById("userCode").value
						},
						createNew: false,
						show: {
							autoShow: true,
							aniShow: 'fade-in',
							duration: 200,
						},
						waiting: {
							autoShow: true,
							title: '正在加载',
							options: {

							}
						}
					})

				} else {
					mui.toast(data.msg)
				}

				//});
			},
			error: function() {
				//异常处理
				//console.log(type);
				mui.toast('数据请求失败')
			}
		});
	};
	
	//点击按钮登录
	mui(".mui-btn-primary")[0].addEventListener('tap', function() {

		//检查姓名是否填写
		var NameVal = $('#userCode').val();

		if(NameVal.length==0){
			mui.toast("输入登录账号");
			return false;
		}
		var PassVal = $('#passWord').val();
		if(PassVal.length==0){
			mui.toast("输入登录密码！");
			return false;
		}

		var userCodeVa = document.getElementById("userCode").value;
		var passWordVa = document.getElementById("passWord").value;
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/User/UserLogin';
		
		mui.ajax(url, {
			data: JSON.stringify({
				UserCode: userCodeVa,
				Password: passWordVa,
				ApplicationID: localStorage.getItem('ApplicationID')
			}),
			headers: {
				'Content-Type': 'application/json'
			}, //提交
			dataType: 'json', //返回
			type: 'post',
			timeout: 5000,
			processData: false,
			success: function(data) {
//				console.log(JSON.stringify(data))
				//服务器返回响应，根据响应结果，分析是否登陆成功
				// var getDatas = data['DataSource']['Tables'][0]['Datas'];
				// mui.each(getDatas, function (index, item) {			
				if(data.msg == 1) {

					localStorage.setItem('UnitCode', data.UnitCode);
					localStorage.setItem('OrganiseUnitCode', data.UnitCode);
					var isActive = document.getElementById("mySwitch").classList.contains("mui-active");

					if(isActive) {
						localStorage.setItem('userCodeVa', userCodeVa);
						localStorage.setItem('passWordVa', passWordVa);
						document.getElementById("userCode").value = localStorage.getItem('userCodeVa');
						document.getElementById("passWord").value = localStorage.getItem('passWordVa');
					} else {
						//document.getElementById("userCode").value = null;
						document.getElementById("passWord").value = null;
						localStorage.setItem('userCodeVa', document.getElementById("userCode").value);
						localStorage.setItem('passWordVa', document.getElementById("passWord").value);
					}

					/*plus.webview.open('main.html','main',null,"slide-in-right");*/
					mui.openWindow({
						url: 'main.html',
						id: 'main',
						styles: {

						},
						extras: {
							userCodeVa: document.getElementById("userCode").value
						},
						createNew: false,
						show: {
							autoShow: true,
							aniShow: 'fade-in',
							duration: 200,
						},
						waiting: {
							autoShow: true,
							title: '正在加载',
							options: {

							}
						}
					})

				} else {
					mui.toast(data.msg)
				}

				//});
			},
			error: function() {
				//异常处理
				//console.log(type);
				mui.toast('数据请求失败')
			}
		});
	});

	//登录页面header部分数据展示
	var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetApplicationInfo?dataKey=00-00-00-00&ApplicationID=' + localStorage.getItem('ApplicationID');
	mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetApplicationInfo?dataKey=00-00-00-00&ApplicationID=' + localStorage.getItem('ApplicationID'), {
		data: null,
		dataType: 'json', //返回
		type: 'get',
		timeout: 10000,
		success: function(data) {
			//服务器返回响应，根据响应结果，分析是否登陆成功
			var getDatas = data['DataSource']['Tables'][0]['Datas'];
			localStorage.setItem('ApplicationName',getDatas[0].ApplicationName);
			mui.each(getDatas, function(index, item) {
				document.getElementById('logo_name_1').innerHTML = item.ApplicationName;
				document.getElementById('logo_name_2').innerHTML = item.ShortName;
				document.getElementById('logo').innerHTML = "<img src = " + "http://" + localStorage.getItem('serverAddress') + ":" + localStorage.getItem('portNum') + item.IconUrl + ">"

				plus.nativeUI.closeWaiting(); /*ios基础上为安卓端修改*/
				//console.log( "<img src = " + "http://" + localStorage.getItem('serverAddress') + ":" + localStorage.getItem('portNum') + item.IconUrl + ">")
			});
		},
		error: function() {
			//异常处理
			mui.toast('数据请求失败')
		}
	});

	var hei = document.documentElement.clientHeight;
	//解决页面软键盘弹起问题
	window.onresize = function() {
		if(document.documentElement.clientHeight < hei) {
			//
			document.querySelector(".logo_name_1").style.marginTop = '-0.2px';
			document.querySelector(".logo_name_2").style.marginTop = '10.4px';
			document.querySelector(".logo").style.marginTop = '38.35px';
			//			document.querySelector(".logo_name_1").style.visibility = "hidden";
			//			document.querySelector(".logo_name_2").style.visibility = "hidden";
			//
//			document.querySelector('.footer').style.opacity = '0';

		} else {
			document.querySelector(".logo_name_1").style.marginTop = '19.8px';
			document.querySelector(".logo_name_2").style.marginTop = '30.4px';
			document.querySelector(".logo").style.marginTop = '58.35px';
			//			document.querySelector(".logo_name_1").style.visibility = "initial";
			//			document.querySelector(".logo_name_2").style.visibility = "initial";

//			document.querySelector('.footer').style.opacity = '1';
		}

	}
	setTimeout(function() {
		document.querySelector(".logo_name_1").style.marginTop = '19.8px';
		document.querySelector(".logo_name_2").style.marginTop = '30.4px';
		document.querySelector(".logo").style.marginTop = '58.35px';
	},6000)
})