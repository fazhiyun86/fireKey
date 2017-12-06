mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
		//		backbutton: true //关闭back按键监听
	}

});
var main, menu;
var showMenu = false,
	mode = 'menu-move';
//实现webview侧滑模块
//function back() {
//	if(showMenu) {
//		//菜单处于显示状态，返回键应该先关闭菜单,阻止主窗口执行mui.back逻辑；
//		closeMenu();
//		return false;
//	} else {
//		//菜单处于隐藏状态，执行返回时，要先close菜单页面，然后继续执行mui.back逻辑关闭主窗口；
//		menu.close('none');
//		return true;
//	}
//}
var page = [];
//			var page  = ['totalTarget_dtpicker.html','equipStatus_area.html'];
function cutWebviewId(url) {
	var startIndex = url.lastIndexOf("/");
	var endIndex = url.lastIndexOf(".html");
	var wvId = url.substring(startIndex + 1, endIndex);
	return wvId;
}
//不同的点击事件触发不同的初始化页面
//mui('.mui-bar').on('tap', '.equipStatus_search', function() {
//	mui.fire(plus.webview.currentWebview().opener(), 'main:maskShow');
//	plus.nativeUI.showWaiting('加载中...');
//	menu = mui.preload({
//		url: page[1],
//		id: cutWebviewId(page[1]),
//		styles: {
//			left: "30%",
//			width: "70%",
//			zindex: 9997
//		}
//	});
//
//	setTimeout(function() {
//		switch(mode) {
//			case 'menu-move':
//				menu.setStyle({
//					left: '100%',
//					zindex: 9999
//				});
//				mode = 'menu-move';
//				break;
//		}
//		plus.nativeUI.closeWaiting()
//		openMenu();
//	}, 300)
//});

