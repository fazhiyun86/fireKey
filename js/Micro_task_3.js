var MicroTaskGUID = '';
mui.init({
	swipeBack: false,
	//	beforeback : back,
	keyEventBind: {
		//		backbutton: false //关闭back按键监听
	}
});
mui.plusReady(function() {

	//var optionsJson = this.getAttribute('data-options') || '{}';
	var TaskCodes = '';
	var TaskNameCon = '';
	var TaskDescriptCon = '';

	//现在时间

	var rand = "";
	var date = new Date();
	var getMonth = '';
	var getDate = '';
	var getHours = '';
	var getMinutes = '';
	var getSeconds = '';
	var GetGlobaltime = '';
	var inputDate = '';
	var getFullYear = date.getFullYear();

	//TaskCode
	if(date.getMonth().toString().length < 2) {
		getMonth = 0 + String(date.getMonth());
	} else {
		getMonth = String(date.getMonth());
	}
	if(date.getDate().toString().length < 2) {
		getDate = 0 + String(date.getDate());
	} else {
		getDate = String(date.getDate());
	}
	if(date.getHours().toString().length < 2) {
		getHours = 0 + String(date.getHours());

	} else {
		getHours = String(date.getHours());

	}
	if(date.getMinutes().toString().length < 2) {
		getMinutes = 0 + String(date.getMinutes());
	} else {
		getMinutes = String(date.getMinutes());
	}

	if(date.getSeconds().toString().length < 2) {
		getSeconds = 0 + String(date.getSeconds());
	} else {
		getSeconds = String(date.getSeconds());
	}

	for(var i = 0; i < 3; i++) {
		var r = Math.floor(Math.random() * 10);
		rand += r;
	}

	TaskCodes = getFullYear + getMonth + getDate + getHours + getMinutes + getSeconds;

	//点击确认
	mui('.sendBtn').on('tap', '.sendBtnClick', function() {

		//		var GetGlobaltime = localStorage.getItem('time')+" "+ getHours +":"+ getMinutes+":"+ getSeconds;
		GetGlobaltime = localStorage.getItem('time') + " " + getHours + ":" + getMinutes;
		//		console.log(GetGlobaltime)
		//				console.log(TaskCodes)
		//		console.log(rand)

		//TaskName

		var userVal = document.querySelector(".renwuVal").value.trim();
		if(!userVal) {
			mui.toast("任务名称不能为空");
			return;
		} else {
			TaskNameCon = userVal;
		}

		//TaskDescript
		var TaskDescriptV = document.querySelector(".renwuTextarea").value.trim();
		var TaskDescriptVal = TaskDescriptV.replace(/\r?\n/g,"<br/>");


		if(!TaskDescriptVal) {
			mui.toast("任务说明不能为空");
			return;
		} else {
			TaskDescriptCon = TaskDescriptVal;
		}
		//TaskEndTime
		var inputTime = document.querySelector(".inputDate").value;
		if(inputTime == '请选择') {
			mui.toast("请选择任务日期");
			return;
		} else {
			inputDate = inputTime;
		}
		//RegionID
		if(document.getElementById("Micro_task_3_area").innerText == '任务区域：请选择区域') {
			mui.toast("请选择区域");
			return;
		}
		//生成参数
		//TaskId
		var TaskIDuuid = UUID();
		//TaskCode
		var TaskCode = TaskCodes + rand;
		//TaskName
		var TaskName = TaskNameCon;
		//TaskDescript
		var TaskDescript = TaskDescriptCon;
		//Company
		var Company = localStorage.getItem('UserOrganiseUnitID')
		//RegionID
		var RegionID = localStorage.getItem('gRegionID');
		//TaskStartTime
		var TaskStartTime = GetGlobaltime;
		//TaskEndTime
		var TaskEndTime = inputDate;
		//TaskStatus
		var TaskStatus = 1;
		//CreatedBy
		var CreatedBy = localStorage.getItem('userCodeVa');

		CMDS_MiniTask_GetTaskList(TaskIDuuid, TaskCode, TaskName, TaskDescript, Company, RegionID, TaskStartTime, TaskEndTime, TaskStatus, CreatedBy)

	})

	//下达任务
	function CMDS_MiniTask_GetTaskList(MicroTaskIDuuid, MicroTaskCode, MicroTaskName, MicroTaskDescript, MicroCompany, MicroRegionID, MicroTaskStartTime, MicroTaskEndTime, MicroTaskStatus, MicroCreatedBy) {
		var urlTask = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/SendData/TZDH_WebApp_MiniTask_AddOne?datakey=00-00-00-00';
		// 
		upload()
		
		mui.ajax(urlTask, {
			data: JSON.stringify({
				TaskID: MicroTaskIDuuid,
				TaskCode: MicroTaskCode,
				TaskName: MicroTaskName,
				TaskDescript: MicroTaskDescript,
				Company: MicroCompany,
				RegionID: MicroRegionID,
				TaskStartTime: MicroTaskStartTime,
				TaskEndTime: MicroTaskEndTime,
				TaskStatus: MicroTaskStatus,
				CreatedBy: MicroCreatedBy,
				ReleaseSerialKey: MicroTaskGUID
			}),
			//			dataType: 'json', //返回
			contentType: 'application/json',
			type: 'post',
			timeout: 5000,
			success: function(data, status) {
				console.log(JSON.stringify(data))
				//				console.log(status)
				//				console.log(data.Summary.DEXResult)
				//				console.log(data.Summary.StatusCode)
				if(data.Summary.StatusCode == 100) {
					mui.toast('提交成功');
					location.reload();
				} else {
					mui.toast('提交失败:' + data.Summary.Message);
				}

			},
			error: function() {
				//异常处理
				mui.toast('提交失败')
			}
		});
	}
	//区域列表
	function CMDS_Region_GetSonList(Id) {
		var url = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/CMDS_Region_GetSonList?dataKey=00-00-00-00&OrganiseUnitID=' + Id;
//		console.log(url)
		mui.ajax(url, {
			data: null,
			dataType: 'json', //返回
			type: 'get',
			timeout: 5000,
			success: function(data) {
				var getDatas = data['DataSource']['Tables'][0]['Datas'];
				var html = '';
				mui.each(getDatas, function(index, item) {
					html += '<li>' +
						'<input type="hidden" value="' + item.RegionID + '" />' +
						'<input type="hidden" value="' + item.RegionName + '" />' +
						item.RegionName +
						'</li>';
				})
//				document.querySelector(".list_del").innerHTML = html;
			},
			error: function() {
				//异常处理
				mui.toast('数据请求失败')
			}
		})

	}
	CMDS_Region_GetSonList(localStorage.getItem('OrganiseUnitID'));

	//日期选择
	(function($) {
		$.init();
		var result = $('.inputDate')[0];
		var btns = $('.btn1');

		btns.each(function(i, btn) {
			btn.addEventListener('tap', function() {
				var dataIng = [];
				var date = new Date();
				var getFullYear = date.getFullYear();
				var getMonth = date.getMonth();
				var getDate = date.getDate();
				var getHours = date.getHours();
				var getMinutes = date.getMinutes();
				var getSeconds = date.getSeconds();

				dataIng.push(getFullYear);
				dataIng.push(getMonth);
				dataIng.push(getDate);
				dataIng.push(getHours);
				dataIng.push(getMinutes);
				var options = ({
					"type": "datetime",
					beginDate: new Date(dataIng[0], dataIng[1], dataIng[2], dataIng[3], dataIng[4]), //设置开始日期 
					endDate: new Date(Number(dataIng[0]) + 30, 12), //设置结束日期 

				});
				//var options = JSON.parse(optionsJson);
				var id = this.getAttribute('id');
				/*
				 * 首次显示时实例化组件
				 * 示例为了简洁，将 options 放在了按钮的 dom 上
				 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
				 */

				var picker = new $.DtPicker(options);
				picker.show(function(rs) {
					/*
					 * rs.value 拼合后的 value
					 * rs.text 拼合后的 text
					 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
					 * rs.m 月，用法同年
					 * rs.d 日，用法同年
					 * rs.h 时，用法同年
					 * rs.i 分（minutes 的第二个字母），用法同年
					 */

					result.value = rs.text;
					TaskCode = rs.text;
					//					console.log(TaskCodes)
					/* 
					 * 返回 false 可以阻止选择框的关闭
					 * return false;
					 */
					/*
					 * 释放组件资源，释放后将将不能再操作组件
					 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
					 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
					 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
					 */
					//选择时间不可小于当前时间
					//					var rand = "";
					//					var date = new Date();
					//					var getMonth = '';
					//					var getDate = '';
					//					var getHours = '';
					//					var getMinutes = '';
					//					var getSeconds = '';
					//					var GetGlobaltime = '';
					//					var inputDate = '';
					//					var getFullYear = date.getFullYear();
					//
					//					//TaskCode
					//					if(date.getMonth().toString().length < 2) {
					//						getMonth = 0 + String(date.getMonth());
					//					} else {
					//						getMonth = String(date.getMonth());
					//					}
					//					if(date.getDate().toString().length < 2) {
					//						getDate = 0 + String(date.getDate());
					//					} else {
					//						getDate = String(date.getDate());
					//					}
					//					if(date.getHours().toString().length < 2) {
					//						getHours = 0 + String(date.getHours());
					//
					//					} else {
					//						getHours = String(date.getHours());
					//
					//					}
					//					if(date.getMinutes().toString().length < 2) {
					//						getMinutes = 0 + String(date.getMinutes());
					//					} else {
					//						getMinutes = String(date.getMinutes());
					//					}
					//
					//					if(date.getSeconds().toString().length < 2) {
					//						getSeconds = 0 + String(date.getSeconds());
					//					} else {
					//						getSeconds = String(date.getSeconds());
					//					}
					//
					//					for(var i = 0; i < 3; i++) {
					//						var r = Math.floor(Math.random() * 10);
					//						rand += r;
					//					}
					//
					//					TaskCodes = getFullYear + getMonth + getDate + getHours + getMinutes
					//					console.log(TaskCodes);
					//
					//					var dataFnX = rs.y.value + (rs.m.value -1) + rs.d.value + rs.h.value + rs.i.value;
					//					console.log(dataFnX)
					//					if(Number(dataFnX) <= Number(TaskCodes)){
					//						mui.toast('不可小于当前时间');
					//						document.querySelector(".inputDate").value = '请选择';
					//						return;
					//					}

					picker.dispose();
				});
			}, false);
		});
	})(mui);
	// 监听点击遮罩关闭事件
	document.getElementById("backdrop").addEventListener('tap', function() {
		//阻止默认事件
		event.detail.gesture.preventDefault();
		offCanvasWrapper.offCanvas('close');
	});
})

