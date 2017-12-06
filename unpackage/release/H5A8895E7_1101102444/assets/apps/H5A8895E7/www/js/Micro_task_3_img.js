/**
 * 20170925
 * 微任务 -> 下达任务页面里面新增加的上传图片功能
 */

(function () {
	var headerImgBtn = document.getElementById("headImage");
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
	        
	    function getImage() {
	    	console.log('拍照')
            var c = plus.camera.getCamera();
            c.captureImage(function(e) {
                plus.io.resolveLocalFileSystemURL(e, function(entry) {
                	var imgSrc = entry.toLocalURL() + "?version=" + new Date().getTime();
     				
                   	setHtml(imgSrc);
                   	
//                  uploadHead(s); /*上传图片*/

                }, function(e) {
                    console.log("读取拍照文件错误：" + e.message);
                });
            }, function(s) {
                console.log("error" + s);
            }, {
                filename: "_doc/camera/"
            })
        }
	    
	    function setHtml (srcArr) {
    		var html = '<div class="task-img-item">\
					<img class="task-img" src="'+ srcArr +'" width="50" alt="" />\
					<span class="remove-img"><i class="mui-icon mui-icon-closeempty"></i></span>\
				</div>'
			
			console.log($("#taskImgWrap").children.length)
	    	$("#taskImgWrap").append(html);
	    }
	    
	   	var files = document.getElementById('testImg')
	   	var url = 'http://114.115.144.251:8002/WebApi/Upload/Post?SerialKey=' + common.guid();
	                // 上传文件
        function upload(){
            console.log(files.src);
            var wt=plus.nativeUI.showWaiting();
            var task=plus.uploader.createUpload(url,
                {method:"POST"},
                function(t,status){ //上传完成
                    if(status==200){
                    	alert("上传成功："+t.responseText);
                      	console.log(t.responseText)
                        wt.close(); //关闭等待提示按钮
                    }else{
                        alert("上传失败："+status);
                        wt.close();//关闭等待提示按钮
                    }
                }
            );
            //添加其他参数
            task.addData("name","test");
            task.addFile(files.src,{key:"dddd"});
            task.start();
        }
            
//          if(window.plus){  
//              plusReady();  
//          }else{  
//              document.addEventListener("plusready",plusReady,false);  
//          }  
//          
	    
	    
	    //------------------------------
	    function uploadHead(imgPath) {
            console.log("imgPath = " + imgPath);
//          mainImage.src = imgPath;
//          mainImage.style.width = "60px";
//          mainImage.style.height = "60px";

            var image = new Image();
            image.src = imgPath;
            image.onload = function() {
            	
                var url = 'http://114.115.144.251:8002/WebApi/Upload/Post?SerialKey=' + common.guid();
                console.log(url)
                
                /*在这里调用上传接口*/

            }
    	}

        
	function galleryImg() {
		// 从相册中选择图片
		console.log("从相册中选择图片:");
	    plus.gallery.pick( function(path){
	    	console.log(path);
	    }, function ( e ) {
	    	console.log( "取消选择图片" );
	    }, {filter:"image"} );
	}
})()
