(function(){
	var MicroTaskGUID = '';
	mui.init({
		swipeBack: false,
		//	beforeback : back,
		keyEventBind: {
			//		backbutton: false //关闭back按键监听
		}
	});
	mui.plusReady(function() {
		setSubCompany();
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
			var Company = localStorage.getItem('UserOrganiseUnitID');
			//RegionID
			var RegionID = $('#quyu').attr("data-area");
			//TaskStartTime
			var TaskStartTime = GetGlobaltime;
			//TaskEndTime
			var TaskEndTime = inputDate;
			//TaskStatus
			var TaskStatus = 1;
			//CreatedBy
			var CreatedBy = localStorage.getItem('userCodeVa');
			
			console.log('==1======'+TaskIDuuid+'==3======'+TaskCode+'====3==='+TaskName+'====4==='+TaskDescript+'===5==='+Company+"==5-2==="+RegionID+'===6==='+TaskStartTime+'====7==='+TaskEndTime+'====8=='+TaskStatus+'===9=='+CreatedBy)
			
			CMDS_MiniTask_GetTaskList(TaskIDuuid, TaskCode, TaskName, TaskDescript, Company, RegionID, TaskStartTime, TaskEndTime, TaskStatus, CreatedBy)
	
		})
		
			/**	
			 * 获取自己以及下属单位
			 */
			
			function setSubCompany() {
			
			 	var data = {
			 		OrganiseUnitID: localStorage.getItem("UserOrganiseUnitID"),
			 	}
			
			 	urlg = 'http://' + localStorage.getItem("serverAddress") + ':' + localStorage.getItem("portNum") + '/WebApi/DataExchange/GetData/TZDH_WebApp_GetChildrenOrganiseUnitAndRegion?dataKey=00-00-00-00';
			
			 	mui.ajax(urlg, {
			 		data: data,
			 		dataType: 'json',
			 		type: 'get',
			 		timeout: 5000,
			 		success: function(data) {
			 			//							data1 = data1['DataSource']['Tables'][0]['Datas'];
			 			//							data2 = data1['DataSource']['Tables'][1]['Datas'];
			 			data = data['DataSource']['Tables']
			
			 			var t = common.formateArea(data);
			 			setSubCompanyHtml(t)
			 		},
			 		error: function() {
			 			mui.toast('数据请求失败')
			 			console.log("请求数据失败!")
			 		}
			 	});
			
			 	//侧滑拼接
			 	function setSubCompanyHtml(data) {
			 		var html = '';
			 		var len = data.length;
			 		for(var i = 0; i < len; i++) {
			 			var item = data[i];
			 			html += '<div class="lists" data-id=" item.OrganiseUnitID ">' +
			 				'<div id="topid" class="listTop">' +
			 				'<div class="list_bt">' +
			 				'<p class="p1">' + (item.OrganiseUnitName) + '</p>' +
			 				'<p class="p2">' + (item.ParentOrganiseUnitName) + '</p>' +
			 				'</div>' +
			 				'<span id="show" class="show"><img src="images/arrow_2.png"/></span>' +
			 				'</div>' +
			 				'<ul id="hide" class="list_del" id="' + item.OrganiseUnitID + '">' + setLi(item.children) +
			 				'</ul>' +
			 				'</div>';
			 		}
			
			 		function setLi(areaData) {
			 			var html = '';
			 			var len = areaData.length;
			
			 			for(var j = 0; j < len; j++) {
			 				var item = areaData[j];
			
			 				html += '<li class="areali" data-area="' + item.RegionID + '">' + item.FullName + '</li>';
			 			}
			 			return html;
			 		}
			
			 		document.getElementById('area_con_list').innerHTML = html;
			 	}
			 	
			 	 //侧滑二级菜单的点击样式
			mui('.area_con_list').on('tap', '.lists', function(e) {
			 	if($(this).find("#hide").is(":hidden")) {
			 		$(this).find("#hide").show(); //如果元素为隐藏,则将它显现
			 		$(this).find("img").addClass("rotating")
			 	} else {
			 		$(this).find("#hide").hide(); //如果元素为显现,则将其隐藏
			 		$(this).find("img").removeClass("rotating")
			 	}
			});
			
			 //下属单位获取
			mui(document).on('tap', '.areali', function() {
				var offCanvasWrapper = mui('#offCanvasWrapper');
			 	var areaLi = $(this).text();
			 	var areaID = $(this).attr("data-area");
			 	$("#quyu").text('任务区域：' + areaLi);
			 	$('#quyu').attr("data-area", areaID);
				offCanvasWrapper.offCanvas('show');
			});
			}
			
			
		
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
//						console.log('beginDate'),
						endDate: new Date(Number(dataIng[0]) + 30, 12), //设置结束日期 
					
	
					});	
//					console.log(options.endDate)
					console.log(options.beginDate)
//					var options = JSON.parse(optionsJson);
					var optionsJson = this.getAttribute('data-options') || '{}';
//					var options = JSON.parse(optionsJson);
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

	
						picker.dispose();
					});
				}, false);
			});
		})(mui);
	//	 监听点击遮罩关闭事件
	//	document.getElementById("backdrop").addEventListener('tap', function() {
	//		//阻止默认事件
	//		event.detail.gesture.preventDefault();
	//		offCanvasWrapper.offCanvas('close');
	//	});
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
		var $taskImgWrap = $("#taskImgWrap");
		
		if($taskImgWrap[0].children.length >= 5) {
			mui.toast('最多上传5张照片')
			return false;
		}
		var html = '<div class="task-img-item">\
				<img class="task-img" src="'+ imgSrc +'" width="120" alt="" />\
				<span class="remove-img"><i class="mui-icon mui-icon-closeempty"></i></span>\
			</div>'
		
		$taskImgWrap.append(html);
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

})();
