mui.init({
	swipeBack: false,
	//beforeback : back,
	keyEventBind: {
		//		backbutton: false //关闭back按键监听
	},
	pullRefresh: {
		container: "#pullrefresh", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
		up: {
			height: 50, // 可选.默认50.触发上拉加载拖动距离
			auto: true, // 可选,默认false.自动上拉加载一次
			contentrefresh: "正在加载...", // 可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多数据了', // 可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: pullupRefresh
		}
	}

});

/**
 * 下拉刷新具体业务实现
 */

var count = -1;
var html = '';

function pullupRefresh() {
	var PageSize = 20;

	function WebApp_GetOrgCertificateList(unitcode,PageIndex,PageSize) {
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetOrgCertificateList?dataKey=00-00-00-00&&UnitCode=' + unitcode + '&PageIndex=' + PageIndex + '&PageSize=' + PageSize;
		console.log(url)
		mui.ajax(url, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				
				
					if(getDatas.length >= PageSize) {
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(false);
					} else { 
						mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
					}
					
				var html = '';
				var statusa = ['', '<img src="images/linqi.png"/>', '<img src="images/guoqi.png"/>'];
				mui.each(getDatas, function(index, item) {
					html += '<div class="Licence_adopt_con_nav_con">' +
						'<p>' + item.CertificateName + '</p>' +
						'<p>单位名称：' + item.OrganiseUnitName + '</p>' +
						'<p>登记编号：' + item.CertificateCode + '</p>' +
						'<p>有效期限：' + item.ReviewDate + '</p>' +
						'<p>发证机构：' + item.IssuingAuthority + '</p>' +
						'<p>' + statusa[Number(item.status) - 1] + '</p>' + 
						'</div>';

				})
				if(!html) {
					document.getElementById('Licence_adopt_con_nav_con1').innerHTML = '<p class="zhengzhao"><span>暂无证照</span></p>';
				} else {
					document.getElementById('Licence_adopt_con_nav_con1').innerHTML = html;
				}
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}

		})
	}
	WebApp_GetOrgCertificateList(localStorage.getItem("UnitCode"),++count,PageSize);
}
mui.plusReady(function() {
	function WebApp_GetOrgCertificateList(unitcode) {
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/WebApp_GetOrgCertificateList?dataKey=00-00-00-00&&UnitCode=' + unitcode;
		console.log(url)
		mui.ajax(url, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var html = '';
				var statusa = ['', '<img src="images/linqi.png"/>', '<img src="images/guoqi.png"/>'];
				mui.each(getDatas, function(index, item) {
					html += '<div class="Licence_adopt_con_nav_con">' +
						'<p>' + item.CertificateName + '</p>' +
						'<p>单位名称：' + item.OrganiseUnitName + '</p>' +
						'<p>登记编号：' + item.CertificateCode + '</p>' +
						'<p>有效期限：' + item.CertificateDate + '</p>' +
						'<p>发证机构：' + item.IssuingAuthority + '</p>' +
						'<p>' + statusa[Number(item.status) - 1] + '</p>' +
						'</div>';

				})
				if(!html) {
					document.getElementById('Licence_adopt_con_nav_con1').innerHTML = '<p class="zhengzhao"><span>暂无证照</span></p>';
				} else {
					document.getElementById('Licence_adopt_con_nav_con1').innerHTML = html;
				}
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}

		})
	}
	//	WebApp_GetOrgCertificateList(localStorage.getItem("UnitCode"));
})