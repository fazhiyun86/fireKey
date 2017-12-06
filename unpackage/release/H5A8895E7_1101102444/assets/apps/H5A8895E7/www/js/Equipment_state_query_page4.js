mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
		//		backbutton: false //关闭back按键监听
	}
});
mui.plusReady(function() {

	function WebApp_GetEquipmentEmmList() {
		var code = localStorage.getItem('userNumCode');
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEquipmentEmmList?dataKey=00-00-00-00&Code=' + code;
		console.log(url);
		var htmlDates = '';
		mui.ajax(url, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var getDatas1 = data['DataSource']['Tables'][1]['Datas'];
				var leftNav = ''
				if(getDatas1.length == 0) {
					document.querySelector(".Equipment_state_query_page3_con").innerHTML = '<p style="text-align:center;margin-top:2rem;"><span style="font-size:0.8rem;color:#999999;">暂无更多数据</span></p>';
				}
				if(getDatas1.length > 0) {
					for(var i = 0; i < getDatas1.length; i++) {
						leftNav += "<div><p></p><p></p></div>";
					}
					document.querySelector(".Equipment_state_query_page3_con1").innerHTML = leftNav + "<div><p></p></div>";
				}

				mui.each(getDatas, function(index, item) {
					document.getElementById("ssp1").innerHTML = item.ClassName;
					document.getElementById("ssp2").innerHTML = item.EquipmentCode;
					document.getElementById("ssp3").innerHTML = '状态：';
					document.getElementById("ssp4").innerHTML = item.EquipmentStatus;
					document.getElementById("ssp5").innerHTML = '所处位置：';
					document.getElementById("ssp6").innerHTML = item.Positions;
					document.getElementById("ssp7").innerHTML = '所属单位：';
					document.getElementById("ssp8").innerHTML = item.OrganiseUnitName;
				})
				mui.each(getDatas1, function(index, item) {
					var IsNormal = ["正常", "异常"];
					var OperateStatus = ["已完成"];

					htmlDates +=
						'<div class="Equipment_state_query_page3_con2_1">' +
						'<p>' +
						'<span ></span>' +
						'<span>' + item.OperateTime + '</span>' +
						'</p>' +
						'<div class="Equipment_state_query_page3_con2_1_left">' +
						'<p style="white-space:nowrap; ">' +
						'保养任务：' + item.TaskName +
						'</p>' +
						'<p  style="white-space:nowrap; ">' +
						'检修结果：' + IsNormal[item.IsNormal] +
						'</p>' +
						'<p>' +
						'检修状态：' + OperateStatus[item.OperateStatus - 1] +
						'</p>' +
						'</div>' +
						'<div class="Equipment_state_query_page3_con2_1_left">' +
						'<p>' +

						'</p>' +
						'<p>' +

						'</p>' +
						'<p>' +
						'检修人：' + item.Operator +
						'</p>' +
						'</div>' +
						'</div>';
				})

				if(document.querySelector(".Equipment_state_query_page3_con2")) {
					document.querySelector(".Equipment_state_query_page3_con2").innerHTML = htmlDates;
				}

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	};
	WebApp_GetEquipmentEmmList()

})