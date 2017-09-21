(function () {
	var searchBtn = document.getElementById('searchCode')
	if(!searchBtn) return false
	searchBtn.addEventListener('tap', function() {
		mui.openWindow({
			url: 'Scancode.html',
			id: 'Scancode.html',
			styles: {
				top: 0, //新页面顶部位置
				bottom: 0, //新页面底部位置
			},
			extras: {
				//自定义扩展参数，可以用来处理页面间传值
			},
			show: {
				duration: '300'
			},
			waiting: {
				autoShow: true, //自动显示等待框，默认为true
				title: '加载中...', //等待对话框上显示的提示内容
			}
		});
	})
})()