// ----- 添加图片功能-------
document.getElementById('headImage').addEventListener('tap', function() {
    if (mui.os.plus) {
        var buttonTit = [{
            title: "拍照"
        }, {
            title: "从手机相册选择"
        }];
        
        plus.nativeUI.actionSheet({
            title: "上传图片",
            cancel: "取消",
            buttons: buttonTit
        }, function(b) { /*actionSheet 按钮点击事件*/
            switch (b.index) {
                case 0:
                    break;
                case 1:
                    getImage(); /*拍照*/
                    break;
                case 2:
                    galleryImg();/*打开相册*/
                    break;
                default:
                    break;
            }
        })
    }        
}, false);

// 拍照获取图片
function getImage() {
    var c = plus.camera.getCamera();
    c.captureImage(function(e) {
        plus.io.resolveLocalFileSystemURL(e, function(entry) {
        	var imgSrc = entry.toLocalURL() + "?version=" + new Date().getTime(); //拿到图片路径
        	
            setHtml(imgSrc);
        }, function(e) {
            console.log("读取拍照文件错误：" + e.message);
        });
    }, function(s) {
        console.log("error" + s);
    }, {
        filename: "_doc/camera/"
    })
}
// 设置显示的Html 
function setHtml (imgSrc) {
	var html = '<div class="task-img-item">\
			<img class="task-img" src="'+ imgSrc +'" width="120" alt="" />\
			<span class="remove-img"><i class="mui-icon mui-icon-closeempty"></i></span>\
		</div>'
		
	$("#taskImgWrap").append(html);
}

