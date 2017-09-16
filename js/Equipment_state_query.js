mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
//		backbutton: false //关闭back按键监听
	}
});
mui.plusReady(function() {

//	function WebApp_GetEquipmentStatusQuery(code) {
//		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetEquipmentStatusQuery?dataKey=00-00-00-00&code=' + code;
//		console.log(url);
//		mui.ajax(url, {
//			data: null,
//			dataType: 'json', //返回
//			type: 'get',
//			timeout: 5000,
//			success: function(data) {
//				//服务器返回响应，根据响应结果，分析是否登陆成功
//				var getDatas = data['DataSource']['Tables'][0]['Datas'];
//				mui.each(getDatas, function(index, item) {})
//			},
//			error: function() {
//				//异常处理
//				mui.toast('数据请求失败')
//			}
//		});
//	};
//	WebApp_GetEquipmentStatusQuery(code)

})