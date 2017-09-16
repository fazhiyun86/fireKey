mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
//		backbutton: false //关闭back按键监听
	}
});
mui.plusReady(function() {

	function WebApp_GetEquipmentQueryInfo() {
		var code = localStorage.getItem('userNumCode');
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEquipmentQueryInfo?dataKey=00-00-00-00&Code=' + code;
		console.log(url)
		mui.ajax(url, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				//服务器返回响应，根据响应结果，分析是否登陆成功
				 var getDatas = data['DataSource']['Tables'][0]['Datas'];
				 var getDatas1 = data['DataSource']['Tables'][1]['Datas'];

				mui.each(getDatas, function(index, item) {
					document.getElementById("queryPage2_1").innerHTML = '设备编码：'+item.EquipmentCode;
					document.getElementById("queryPage2_2").innerHTML = '设备名称：'+item.EquipmentName;
					document.getElementById("queryPage2_3").innerHTML = '生产厂商：'+item.EnterpriseName;
					document.getElementById("queryPage2_4").innerHTML = '运行时长：'+item.TotalRunTimeLength;
					document.getElementById("queryPage2_5").innerHTML = '设备型号：';
					document.getElementById("queryPage2_6").innerHTML = '设备分类：'+item.PurposeName;
					document.getElementById("queryPage2_7").innerHTML = '设备性质：';
					document.getElementById("queryPage2_8").innerHTML = '设备状态：'+item.EquipmentStatus;
					document.getElementById("queryPage2_9").innerHTML = '所属单位：'+item.OrganiseUnitName;
					document.getElementById("queryPage2_10").innerHTML = '管理部门：'+item.DepartMentName;
					document.getElementById("queryPage2_11").innerHTML = '设备区域：'+item.Area;
					document.getElementById("queryPage2_12").innerHTML = '负责人：'+item.Recipient;
					document.getElementById("queryPage2_13").innerHTML = '使用日期：'+item.BuyDate;
					document.getElementById("queryPage2_14").innerHTML = '使用年限：'+item.AgeLimit;
					document.getElementById("queryPage2_15").innerHTML = '条形码：'+item.BarCode;
					document.getElementById("queryPage2_16").innerHTML = '二维码：'+item.QRCode;
					document.getElementById("queryPage2_17").innerHTML = 'RFID编码：'+item.RFIDCode;
					document.getElementById("queryPage2_18").innerHTML = 'ERP编码：'+item.ERPCode;
					document.getElementById("queryPage2_19").innerHTML = '运行时长：'+item.TotalRunTimeLength1;
					document.getElementById("queryPage2_20").innerHTML = '运行寿命时长：'+item.RunLife;
					document.getElementById("queryPage2_21").innerHTML = '强险时长：'+item.ForceTimeLength;
					document.getElementById("queryPage2_22").innerHTML = '日均运行时长：'+item.DailyTimeLength;

				})
				mui.each(getDatas1, function(index, item) {
					document.querySelector(".Es_Img").innerHTML = '<span><img src="http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + item.Url +'"/></span>';
					console.log(item.Url)
				})

			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败');
			}
		});
	};
	WebApp_GetEquipmentQueryInfo();

})