// 上传的方法
function upload(){
   	var files = document.getElementById('testImg')
   	MicroTaskGUID = common.guid();
   	var url = 'http://114.115.144.251:8002/WebApi/Upload/Post?SerialKey=' + MicroTaskGUID;
   	
   	var imgsArr = mui(".task-img");
   	
   	mui.each(imgsArr, function(index, item){
// 		console.log(index)
// 		console.log(item.src)
   		createUp(item)
   	})
	
	
	function createUp (files) {
	    var task = plus.uploader.createUpload(url,
	        {method:"POST"},
	        function(t,status){ //上传完成
	            if(status==200){
	            	console.log("上传成功："+t.responseText);
	            }else{
	                console.log("上传失败："+status);
	            }
	        }
	    );
	    //添加其他参数
//	    task.addData("name","test");
	    task.addFile(files.src,{key:files.src});
	    task.start();
	}
}
// 从相册中选择图片 
function galleryImg(){
	// 从相册中选择图片
    plus.gallery.pick( function(e){
    	for(var i in e.files){
	    	var fileSrc = e.files[i]
	    	setHtml(fileSrc);
    	}
    }, function ( e ) {
    	console.log( "取消选择图片" );
    },{
    	filter: "image",
    	multiple: true,
    	maximum: 5,
    	system: false,
    	onmaxed: function() {
    		plus.nativeUI.alert('最多只能选择5张图片');
    	}
    });
}

//---------------删除图片---------------
mui("#taskImgWrap").on('tap', '.remove-img', function () {
	var _this = this;
	
	$(this).parent().remove();
})
