mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
//		backbutton: false //关闭back按键监听
	}
});

function WebApp_GetOrganiseUnit() {
	var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetOrganiseUnit?dataKey=00-00-00-00&userID=' + localStorage.getItem('userCodeVa');
	console.log(url);
	mui.ajax(url, {
		data: null,
		dataType: 'json', //返回
		type: 'get',
		timeout: 5000,
		success: function(data) {
			
			var offCanvasWrapper111 = mui('#offCanvasWrapper');
			var getDatas = data['DataSource']['Tables'][0]['Datas'];
			var html = '';
			var OrUnitName = [];
			var OrganiseUnitID = [];
			
			for(var i = 0; i < getDatas.length; i++) {
//				if(getDatas[i].OrganiseUnitCode.)
				html += '<li class="OrganiseUnitIDLi">' +
					'<input class="sendId1" type="hidden"value="' + getDatas[i].OrganiseUnitCode + '" />' +
					'<input class="sendId1" type="hidden"value="' + getDatas[i].OrganiseUnitName + '" />' +
					'<input class="sendId1" type="hidden"value="' + getDatas[i].OrganiseUnitID + '" />' +
					'<span class="table-view_Name">' + getDatas[i].OrganiseUnitName + '</span>' +
					'</li>';
				OrUnitName.push(getDatas[i].OrganiseUnitName);
				OrganiseUnitID.push(getDatas[i].OrganiseUnitID);
//				console.log(getDatas[i].OrganiseUnitName)
			}
			
			localStorage.setItem('OrganiseUnitID',OrganiseUnitID[0]);
//			document.getElementById('2017date').innerHTML = OrUnitName[0];
//			document.getElementById('table_view').innerHTML = html;
			localStorage.setItem('index_name',OrUnitName[0]);
//			console.log(html)
			
			mui('#table_view').on('tap', '.OrganiseUnitIDLi', function() {
//				alert("ASDf")
//				console.log(this.firstChild.value)
//				document.getElementById('index_zhongdian').innerHTML = this.children[1].value;
//				localStorage.setItem('UnitCode', this.firstChild.value);
//				offCanvasWrapper111.offCanvas('close');
//				WebApp_GetISMStatistical(time, localStorage.getItem('UnitCode'));
//				WebApp_GetCertificateInfo(localStorage.getItem('UnitCode'))
//				
			})
		},
		error: function() {
			//异常处理
			mui.toast('数据请求失败')
		}
	})
}
WebApp_GetOrganiseUnit();