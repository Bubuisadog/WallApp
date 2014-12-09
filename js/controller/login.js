define([
	'../model/user'],
	function(User){
	'use strict';
	
	mui.init();
	/************************************************************************************
	 * 业务逻辑
	 ***********************************************************************************/
	function login(user) {
		User.login(user)
		.done(function(data){
			if(data.errno !== 0) return alert('登陆出错:' + data.msg);
			if(!window.plus) return alert('plus没准备好');
			plus.storage.setItem('username', user.name);
			mui.openWindow({
				id: '../index.html',
				url: '../index.html',
				scrollIndicator: 'none'
			});
		})
		.fail(function(){
			alert('登陆请求失败');
		});
	}
	function register(user) {
		User.add(user)
		.done(function(data){
			if(data.errno !== 0) return alert('注册出错:' + data.msg );
			alert('注册成功,请登陆');
			$(body).removeClass('page--reg');
		})
		.fail(function(){
			alert('注册请求失败');
		});
	}
	function checkName(name) {
		User.existUser(name)
		.done(function(data){
			if(data.errno === 430) {
				var $name = $('.js-form-reg [name=name]');
				if( !$name.hasClass('existed') ) $name.addClass('existed');
				return alert('用户名已经存在');
			} else if (data.errno === 0) {
				$('.js-form-reg [name=name]').removeClass('existed');
			} else {
				return alert('唯一性检查出错');
			}
		})
		.fail(function(){
			return alert('唯一性检查请求失败:');
		});
	}
	/************************************************************************************
	 * 交互事件处理
	 ***********************************************************************************/
	mui.ready(function() {
		$('body')
		.on('blur', '.js-form-reg [name=name]', function(e){
			var name = $(this).val();
			if(name) checkName( name );
		})
		.on('tap', '.js-login', function(e){
			var $name = $('.js-form-login [name=name]');
			var $pwd = $('.js-form-login [name=pwd]');
			if( $name.val() == '' ) return alert('用户名不能为空');
			if( $pwd.val() == '' ) return alert('密码不能为空');
			login({
				name: $name.val(),
				pwd: $pwd.val()
			});
			return false;
		})
		.on('tap', '.js-reg', function(e){
			var $name = $('.js-form-reg [name=name]');
			var $pwd = $('.js-form-reg [name=pwd]');
			if( $name.hasClass('existed') ) return alert('用户名已经存在');
			if( $name.val() == '' ) return alert('用户名不能为空');
			if( $pwd.val() == '' ) return alert('密码不能为空');
			register({
				name: $name.val(),
				pwd: $pwd.val()
			});
			return false;
		})
		.on('tap', '.js-to-login', function(e){
			$('body').removeClass('page--reg');
		})
		.on('tap', '.js-to-reg', function(e){
			$('body').addClass('page--reg')
		});
	});
});