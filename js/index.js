mui.init({
	swipeBack: false,
	gestureConfig: {
		hold: true,
	},
	keyEventBind: {
		//		backbutton: true //关闭back按键监听
	},
	//	pullRefresh: {
	//		container: '#offCanvasWrapper',
	//		down: {
	//			callback: pulldownRefresh
	//		},
	//		//		up: {
	//		//			contentrefresh: '正在加载...',
	//		//			callback: pullupRefresh
	//		//		}
	//	}
	//	pullRefresh: {
	//		container: '#bodyId',
	//		down: {
	//			callback: pulldownRefresh
	//		}
	//	}
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

				//				
				//							document.getElementById('tt').innerHTML = getDatas[0].totalTask;
				//							document.getElementById('tf').innerHTML = getDatas[0].totalExam;
				//							document.getElementById('fe').innerHTML = getDatas[0].ExamObject;
				//							document.getElementById('tu').innerHTML = getDatas[0].errObject;
				//							document.getElementById('mf').innerHTML = getDatas[0].NoExamByMonth;
				//							document.getElementById('te').innerHTML = getDatas[0].totalObject;

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
//	WebApp_GetISMStatistical(time, localStorage.getItem('UnitCode'));

	//证照状态通过UnitCode来获取
	function WebApp_GetCertificateInfo(UnitCode) {
		mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetCertificateInfo?dataKey=00-00-00-00&UnitCode=' + UnitCode, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				if(getDatas[0].total) {
					document.getElementById('zzzz1').innerHTML = getDatas[0].total;
				} else {
					document.getElementById('zzzz1').innerHTML = 0;
				}
				if(getDatas[0].totalRemind) {
					document.getElementById('zzzz2').innerHTML = getDatas[0].totalRemind;
				} else {
					document.getElementById('zzzz2').innerHTML = 0;
				}
				if(getDatas[0].totalExpired) {
					document.getElementById('zzzz3').innerHTML = getDatas[0].totalExpired;
				} else {
					document.getElementById('zzzz3').innerHTML = 0;
				}

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}
//	WebApp_GetCertificateInfo(localStorage.getItem('UnitCode'))

	//动火检查
	function WebApp_GetFrieWorkExamine_Statistical(UnitCode) {
		url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetFrieWorkExamine_Statistical?dataKey=00-00-00-00&OrganiseUnitCode=' + UnitCode;
		console.log(url)
		mui.ajax(url, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				//				mui.each(getDatas, function(index, item) {
				//					//					console.log(item.TotalItemCount)
				//				})
				//				alert(getDatas[0].TotalItemCount)
				if(getDatas[0].TotalItemCount == '') {

					document.getElementById('fire1').innerHTML = 0;
				} else {
					document.getElementById('fire1').innerHTML = getDatas[0].TotalItemCount;
				}

				if(getDatas[0].NormalItemCount == '') {
					document.getElementById('fire2').innerHTML = 0;
				} else {
					document.getElementById('fire2').innerHTML = getDatas[0].NormalItemCount;
				}

				if(getDatas[0].AbNormalItemCount == '') {
					document.getElementById('fire3').innerHTML = 0;
				} else {
					document.getElementById('fire3').innerHTML = getDatas[0].AbNormalItemCount;
				}

				if(getDatas[0].AbNormalItemCount == '') {
					document.getElementById('fire4').innerHTML = 0;
				} else {
					document.getElementById('fire4').innerHTML = getDatas[0].FireWorkCount;
				}

				if(getDatas[0].Confirm == '') {
					document.getElementById('fire5').innerHTML = 0;
				} else {
					document.getElementById('fire5').innerHTML = getDatas[0].Confirm;
				}

				if(getDatas[0].Remaining == '') {
					document.getElementById('fire6').innerHTML = 0;
				} else {
					document.getElementById('fire6').innerHTML = getDatas[0].Remaining;
				}

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}
//	WebApp_GetFrieWorkExamine_Statistical(localStorage.getItem('UnitCode'));

	//正式动火作业
	function WebApp_GetFireworkStatistical(UnitCode) {
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetFireworkStatistical?dataKey=00-00-00-00&UnitCode=' + UnitCode;
		//		console.log(urlg)
		mui.ajax(urlg, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				mui.each(getDatas, function(index, item) {

					if(item.TaskCount == 0) {
						document.getElementById("fire1_1").innerHTML = 0;
					} else {
						document.getElementById("fire1_1").innerHTML = item.TaskCount;
					}

					if(item.TotalItemCount == 0) {
						document.getElementById("fire4_1").innerHTML = 0;
					} else {
						document.getElementById("fire4_1").innerHTML = item.TotalItemCount;
					}

					if(item.Confirm == 0) {
						document.getElementById("fire2_1").innerHTML = 0;
					} else {
						document.getElementById("fire2_1").innerHTML = item.Confirm;
					}

					if(item.AbnormalItemCount == 0) {
						document.getElementById("fire3_1").innerHTML = 0;
					} else {
						document.getElementById("fire3_1").innerHTML = item.AbnormalItemCount;
					}

					if(item.RectifyResult == 0) {
						document.getElementById("fire5_1").innerHTML = 0;
					} else {
						document.getElementById("fire5_1").innerHTML = item.RectifyResult;
					}

					if(item.Remaining == 0) {
						document.getElementById("fire6_1").innerHTML = 0;
					} else {
						document.getElementById("fire6_1").innerHTML = item.Remaining;
					}

				})

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}
	//	WebApp_GetFireworkStatistical(localStorage.getItem('UnitCode'));

	//设备运维
	function WebApp_Emf_Faultrepair(UnitCode) {
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_Emf_Faultrepair?dataKey=00-00-00-00&organiseunitcode=' + UnitCode;
		console.log(urlg);
		mui.ajax(urlg, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				mui.each(getDatas, function(index, item) {
					if(item.EquipmentCount == 0) {
						document.getElementById("yunwei1").innerHTML = 0;
					} else {
						document.getElementById("yunwei1").innerHTML = item.EquipmentCount;
					}

					if(item.TodayRepair == 0) {
						document.getElementById("yunwei2").innerHTML = 0;
					} else {
						document.getElementById("yunwei2").innerHTML = item.TodayRepair;
					}

					if(item.AuditCount == 0) {
						document.getElementById("yunwei3").innerHTML = 0;
					} else {
						document.getElementById("yunwei3").innerHTML = item.AuditCount;
					}

				})

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}
	WebApp_Emf_Faultrepair(localStorage.getItem('UnitCode'));

	//规范检查
	function WebApp_GetEXAMStatistical(UnitCode) {
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEXAMStatistical?dataKey=00-00-00-00&UnitCode=' + UnitCode;
				console.log(urlg)
		mui.ajax(urlg, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				mui.each(getDatas, function(index, item) {
					if(!item.totalTask) {
						document.getElementById("guifan1").innerHTML = 0;
					} else if(!item.totalExam) {
						document.getElementById("guifan1").innerHTML = 0 + '/' + item.totalTask;
					} else {
						document.getElementById("guifan1").innerHTML = item.totalExam + '/' + item.totalTask;
					}

					if(!item.totalObject) {
						document.getElementById("guifan2").innerHTML = 0;
					} else if(!item.ExamObject) {
						document.getElementById("guifan2").innerHTML = 0 + '/' + item.totalObject;
					} else {
						document.getElementById("guifan2").innerHTML = item.ExamObject + '/' + item.totalObject;
					}

					if(!item.NoExamByMonth) {
						document.getElementById("guifan3").innerHTML = 0;
					} else {
						document.getElementById("guifan3").innerHTML = item.NoExamByMonth;
					}

					//					if(!item.errObject) {
					//						document.getElementById("guifan4").innerHTML = 0;
					//					} else {
					//						document.getElementById("guifan4").innerHTML = item.errObject;
					//					}
				})

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}
//	WebApp_GetEXAMStatistical(localStorage.getItem('UnitCode'));

	//隐患整改
	function WebApp_GetRectify(UnitCode) {
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetRectify?dataKey=00-00-00-00&UnitCode=' + UnitCode;
		console.log(urlg)
		mui.ajax(urlg, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];

				if(getDatas[0].total != 0) {
					document.getElementById("yh1").innerHTML = getDatas[0].totalFinished + '/' + getDatas[0].total;
				} else {
					document.getElementById("yh1").innerHTML = '0/0';
				}

				if(getDatas[0].totalExpried == 0) {
					document.getElementById("yh2").innerHTML = 0;
				} else {
					document.getElementById("yh2").innerHTML = getDatas[0].totalExpried;
				}
				if(getDatas[0].totalAccep == 0) {
					document.getElementById("yh3").innerHTML = 0;
				} else {
					document.getElementById("yh3").innerHTML = getDatas[0].totalAccep;
				}

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}
//	WebApp_GetRectify(localStorage.getItem('UnitCode'));

	//检修保养
	function WebApp_GetEMMStatistical(UnitCode) {
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEMMStatistical?dataKey=00-00-00-00&UnitCode=' + UnitCode;
		//		console.log(urlg)
		mui.ajax(urlg, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var getDatas = data['DataSource']['Tables'][0]['Datas'];

				if(getDatas[0].totalTask != 0) {
					document.getElementById("jx1").innerHTML = getDatas[0].totalExam + '/' + getDatas[0].totalTask;
				} else {

					document.getElementById("jx1").innerHTML = '0/0';
				}
				if(getDatas[0].NoExamByMonth == 0) {
					document.getElementById("jx2").innerHTML = 0;
				} else {
					document.getElementById("jx2").innerHTML = getDatas[0].NoExamByMonth;
				}

				if(getDatas[0].totalObject != 0) {
					document.getElementById("jx3").innerHTML = getDatas[0].ExamObject + '/' + getDatas[0].totalObject;
				} else {
					document.getElementById("jx3").innerHTML = '0/0';
				}

				if(getDatas[0].errObject == 0) {
					document.getElementById("jx4").innerHTML = 0;
				} else {
					document.getElementById("jx4").innerHTML = getDatas[0].errObject;
				}

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}
//	WebApp_GetEMMStatistical(localStorage.getItem('UnitCode'));

	//用户信息全局存储
	function WebApp_GetUserInfo(userCodeVa) {
		console.log('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetUserInfo?dataKey=00-00-00-00&userID=' + userCodeVa);
		mui.ajax('http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetUserInfo?dataKey=00-00-00-00&userID=' + userCodeVa, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var getServerStartTime = data['DataSource']["Tables"][0]["Datas"][0]["StartTime"]
				var getServerEndTime = data['DataSource']["Tables"][0]["Datas"][0]["EndTime"]

				var dataArrays = common.getTimeNow(getServerEndTime, getServerStartTime)
				common.setAsideDate(dataArrays)
				
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				localStorage.setItem('UserOrganiseUnitID', getDatas[0].OrganiseUnitID);
				localStorage.setItem('UserName', getDatas[0].UserName);
				localStorage.setItem('UserOrganiseUnitName', getDatas[0].OrganiseUnitName);

			} 
		})
	}
	
	WebApp_GetUserInfo(localStorage.getItem('userCodeVa'))
	
	//高风险数据获取
	function WebApp_GetRiskHeight (UnitCode) {
		var data = {
			OrganiseUnitID: localStorage.getItem("UnitCode"),
			StartDate: localStorage.getItem("startTime"),
			EndDate: localStorage.getItem("endTime")
		}
		
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/TZDH_WebApp_First_ISMTask_HighRisk?dataKey=00-00-00-00';
		
		mui.ajax(urlg, {
			data: data,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			
			success: function(data) {
				
				setHtml(data)
				
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
			
			document.getElementById("Ratio").innerHTML = Ratio || 0; 
			document.getElementById("ObjectCount").innerHTML = ObjectCount || 0; 
			document.getElementById("AbnormalCount").innerHTML = AbnormalCount || 0; 
			document.getElementById("AuditCount").innerHTML = AuditCount || 0; 
			document.getElementById("Rate").innerHTML = Rate || 0;
			
		}
	}
	

	WebApp_GetRiskHeight(localStorage.getItem('UnitCode'));

	//低风险数据获取
	function WebApp_GetRisklow (UnitCode){
		
		var data = {
			OrganiseUnitID: localStorage.getItem("UnitCode"), 
			StartDate: localStorage.getItem("startTime"),  
			EndDate: localStorage.getItem("endTime")
		}
		//地址（接口）
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/TZDH_WebApp_First_ISMTask_LowRisk?dateKey=00-00-00-00';
		
		//ajax请求
		mui.ajax(urlg, {
			data: data,  //传入数据
			dataType: 'json',  //返回
			type: 'get',
			timeout: 5000,
			success: function(data){
				
//				var s = JSON.stringify(data);
//				console.log(s)
				//回掉函数返回数据
				setHtml(data)
				
			},

			error: function(){
				//异常处理
				mui.toast('数据请求失败')
			}
		});
		
		function setHtml (data) {
			
			var info = data['DataSource']['Tables'][0]["Datas"][0];  //要取得数据
			var ObjectCount = info["ObjectCount"];  //检查设备数量
			var AbnormalCount = info["AbnormalCount"]; //异常数量
			var AuditCount = info["AuditCount"];  //解决问题数量
			var Rate = info["Rate"];  //任务进度
			var Ratio = info["Ratio"];  //本周检查进度
			
			document.getElementById("LowRatio").innerHTML = Ratio || 0; 
			document.getElementById("LowObjectCount").innerHTML = ObjectCount || 0; 
			document.getElementById("LowAbnormalCount").innerHTML = AbnormalCount || 0; 
			document.getElementById("LowAuditCount").innerHTML = AuditCount || 0; 
			document.getElementById("LowRate").innerHTML = Rate || 0;
		}
		
	}
	
	WebApp_GetRisklow(localStorage.getItem('UnitCode'));
	

	//动火统计
	function WebApp_FireStatistical (UnitCode) {
		
		var data = {
			OrganiseUnitID: localStorage.getItem("UnitCode"),
			StartDate: localStorage.getItem("startTime"),
			EndDate: localStorage.getItem("endTime")
		};
		
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/TZDH_WebApp_First_FWTask_Statistical?dateKey=00-00-00-00';
		
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


		function setHtml(data) {
			
			var info = data['DataSource']['Tables'][0]["Datas"][0];
			var FireCount = info["FireCount"]; //动火数量
			var AuditCount = info["AbnormalCount"]; //发现问题
			var AuditCount = info["AuditCount"];  //解决问题
			
			document.getElementsByClassName("fire1").innerHTML = FireCount || 0;
			document.getElementsByClassName("fire2").innerHTML = AbnormalCount || 0;
			document.getElementsByClassName("fire3").innerHTML = AuditCount || 0;
		}
	}
	
	WebApp_FireStatistical(localStorage.getItem('UnitCode'));
	
	//设备维修
	function WebApp_EquipmentOperat (UnitCode){
		
		var data ={
			OrganiseUnitID: localStorage.getItem("UnitCode"),
			StartDate: localStorage.getItem("startTime"),
			EndDate: localStorage.getItem("endTime")
		};
		
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/TZDH_WebApp_First_EMFRepair_Statistical?dateKey=00-00-00-00';
		
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
			var RepairCoun = info["RepairCoun"]; //故障设备
			var TodayRepairCount = info["TodayRepairCount"]; //维修数量
			var WeekRepairCount = info["WeekRepairCount"];  //维修审批
			
			document.getElementsByClassName("Operat1").innerHTML = RepairCoun || 0;
			document.getElementsByClassName("Operat2").innerHTML = TodayRepairCount || 0;
			document.getElementsByClassName("Operat3").innerHTML = WeekRepairCount || 0;
		}
		
	}
	
	WebApp_EquipmentOperat(localStorage.getItem('UnitCode'));
	
	//设备状态
	function WebApp_EquipmentStatus (UnitCode){
		
		var data ={
			OrganiseUnitID: localStorage.getItem("UnitCode")
		};
		
		urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/TZDH_WebApp_First_EMBEquipment_Statistical?dateKey=00-00-00-00';
		
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
			
			document.getElementsByClassName("Status1").innerHTML = NormalCount || 0;
			document.getElementsByClassName("Status2").innerHTML = AuditCount || 0;
			document.getElementsByClassName("Status3").innerHTML = RepairCount || 0;
			document.getElementsByClassName("Status4").innerHTML = ScrapCount || 0;
			
		}
		
	}
	
	WebApp_EquipmentStatus(localStorage.getItem('UnitCode'));
	
	
	
	//单位切换-----------------------------------------------------------------------
	var offCanvasWrapper = mui('#offCanvasWrapper');
	mui('#table_view').on('tap', '.OrganiseUnitIDLi', function() {
		
		offCanvasWrapper.offCanvas('close');
		var targetStr = this.innerText
		common.setStorageTime(targetStr)
		
		WebApp_GetRiskHeight(localStorage.getItem('UnitCode')); //重新获取高风的数据
		
	/*
		//console.log(this.firstChild.value)
		document.getElementById('2017date').innerHTML = this.children[1].value;
		localStorage.setItem('UnitCode', this.firstChild.value);
		localStorage.setItem('index_name', this.children[1].value);
		localStorage.setItem('OrganiseUnitID', this.children[2].value);
		//		console.log(this.firstChild.value)
		offCanvasWrapper.offCanvas('close');
		equipState(localStorage.getItem('UnitCode'));
		WebApp_GetISMStatistical(time, localStorage.getItem('UnitCode'));
		WebApp_GetCertificateInfo(localStorage.getItem('UnitCode'));
		//		WebApp_GetFrieWorkExamine_Statistical(localStorage.getItem('UnitCode'));
		//		console.log(localStorage.getItem('UnitCode'))
		WebApp_GetEXAMStatistical(localStorage.getItem('UnitCode'));
		WebApp_GetFireworkStatistical(localStorage.getItem('UnitCode'));
		WebApp_Emf_Faultrepair(localStorage.getItem('UnitCode'));
		WebApp_GetRectify(localStorage.getItem('UnitCode'));
		WebApp_GetEMMStatistical(localStorage.getItem('UnitCode'));
	*/
	})
	

	document.getElementById("bodyId").addEventListener("swipedown", function() {
		/*
		equipState(localStorage.getItem('UnitCode'));
		WebApp_GetISMStatistical(time, localStorage.getItem('UnitCode'));
		WebApp_GetCertificateInfo(localStorage.getItem('UnitCode'));
		//		WebApp_GetFrieWorkExamine_Statistical(localStorage.getItem('UnitCode'));
		//		console.log(localStorage.getItem('UnitCode'))
		WebApp_GetEXAMStatistical(localStorage.getItem('UnitCode'));
		WebApp_GetFireworkStatistical(localStorage.getItem('UnitCode'));
		WebApp_Emf_Faultrepair(localStorage.getItem('UnitCode'));
		WebApp_GetRectify(localStorage.getItem('UnitCode'));
		WebApp_GetEMMStatistical(localStorage.getItem('UnitCode'));
		*/
	})

})