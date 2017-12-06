mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
		//		backbutton: false //关闭back按键监听
	}
});
mui.plusReady(function() {

	function WebApp_GetEquipmentStatusQuery(code) {
		var code = localStorage.getItem('userNumCode');
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEquipmentStatusQuery?dataKey=00-00-00-00&Code=' + code;
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
				var getDatas3 = data['DataSource']['Tables'][3]['Datas'];

				var ApprovalProcess = [];
				var Result = '';
				var AppDate1 = [];
				var AppDateStr = '';
				var Status = [];
				var StatusStr = '';

				var ClolrEnd = 0;
				mui.each(getDatas, function(index, item) {
					//					console.log(item.ClassName)
					document.getElementById("ssp1").innerHTML = item.ClassName;
					document.getElementById("ssp2").innerHTML = item.EquipmentCode;
					document.getElementById("ssp3").innerHTML = '状态：';
					document.getElementById("ssp4").innerHTML = item.EquipmentStatus;
					document.getElementById("ssp5").innerHTML = '所处位置：';
					document.getElementById("ssp6").innerHTML = item.Positions;
					document.getElementById("ssp7").innerHTML = '所属单位：';
					document.getElementById("ssp8").innerHTML = item.OrganiseUnitName;
					//					document.getElementById("dataa2").innerHTML = 123;
					document.getElementById("dataa3").innerHTML = '使用日期';

				})
				mui.each(getDatas1, function(index, item) {
					if(!item.InspectTime) {
						document.getElementById("jianxiu1").innerHTML = '';
					} else {
						document.getElementById("jianxiu1").innerHTML = item.InspectTime;
					}

					if(!item.IsNormal) {
						document.getElementById("jianxiu11").innerHTML = '';
					} else {
						document.getElementById("jianxiu11").innerHTML = item.IsNormal;
					}

				})
				mui.each(getDatas2, function(index, item) {
					if(!item.OperateTime) {
						document.getElementById("jianxiu2").innerHTML = '';
					} else {
						document.getElementById("jianxiu2").innerHTML = item.OperateTime;
					}
					if(!item.IsNormal.length) {
						document.getElementById("jianxiu22").innerHTML = '';
					} else {
						document.getElementById("jianxiu22").innerHTML = item.IsNormal;
					}

				})
				mui.each(getDatas3, function(index, item) {

					if(!item.RepairDate) {
						document.getElementById("jianxiu3").innerHTML = '';
					} else {
						document.getElementById("jianxiu3").innerHTML = item.RepairDate;
					}
					if(!item.RepairResult) {
						document.getElementById("jianxiu33").innerHTML = '';
					} else {
						document.getElementById("jianxiu33").innerHTML = item.RepairResult;
					}

					ApprovalProcess.push(item.FaultActName);
					AppDate1.push(item.Date1);
					Status.push(item.Status);
				})

				for(var i = 0; i < ApprovalProcess.length; i++) {
					Result += '<p>' + ApprovalProcess[i] + '</p>';
				}
				document.querySelector(".echartsAllConF_two").innerHTML = Result;

				for(var i = 0; i < AppDate1.length; i++) {
					AppDateStr += '<p>' + AppDate1[i] + '</p>';
				}
				document.querySelector(".echartsAllConF_four").innerHTML = AppDateStr;
				for(var i = 0; i < Status.length; i++) {

					if(Status[i] == 1) {
						StatusStr +=
							'<p>' +
							'<span  class="colorActive1"></span>' +
							'<span  class="colorActive2"></span>' +
							'</p>';
					} else {
						StatusStr +=
							'<p>' +
							'<span></span>' +
							'<span></span>' +
							'</p>';
					}
				}

				//console.log(StatusStr) 
				if(StatusStr != '' && StatusStr != null) {
					document.querySelector(".echartsAllConF_three").innerHTML = StatusStr;
					document.querySelector(".echartsAllConF_three p:last-child span:nth-child(2)").remove();
				}else{
					document.querySelector(".echartsAllConF_first").remove();
				}

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	};
	WebApp_GetEquipmentStatusQuery()

})