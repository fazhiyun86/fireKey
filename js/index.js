mui.init({
	swipeBack: false,
	gestureConfig: {
		hold: true, 
	},
	keyEventBind: {
	},

});

mui.plusReady(function() {
	
	plus.nativeUI.showWaiting();

	//页面显示当前时间 
	var myDate = new Date();
	var myDatex = '';
	//	alert(myDate.getDate()); 
	if(myDate.getDate() < 10) {
		myDatex = '0' + myDate.getDate();
	} else {
		myDatex = myDate.getDate();
	}
	//	 localStorage.setItem('ApplicationName',getDatas[0].ApplicationName);
	document.querySelector(".zdd").innerHTML = localStorage.getItem('ApplicationName');
	 
	var time = myDate.getFullYear() + '-' + ((myDate.getMonth() + 1) < 10 ? "0" : "") + (myDate.getMonth() + 1) + '-' + (myDate.getDate() < 10 ? "0" : "") + myDatex;
	var starttime = myDate.getFullYear() + '年' + ((myDate.getMonth() + 1) < 10 ? "0" : "") + (myDate.getMonth() + 1) + '月' + myDatex + '日';
	document.getElementById("2017date").innerHTML = starttime;
	//	alert(starttime)
	//		starttime
	//	document.getElementById('totalTarget_time').innerHTML = time;
	localStorage.setItem('time', time);
	/*mui.fire(plus.webview.getWebviewById("totalTarget_dtpicker"),"dtpicker:time");	*/
	function equipState(unitCode) {
		//通过unitCode和ApplicationID获取设备状态接口信息
		//	mui.ajax('http://' + '172.16.160.34:8002' + '/WebApi/DataExchange/GetData/WebApp_GetEqStatusStatistical?dataKey=00-00-00-00&ApplicationID=' + localStorage.getItem('ApplicationID') + '&UnitCode=' + unitCode, {
		var urlzt = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEqStatusStatistical?dataKey=00-00-00-00&ApplicationID=' + localStorage.getItem('ApplicationID') + '&UnitCode=' + unitCode;
		//				console.log(urlzt)
		mui.ajax(urlzt, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var arrCount = [];
				var arrName = [];
				var arrFor = 0;
				var arrFor1 = 0;

				mui.each(getDatas, function(index, item) {
					//					console.log(item.count);
					if(!item.count) {
						item.count = 0;
					}

					document.getElementsByClassName('index_list_content_may_two_data')[index].innerHTML = '<span  class="fontFace">' + item.count + '</span>' + '<span>' + item.ItemName + '</span>';
					//					'<p><span>' + item.count +
					//					'</span><span>' + item.ItemName +
					//					'</span></p>';
					arrCount.push(item.count);
					arrName.push(item.ItemName);
				})
				arrFor = ((Number(arrCount[0])) / ((Number(arrCount[0])) + Number(arrCount[2])) * 100).toFixed(1);
				//				arrFor = (((Number(arrCount[1]) + Number(arrCount[2]) + Number(arrCount[3])) / Number(arrCount[0])) * 100).toFixed(1);
				arrFor1 = Number(arrCount[1]) + Number(arrCount[2]) + Number(arrCount[3]) + Number(arrCount[0]);
				if(arrFor == 'NaN') {
					arrFor = 0;
				}
				localStorage.setItem('arrFor1', arrFor1);
				$('#indicatorContainer').html('<span class="wanhao">' + '完好率' + '</span>');
				//setTimeout(function() {
				$('#indicatorContainer').radialIndicator({
					radius: 40,
					barColor: '#61FF00',
					fontColor: '#494949',
					fontSize: '17',
					fontFamily: 'myFont',
					fontWeight: '100',
					barWidth: 6.5,
					initValue: arrFor,
					roundCorner: false,
					percentage: true,
					frameTime: 30
				});
				if($(window).width() < 360) {
					$('#indicatorContainer').css('margin-top', '-1rem');
				}
				//				.index_list_content_may .index_list_content_may_three
				//				}, 500)
				//									if(getDatas.length == 0) {
				//										var arr = ['正常使用', '停用停机', '故障维修', '报废处理'];
				//										for(i = 0; i < document.getElementsByClassName('totalTarget_equipStatus').length; i++) {
				//											document.getElementsByClassName('totalTarget_equipStatus')[i].innerHTML = '0';
				//											document.getElementsByClassName("totalTarget_equipStatus_word")[i].innerHTML = arr[i];
				//										}
				//									} else {
				//					
				//										mui.each(getDatas, function(index, item) {
				//											document.getElementsByClassName('totalTarget_equipStatus')[index].innerHTML = item.count;
				//											document.getElementsByClassName("totalTarget_equipStatus_word")[index].innerHTML = item.ItemName;
				//										});
				//				
				//									}

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}
//	equipState(localStorage.getItem('UnitCode'));
	//通过时间的值和unitCode来得到设备巡检的数据

	function WebApp_GetISMStatistical(time, UnitCode) {
		//	mui.ajax('http://' + '172.16.160.34:8002' + '/WebApi/DataExchange/GetData/WebApp_GetISMStatistical?dataKey=00-00-00-00&date=' + time + '&UnitCode=' + UnitCode, {
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetISMStatistical?dataKey=00-00-00-00&date=' + time + '&UnitCode=' + UnitCode;
		console.log(url)
		mui.ajax(url, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功

				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				if(getDatas[0].totalExam == 0) {
					document.getElementById('xj1').innerHTML = 0 + '/' + getDatas[0].totalTask;
				} else if(getDatas[0].totalTask == 0) {
					document.getElementById('xj1').innerHTML = 0;
				} else {
					document.getElementById('xj1').innerHTML = getDatas[0].totalExam + '/' + getDatas[0].totalTask;
				}

				if(getDatas[0].totalObject == 0) {
					document.getElementById('xj2').innerHTML = 0;
				} else {
					document.getElementById('xj2').innerHTML = getDatas[0].totalObject;
				}
				if(getDatas[0].NoExamByMonth == 0) {
					document.getElementById('xj3').innerHTML = 0;
				} else {
					document.getElementById('xj3').innerHTML = getDatas[0].NoExamByMonth;
				}
				if(getDatas[0].errObject == 0) {
					document.getElementById('xj4').innerHTML = 0;
				} else {
					document.getElementById('xj4').innerHTML = getDatas[0].errObject;
				}

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

//以上东西没用(但是不能删除)-----------------------------------------------------------------------------------------------------------------------------------

	//用户信息全局存储
	function WebApp_GetUserInfo(userCodeVa) {
		
		mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetUserInfo?dataKey=00-00-00-00&userID=' + userCodeVa, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var getServerStartTime = data['DataSource']["Tables"][0]["Datas"][0]["StartTime"]
				var getServerEndTime = data['DataSource']["Tables"][0]["Datas"][0]["EndTime"]
				
				//侧边的时间样式展示和存取起始时间
				var dataArrays = common.getTimeNow(getServerEndTime, getServerStartTime)
				common.setAsideDate(dataArrays)
				
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				localStorage.setItem('UserOrganiseUnitID', getDatas[0].OrganiseUnitID);
				localStorage.setItem('UserID', getDatas[0].UserID);
				localStorage.setItem('UserName', getDatas[0].UserName);
				localStorage.setItem('UserOrganiseUnitName', getDatas[0].OrganiseUnitName);
			}
		})
	}
	
	WebApp_GetUserInfo(localStorage.getItem('userCodeVa'))
	
	
	//初始化执行
	setTimeout(function() {
		WebApp_GetRiskHeight();    //消火栓巡检  ----  高风险巡检  （低风险数据接口）
		WebApp_FireStatistical();  //动火统计
		WebApp_EquipmentStatus();  //设备状态--- 消火栓状态
		WebApp_GetRectify ();    //隐患整改
		WebApp_GetChange();    //整改催办
	}, 500)
	
	//高风险数据获取
	function WebApp_GetRiskHeight () {
		var data = {
			OrganiseUnitID: localStorage.getItem("UserOrganiseUnitID"),
			StartDate: localStorage.getItem("startTime"),
			EndDate: localStorage.getItem("endTime")
		}
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/TZDH_WebApp_First_ISMTask_LowRisk?dataKey=00-00-00-00';
	
		mui.ajax(urlg, {
			data: data,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			
			success: function(data) {
				console.log('isEnd')
				setHtml(data)
				plus.nativeUI.closeWaiting();
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
		
		function setHtml (data) {
			var info = data["DataSource"]['Tables'][0]["Datas"][0]
			
			var ObjectCount = info["ObjectCount"];
			var AbnormalCount = info["AbnormalCount"];
			var AuditCount = info["AuditCount"];
			var Rate = info["Rate"];
			var Ratio = info["Ratio"];
			var isEnd = info["IsEnd"];
			console.log(isEnd)
			localStorage.setItem("HeightTag", isEnd);
			
			Bratio = parseFloat(Ratio)
			Lratio = Bratio.toFixed(1);
			Str = Lratio.toString();
			Str = Str.replace(/\d+\.(\d*)/,"$1");
			if( Str == 0){
				Lratio = Bratio.toFixed(0)
			}
			Ratio = Lratio + '%';
			
			function setFontColor(Ratio){
				Ratio = parseFloat(Ratio)
				var mark = document.getElementById("mark");
				if(Ratio < 80) {
					document.getElementById("Ratio").style.color = '#db4527';
					mark.className = "index_list_content_maymore"  + " red-top" + " red-bottom";
				}if (Ratio >= 80 && Ratio < 100) {
					document.getElementById("Ratio").style.color = '#e8a600';
					mark.className = "index_list_content_maymore" + " yellow-top" + " yellow-bottom";
				} else if(Ratio == 100){
					document.getElementById("Ratio").style.color = '#228b22';
					mark.className = "index_list_content_maymore" + " green-top" + " green-bottom";
				}
			}
			setFontColor(Ratio);
			
			document.getElementById("Ratio").innerHTML = Ratio || '-'; 
			document.getElementById("ObjectCount").innerHTML = ObjectCount || 0; 
			document.getElementById("AbnormalCount").innerHTML = AbnormalCount || 0; 
			document.getElementById("AuditCount").innerHTML = AuditCount || 0; 
			document.getElementById("Rate").innerHTML = Rate || 0;
		}
	}
	
	//动火统计
	function WebApp_FireStatistical () {
		var data = {
			OrganiseUnitID: localStorage.getItem("UserOrganiseUnitID"),
			StartDate: localStorage.getItem("startTime"),
			EndDate: localStorage.getItem("endTime")
		};
		
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/TZDH_WebApp_First_FWTask_Statistical?dataKey=00-00-00-00';

		mui.ajax(urlg, {
			data: data,
			dataType: 'json',
			type: 'get',
			timeout: 5000,
			success: function(data){
				console.log(JSON.stringify(data))
				setHtml(data)
				mui.toast('数据请求成功')
			},
			
			error: function(){
				mui.toast('数据请求失败')
				console.log("动火统计请求报错")
			}
		});

		function setHtml(data) {    
			
			var info = data['DataSource']['Tables'][0]["Datas"][0];
			var FireCount = info["FireCount"]; //动火数量
			var AbnormalCount = info["AbnormalCount"]; //发现问题
			var AuditCount = info["AuditCount"];  //解决问题
			
			document.getElementById("donghuo1").innerHTML = FireCount || 0;
			document.getElementById("donghuo2").innerHTML = AbnormalCount || 0;
			document.getElementById("donghuo3").innerHTML = AuditCount || 0;
		}
	}
	
	//设备状态-- 消火栓状态
	function WebApp_EquipmentStatus (){
		
		var data ={
			OrganiseUnitID: localStorage.getItem("UserOrganiseUnitID")
		};
		
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/TZDH_WebApp_First_EMBEquipment_Statistical?dataKey=00-00-00-00';
		
		mui.ajax(urlg, {
			data: data,
			dataType: 'json',
			type: 'get',
			timeout: 5000,
			success: function(data){
				setHtml(data)
			},
			
			error: function(){
				mui.toast('数据请求失败')
			}
		});
		
		function setHtml(data){
			var info = data['DataSource']['Tables'][0]["Datas"][0];
			
			var NormalCount = info["NormalCount"]; //正常使用
			var AuditCount = info["StopCount"]; //停用停机
			var RepairCount = info["RepairCount"];  //故障维修
			var ScrapCount = info["ScrapCount"];  //报废数量
			
			document.getElementsByClassName("Status1")[0].innerHTML = NormalCount || 0;
			document.getElementsByClassName("Status2")[0].innerHTML = AuditCount || 0;
		}
	}

	//隐患整改
	function WebApp_GetRectify (){
		
		var data ={
			OrganiseUnitID: localStorage.getItem("UserOrganiseUnitID"),
			StartDate: localStorage.getItem("startTime"),
			EndDate: localStorage.getItem("endTime")
		};
		
		var urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/TZDH_WebApp_First_EXAMRectify_Statistical?dataKey=00-00-00-00';
		
		mui.ajax(urlg, {
			data: data,
			dataType: 'json',
			type: 'get',
			timeout: 5000,
			success: function(data){
				setHtml(data)
			},
			
			error: function(){
				mui.toast('数据请求失败')
				console.log("设备维修请求报错")
			}
		});
		
		function setHtml(data){
			var info = data['DataSource']['Tables'][0]["Datas"][0];
			
			var RectifyTotal = info["RectifyTotal"]; //故障设备
			var ToDayRectify = info["ToDayRectify"]; //维修数量
			var RectifyCheck = info["RectifyCheck"];  //维修审批
		
			document.getElementById("yinhuan1").innerHTML = RectifyTotal || 0;
			document.getElementById("yinhuan2").innerHTML = ToDayRectify || 0;
			document.getElementById("yinhuan3").innerHTML = RectifyCheck || 0;
		}
	}
	
	//整改催办
	function WebApp_GetChange(){  
		
		var data ={
			OrganiseUnitID: localStorage.getItem("UserOrganiseUnitID"),
			StartDate: localStorage.getItem("startTime"),
			EndDate: localStorage.getItem("endTime")
		};
		
		var urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/TZDH_WebApp_First_EXAMRectifyUrge_Statistical?dataKey=00-00-00-00';
		
		mui.ajax(urlg, {
			data: data,
			dataType: 'json',
			type: 'get',
			timeout: 5000,
			success: function(data){
//				console.log(JSON.stringify(data))
				setHtml(data)
			},
			
			error: function(){
				mui.toast('数据请求失败')
				console.log("设备维修请求报错")
			}
		});
		
		function setHtml(data){
			var info = data['DataSource']['Tables'][0]["Datas"][0];
			
			var CurrentRectify = info["CurrentRectify"]; //当前整改
			var UrgeRectify = info["UrgeRectify"]; //已催办整改
			var Beyond = info["Beyond"];  //逾期未整改

			document.getElementById("zhenggai1").innerHTML = CurrentRectify || 0;
			document.getElementById("zhenggai2").innerHTML = UrgeRectify || 0;
			document.getElementById("zhenggai3").innerHTML = Beyond || 0;
		}
	}

	//单位切换-----------------------------------------------------------------------
	//时间切换-----------------------------------------------------------------------
	
	var offCanvasWrapper = mui('#offCanvasWrapper');
	mui('#table_view').on('tap', '.OrganiseUnitIDLi', function() {
		
		offCanvasWrapper.offCanvas('close');
		// 存取当前选中的时间段
		var targetStr = this.innerText;
		common.setStorageTime(targetStr)
		
		WebApp_GetRiskHeight(); //重新获取高风的数据
		WebApp_FireStatistical(); //动火统计
		WebApp_EquipmentStatus(); // 设备状态
		WebApp_GetRectify ();   //隐患整改
		WebApp_GetChange();    //整改催办
		
	})
	

	document.getElementById("bodyId").addEventListener("swipedown", function() {

	})

})






	//低风险数据获取
//	function WebApp_GetRisklow (){
//		
//		var data = {
//			OrganiseUnitID: localStorage.getItem("UserOrganiseUnitID"), 
//			StartDate: localStorage.getItem("startTime"),  
//			EndDate: localStorage.getItem("endTime")
//		}
//		
//		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/TZDH_WebApp_First_ISMTask_LowRisk?dataKey=00-00-00-00';
//		
//		mui.ajax(urlg, {
//			data: data, 
//			dataType: 'json',
//			type: 'get',
//			timeout: 5000,
//			success: function(data){
////				console.log('JSON.stringify(data)')
////				console.log(JSON.stringify(data))
//				setHtml(data)
//			},
//			error: function(){
//				//异常处理
//				mui.toast('数据请求失败')
//				console.log("低风险请求数据失败!")
//			}
//		});
//		
//		function setHtml (data) {
//			var info = data['DataSource']['Tables'][0]["Datas"][0];  //要取得数据
//			var ObjectCount = info["ObjectCount"];  //检查设备数量
//			var AbnormalCount = info["AbnormalCount"]; //异常数量
//			var AuditCount = info["AuditCount"];  //解决问题数量
//			var Rate = info["Rate"];  //任务进度
//			var Ratio = info["Ratio"];  //本周检查进度
//			var tag = info['IsEnd']; //是否直接进入到任务页面
//			
//			localStorage.setItem("lowTag", tag);
//			
//			
//			document.getElementById("LowRatio").innerHTML = Ratio || 0; 
//			document.getElementById("LowObjectCount").innerHTML = ObjectCount || 0; 
//			document.getElementById("LowAbnormalCount").innerHTML = AbnormalCount || 0; 
//			document.getElementById("LowAuditCount").innerHTML = AuditCount || 0; 
//			document.getElementById("LowRate").innerHTML = Rate || 0;
//		}
//		
//	}