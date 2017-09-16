mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
//		backbutton: false //关闭back按键监听
	},

});

mui.plusReady(function() {
	//	var self = plus.webview.currentWebview();
	//	var IndicatorID = self.IndicatorID;
	//	var TaskGroupID = self.TaskGroupID;
	//	var TaskName = self.TaskName;
	//'&PageIndex=0&PageSize=20'
	function WebApp_GetFrieWorkExamine_ObjectList(Id) {
		//		 + "&PageIndex=" + 0 + "&PageSize=" +5
		var urlTask = "http://" + localStorage.getItem('serverAddress') + ":" + localStorage.getItem('portNum') + "/WebApi/DataExchange/GetData/WebApp_GetFrieWorkExamine_ObjectList?dataKey=00-00-00-00&OrganiseUnitCode=" + Id;
		console.log(urlTask);

		mui.ajax(urlTask, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var html = '';
				var stuts = ['<i style="color:#E70011;font-size:1rem;" class="iconfont icon-zhuyishixiang"></i>','<i style="color:#12E84B;font-size:1rem;" class="iconfont icon-duigou-copy"></i>'];
				mui.each(getDatas, function(index, item) {
//					item.IsNormal
					html +=
						'<div class="Equipment_patrol_con1">'+
						'<input class="sendId1" type="hidden"value="' + item.TaskObjectID + '" />' +
						'<input class="sendId1" type="hidden"value="' + item.TaskObjectName + '" />' +
						'<div class="ontro1">'+
						stuts[item.IsNormal]+
						'</div>'+
					'<div class="ontro2">'+
						'<p>'+
						item.TaskObjectName +
						'</p>' +
						'<p class="Equipment_patrol_list1_1_1_p">' +
						'<span>设备编号：' +
						item.EquipmentCode +
						'</span><span>设备型号' +
						item.ModelName +
						'</span><span>检查时间：' +
						item.InspectTime +
						'</span><span>设备位置：' +
						item.Positions +
						'</span></p>' +
						'</div></div></div>';
				})
				//				document.getElementById('list1askName1').innerHTML = item.TaskObjectName;
				document.getElementById('conid1').innerHTML = html;
				
				var datas =document.getElementById('conid1').innerText;
				setTimeout(function() {
					var datas = document.getElementById('conid1').innerText;
					if( datas == '') {
						mui.toast('网络环境不佳');
					}
				}, 4000)
			},
			error: function(e) {
				//异常处理
				console.log(e)
				mui.toast('数据请求失败')
			}
		});
	}
	WebApp_GetFrieWorkExamine_ObjectList(localStorage.getItem('OrganiseUnitCode'));
})