mui.plusReady(function() {
	//通过unitCode和ApplicationID获取设备状态接口信息
	//	function equipStatus(unitcode) {
	//		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEqStatusStatistical?dataKey=00-00-00-00&ApplicationID=' + localStorage.getItem('ApplicationID') + '&UnitCode=' + unitcode;
	//		//		console.log(url)
	//		plus.nativeUI.showWaiting('正在加载');
	//		mui.ajax(url, {
	//			data: null,
	//			dataType: 'json', //返回
	//			type: 'get',
	//			timeout: 5000,
	//			success: function(data) {
	//				var arrVal = [];
	//				var arr = [];
	//				//服务器返回响应，根据响应结果，分析是否登陆成功
	//				var getDatas = data['DataSource']['Tables'][0]['Datas'];
	//				mui.each(getDatas, function(index, item) {
	//					//console.log(item.ItemName);
	//					//console.log(item.count);
	//					arr.push(item.ItemName);
	//					arrVal.push(item.count);
	//				});
	//				equipStatus_zhuzhuangtu(arr, arrVal);
	//
	//			},
	//			error: function() {
	//				//异常处理
	//				mui.toast('数据请求失败')
	//			}
	//		});
	//		setTimeout(function() {
	//			plus.nativeUI.closeWaiting();
	//		}, 500);
	//	}
	//	equipStatus(localStorage.getItem("UnitCode"));

	//总量

	//通过ApplicationID  和  UnitCode 得到运维统计设备总数量数据
	function equipNum(UnitCode) {
		plus.nativeUI.showWaiting('正在加载');
//		console.log('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEqTotalCount?dataKey=00-00-00-00&ApplicationID=' + localStorage.getItem('ApplicationID') + '&UnitCode=' + UnitCode);
		mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEqTotalCount?dataKey=00-00-00-00&ApplicationID=' + localStorage.getItem('ApplicationID') + '&UnitCode=' + UnitCode, {
			async: false,
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var arrName = [];
				var arrValue = [];
				var num = 0;
				if(getDatas.length == 0) {
					arrName = ['无', '无'];
					arrValue = ['0', '0'];
				} else {
					mui.each(getDatas, function(index, item) {
						arrName.push(item.ItemName.slice(0, 4));
						arrValue.push(item.count);
						num += parseInt(item.count);
					});
				}
				//				console.log(arrName)
				//				console.log(arrValue)
				//					document.getElementById('numFir').innerHTML = num;
				equipStatus_zhuzhuangtu(arrName, arrValue);
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
		setTimeout(function() {
			plus.nativeUI.closeWaiting();
		}, 500);
	}
	equipNum(localStorage.getItem('UnitCode'));

	//				document.getElementById('searchPlace').value = localStorage.getItem('init_areaName');

	//通过ApplicationID和UnitCode来获取分类统计的信息
	function fenleitongji(ApplicationID, UnitCode) {
		var eUrl = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEqClassStatistical?dataKey=00-00-00-00&ApplicationID=' + ApplicationID + '&UnitCode=' + UnitCode;
		//		console.log(eUrl)
		mui.ajax(eUrl, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var html = "<dt><img src='images/5.png'><span>分类统计</span></dt>";
				var arrVal = [];
				var arr = [];
				var content = new String();
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];

				var itemList = new Array();
				var arr = new Array();
				if(getDatas.length == 0) {
					html += "<dd class='equipStatus_else_dd'><dl><dt>" + '无' + "</dt><dd>" + 0 +
						"</dd></dl><ul><li><dl><dt class='totalTarget_equipStatus'>" + 0 +
						"</dt><dd class='totalTarget_equipStatus_word'>正常使用</dd></dl></li><li><dl><dt class='totalTarget_equipStatus'>" + 0 +
						"</dt><dd class='totalTarget_equipStatus_word'>停用停机</dd></dl></li><li><dl><dt class='totalTarget_equipStatus'>" + 0 +
						"</dt><dd class='totalTarget_equipStatus_word'>故障维修</dd></dl></li><li><dl><dt class='totalTarget_equipStatus'>" + 0 +
						"</dt><dd class='totalTarget_equipStatus_word'>报废处理</dd></dl></li></ul></dd>";
					document.getElementById('insert').innerHTML = html;
				} else {
					mui.each(getDatas, function(index, item) {

						var classCount = 0;
						var itemArr = item.ItemName.split(",");
						var itemCount = item.count.split(",");
						var zcNum = 0;
						var tyNum = 0;
						var gzNum = 0;
						var bfNum = 0;
						for(var i = 0; i < itemCount.length; i++) {
							classCount += parseInt(itemCount[i]);
							var a = itemArr[i]; //名称
							var b = itemCount[i]; // 数量
							switch(itemArr[i]) {
								case "正常使用":
									zcNum = itemCount[i];
									break;
								case "停用停机":
									tyNum = itemCount[i];
									break;
								case "故障维修":
									gzNum = itemCount[i];
									break;
								case "报废处理":
									bfNum = itemCount[i];
									break;
							}
						}
						html += "<dd class='equipStatus_else_dd'><dl><dt>" + item.ClassName + "</dt><dd>" + classCount +
							"</dd></dl><ul><li><dl><dt class='totalTarget_equipStatus'>" + zcNum +
							"</dt><dd class='totalTarget_equipStatus_word'>正常使用</dd></dl></li><li><dl><dt class='totalTarget_equipStatus'>" + tyNum +
							"</dt><dd class='totalTarget_equipStatus_word'>停用停机</dd></dl></li><li><dl><dt class='totalTarget_equipStatus'>" + gzNum +
							"</dt><dd class='totalTarget_equipStatus_word'>故障维修</dd></dl></li><li><dl><dt class='totalTarget_equipStatus'>" + bfNum +
							"</dt><dd class='totalTarget_equipStatus_word'>报废处理</dd></dl></li></ul></dd>";

					});
				}
				//				document.getElementById('insert').innerHTML = html;
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}
	fenleitongji(localStorage.getItem('ApplicationID'), localStorage.getItem("UnitCode"));

	//设备状态柱状图	
	function equipStatus_zhuzhuangtu(itemName, itemCount) {
		var myChart = echarts.init(document.getElementById('equipment_status'));

		option = {
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b}: {c} ({d}%)"
			},
			legend: {
				x: 'right',
				y: 'center',
				itemWidth: 20,
				itemHeight: 10,
				padding: 0,
				itemGap: 5,
				textStyle: {
					fontSize: 10,
				},
				//				padding: 20,
				//				y: 'center',
				//				align: 'right',
				orient: 'vertical',
				data: itemName

			},
			calculable: true,
			series: [{
				name: '',
				type: 'pie',
				color: ['#D87A80', '#FFB980', '#5AB1EF', '#B6A2DE', '#2EC7C9', '#97B552', '#E5CF0D', '#00D1FA', '#E50113', '#9536C4', '#C9349B', '#67406C'],
				x: 'right',
				y: 'center',
				center: ['40%', '50%'],
				radius: ['50%', '70%'],
				avoidLabelOverlap: false,
				label: {
					normal: {
						show: false,
						position: 'center'
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: '20',
							fontWeight: 'bold'
						}
					}
				},
				labelLine: {
					normal: {
						show: false
					}
				},
				data: (function() {
					var res = [];
					for(var i = 0; i < itemName.length; i++) {
						res.push({
							name: itemName[i],
							value: itemCount[i],
						});

					}

					return res;
				})()
			}]
		};

		myChart.setOption(option);
	};

	function fenleitongji(ApplicationID, UnitCode) {
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEqClassStatistical?dataKey=00-00-00-00&ApplicationID=' + ApplicationID + '&UnitCode=' + UnitCode;
		console.log(url)
		mui.ajax(url, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var html = "";
				var arrVal = [];
				var arr = [];
				var content = new String();
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var itemList = new Array();
				var arr = new Array();

				//				<dd class="equipStatus_else_dd ">
				//					<dl>
				//						<dt style="padding-bottom: 0.3rem;">油气回收设备</dt>
				//						<dd>3028</dd>
				//					</dl>
				//					<ul>
				//						<li>
				//							<dl>
				//								<dt class="totalTarget_equipStatus" style="padding-bottom: 0.5rem;">3028</dt>
				//								<dd class="totalTarget_equipStatus_word">正常使用</dd>
				//							</dl>
				//						</li>
				//						<li>
				//							<dl>
				//								<dt class="totalTarget_equipStatus" style="padding-bottom: 0.5rem;">741</dt>
				//								<dd class="totalTarget_equipStatus_word">停用停机</dd>
				//							</dl>
				//						</li>
				//						<li>
				//							<dl>
				//								<dt class="totalTarget_equipStatus" style="padding-bottom: 0.5rem;">12</dt>
				//								<dd class="totalTarget_equipStatus_word">故障维修</dd>
				//							</dl>
				//						</li>
				//						<li>
				//							<dl>
				//								<dt class="totalTarget_equipStatus" style="padding-bottom: 0.5rem;">1247</dt>
				//								<dd class="totalTarget_equipStatus_word">报废处理</dd>
				//							</dl>
				//						</li>
				//					</ul>
				//				</dd>

				if(getDatas.length == 0) {
					html +=
						'<div class="state_content_con">' +
							'<p class="state_content_con_first">' +
							'<span class="clSpan">' +
								'<span>' + '无设备' + '</span>' +
								'<span>' + '无' + '</span>' +
							'</span>' +
							'</p>' +

							'<p>' +
							'<span>' + '无' + '</span>' +
							'<span>正常使用</span>' +
							'</p>' +
							'<p>' +
							'<span>' + '无' + '</span>' +
							'<span>停用停机</span>' +
							'</p>' +
							'<p>' +
							'<span>' + '无' + '</span>' +
							'<span>故障维修</span>' +
							'</p>' +
							'<p>' +
							'<span>' + '无' + '</span>' +
							'<span>报废处理</span>' +
							'</p>' +
							'</div>';
					document.getElementById('state_content_con').innerHTML = html;
				} else {
					mui.each(getDatas, function(index, item) {

						var classCount = 0;
						var itemArr = item.ItemName.split(",");
						var itemCount = item.count.split(",");
						var zcNum = 0;
						var tyNum = 0;
						var gzNum = 0;
						var bfNum = 0;
						for(var i = 0; i < itemCount.length; i++) {
							classCount += parseInt(itemCount[i]);
							//							console.log(itemCount[i])
							var a = itemArr[i]; //名称
							var b = itemCount[i]; // 数量
							switch(itemArr[i]) {
								case "正常使用":
									zcNum = itemCount[i];
									break;
								case "停用停机":
									tyNum = itemCount[i];
									break;
								case "故障维修":
									gzNum = itemCount[i];
									break;
								case "报废处理":
									bfNum = itemCount[i];
									break;
							}
						}
						//						html +=
						//							"<dd id='equipStatus_else_dd' class='equipStatus_else_dd'>" +
						//							"<input class='sendId1' type='hidden' value='" + item.ClassCode + "' />" +
						//							"<dl><dt  style='padding-bottom: 0rem;'>" + item.className + "</dt><dd>" + classCount +
						//							"</dd></dl><ul><li><dl><dt class='totalTarget_equipStatus'>" + zcNum +
						//							"</dt><dd class='totalTarget_equipStatus_word'>正常使用</dd></dl></li><li><dl><dt class='totalTarget_equipStatus'>" + tyNum +
						//							"</dt><dd class='totalTarget_equipStatus_word'>停用停机</dd></dl></li><li><dl><dt class='totalTarget_equipStatus'>" + gzNum +
						//							"</dt><dd class='totalTarget_equipStatus_word'>故障维修</dd></dl></li><li><dl><dt class='totalTarget_equipStatus'>" + bfNum +
						//							"</dt><dd class='totalTarget_equipStatus_word'>报废处理</dd></dl></li></ul></dd>";

						//						console.log(zcNum)
						html +=
							'<div class="state_content_con">' +
							"<input class='sendId1' type='hidden' value='" + item.ClassCode + "' />" +
							'<p class="state_content_con_first">' +
							'<span class="clSpan">'+
								'<span style="display:block;float:left;width:100%;">' + item.className  +'</span>'+
								'<span style="display:block;float:left;width:100%;">' + classCount + '</span>' +
							'</span>' +
							'</p>' +

							'<p>' +
							'<span>' + zcNum + '</span>' +
							'<span>正常使用</span>' +
							'</p>' +
							'<p>' +
							'<span>' + tyNum + '</span>' +
							'<span>停用停机</span>' +
							'</p>' +
							'<p>' +
							'<span>' + gzNum + '</span>' +
							'<span>故障维修</span>' +
							'</p>' +
							'<p>' +
							'<span>' + bfNum + '</span>' +
							'<span>报废处理</span>' +
							'</p>' +
							'</div>';
					});

				}
				//document.getElementById('insert').innerHTML = html;
				document.getElementById("state_content_con").innerHTML = html;
				var datas = document.getElementById("state_content_con").innerText;
				setTimeout(function() {
					if(datas == '') {
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

	fenleitongji(localStorage.getItem('ApplicationID'), localStorage.getItem("UnitCode"));

	//	总量
	document.getElementById("state_zong").innerHTML = '总量：' + localStorage.getItem('arrFor1');
	document.getElementById("state_diqu").innerHTML = localStorage.getItem('index_name');

	//实现webview侧滑模块
	main = plus.webview.currentWebview();

	//	window.addEventListener('equipStatus:all', function() {
	//		document.getElementById('searchPlace').value = localStorage.getItem('areaName');
	//		equipStatus(localStorage.getItem('OrganiseUnitCode'));
	//		fenleitongji(localStorage.getItem('ApplicationID'), localStorage.getItem('OrganiseUnitCode'));
	//	});
	//
	//	window.addEventListener('equipStatus:area', function() {
	//		document.getElementById('searchPlace').value = localStorage.getItem('areaName');
	//		equipStatus(localStorage.getItem('OrganiseUnitCode'));
	//		fenleitongji(localStorage.getItem('ApplicationID'), localStorage.getItem('OrganiseUnitCode'));
	//	})

});

//显示菜单
function openMenu() {
	if(!showMenu) {
		//解决android 4.4以下版本webview移动时，导致fixed定位元素错乱的bug;
		if(mui.os.android && parseFloat(mui.os.version) < 4.4) {
			document.querySelector("header.mui-bar").style.position = "static";
			//同时需要修改以下.mui-contnt的padding-top，否则会多出空白；
			//document.querySelector(".mui-bar-nav~.mui-content").style.paddingTop = "0px";
		}
		//侧滑菜单处于隐藏状态，则立即显示出来；
		//显示完毕后，根据不同动画效果移动窗体；				
		menu.show('slide-in-right', 150, function() {
			switch(mode) {
				case 'menu-move':
					menu.setStyle({
						cachemode: 'noCache',
						left: '30%',
						transition: {
							duration: 150
						}
					});
					break;
			}
		});
		//显示主窗体遮罩

		showMenu = true;
	}
}

function closeMenu() {
	//窗体移动
	_closeMenu();
	//

}
//关闭侧滑菜单页
function _closeMenu() {
	if(showMenu) {
		//解决android 4.4以下版本webview移动时，导致fixed定位元素错乱的bug;
		if(mui.os.android && parseFloat(mui.os.version) < 4.4) {
			document.querySelector("header.mui-bar").style.position = "fixed";
			//同时需要修改以下.mui-contnt的padding-top，否则会多出空白；
			//document.querySelector(".mui-bar-nav~.mui-content").style.paddingTop = "44px";
		}
		switch(mode) {
			case "menu-move":
				//主窗体开始侧滑；
				menu.setStyle({
					left: '100%',
					transition: {
						duration: 150
					}
				});
				break;
		}
		//等待窗体动画结束后，隐藏菜单webview，节省资源；
		setTimeout(function() {
			menu.hide();
		}, 300);

		showMenu = false;
	}
}
//document.getElementById("time").addEventListener('tap',openMenu);

//重写mui.menu方法，Android版本menu按键按下可自动打开，关闭侧滑菜单；
mui.menu = function() {
	if(showMenu) {
		closeMenu();
	} else {
		openMenu();
	}
}
window.addEventListener("dtpicker:close", dtpickerClose);

function dtpickerClose() {

	plus.webview.currentWebview().opener().setStyle({
		mask: 'none'
	})
	_closeMenu();
}
//window.addEventListener('closeMenu', _closeMenu)