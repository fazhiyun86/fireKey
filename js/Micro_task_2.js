mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
		//		backbutton: false //关闭back按键监听
	}
});
mui.plusReady(function() {
	window.addEventListener("pageflowrefresh", function(e) {
		//location.reload();
		CMDS_MiniTask_GetTaskList(localStorage.getItem('userCodeVa'));
	});
	//	alert(123)

	function CMDS_MiniTask_GetTaskList(UserID) {
		var urlTask = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/CMDS_MiniTask_GetTaskList?dataKey=00-00-00-00&TaskStatus=2' + '&UserID=' + UserID;
//		console.log(urlTask);
		mui.ajax(urlTask, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				console.log(JSON.stringify(getDatas));
				
				var html = '';
				if(getDatas.length == 0) {
					document.getElementById("Micro_task_1").innerHTML = '<p style="text-align:center;color:#999999;"><span>暂无评价</span></p>';
					return;
				}

					var stuts = ['<i style="color:#3F51B5;font-size:1rem;" class="iconfont icon-shijian"></i>', '<i style="color:#E51C23;font-size:1rem;" class="iconfont icon-iconshandianfahuo"></i>', '<i style="color:#8EC21F;font-size:1rem;" class="iconfont icon-duigou-copy"></i>'];
					mui.each(getDatas, function(index, item) {

						html +=
							'<div class="Equipment_patrol_con1" style="box-shadow: none;">' +
							'<input class="sendId1" type="hidden"value="' + item.TaskID + '" />' +
							'<div style="width:6%;padding-top:2rem;">' +
							stuts[item.Status] +
							'</div>' +
							'<div class="Equipment_patrol_ccon2" style="width: 94%;">' +
							'<p style="font-size:0.85rem;">' + item.TaskName + '</p>' +
							'<p style="font-size:0.7rem;color:#757575;">' + '任务期限：' + item.TaskEndTime + '</p>' +
							'<p style="font-size:0.7rem;color:#757575;" class="Micro_task_pspan">' +
							'<span>执行结果：' + item.TaskResult + '</span>' +
							'<span>完成日期：' + item.ExecuteTime + '</span>' +
							'</p>' +
							'<p style="font-size:0.7rem;color:#757575;" class="Micro_task_pspan">' +
							'<span>完成评价：' + item.EstimateLevel + '</span>' +
							'<span>评价时间：' + item.EstimateTime + '</span>' +
							'</p>' +
							'</div>' +
							'</div>'

					})
				
				document.getElementById("Micro_task_1").innerHTML = html;
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		});
	}
	CMDS_MiniTask_GetTaskList(localStorage.getItem('userCodeVa'));
})