define([
	'../lib/text!../tpl/wallList.html', 
	'../lib/microtemplate',
	'../model/wall'],
	function(tplWallList, Template, Wall){
	'use strict';
	
	var wallListContainer = document.getElementById('wallListContainer');
	
	mui.init();
	
	/************************************************************************************
	 * 获取数据，渲染页面
	 ***********************************************************************************/
	function getWallList(position) {
		var coords = position.coords;
		Wall.getWallListByLocation(coords)
		.done(function(data){
			console.log('WallList接口返回数据：', data);
			if(data.errno !== 0) return;
			var wallListHtml = Template.tmpl(tplWallList, {data: data.data.pois});
			wallListContainer.innerHTML = wallListHtml;
		});
	}
	
	mui.ready(function() {
//		plus.geolocation.getCurrentPosition(function(position){
//			var coords  = position.coords;//获取地理坐标信息；
//			getWallList(codns);//加载墙
//		}, function(){ //获取地理位置失败的回调
//			alert('获取地理位置失败');
//		});
		getWallList({
			coords: {
				longitude: '116.322987',
				latitude: '39.983424'
				}
			});
	});
	
	/************************************************************************************
	 * 交互事件处理
	 ***********************************************************************************/
	mui.ready(function() {
		mui('body').on('tap', 'a', function(e) {
			var id = this.getAttribute('href');
			if (id) {
				if (~id.indexOf('.html')) {
					if (window.plus) {
						mui.openWindow({
							id: id,
							url: this.href
						});
					} else {
						document.location.href = this.href;
					}
				} else {
					if (typeof plus !== 'undefined') {
						plus.runtime.openURL(id);
					}
				}
			}
		});
	});
});