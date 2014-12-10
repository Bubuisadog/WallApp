/**
 * 用户数据模型
 * @author zhengjin
 */
define([], function(){
	'use strict';
	
	var host = 'http://210.52.217.236';
//	var host = 'http://182.118.20.208';
//	var host = 'http://10.16.29.102:8080';
	var path = {
		existUser: '/user/existUser', //?name=222
		add: '/user/add', //?name=222&pwd=bbb
		login: '/user/login' //?name=222&pwd=bbb
	};
	return {
		/**
		 * 用户名唯一检验
		 */
		existUser: function(name){
			if( !name ) return alert('用户名不能为空');
			return $.ajax({
				url: host + path.existUser,
				data: {
					name: name
				},
				dataType: 'json'
			});
		},
		/**
		 * 注册
		 */
		add: function(user){
			if( !user.name ) return alert('用户名不能为空');
			if( !user.pwd ) return alert('密码不能为空')
			return $.ajax({
				url: host + path.add,
				data: {
					name: user.name,
					pwd: user.pwd
				},
				dataType: 'json'
			});
		},
		/**
		 * 登陆
		 * @param {Object} user
		 */
		login: function(user){
			if( !user.name ) return alert('用户名不能为空');
			if( !user.pwd ) return alert('密码不能为空')
			return $.ajax({
				url: host + path.login,
				data: {
					name: user.name,
					pwd: user.pwd
				},
				dataType: 'json',
				success: function(data){
					alert(JSON.stringify(data));
				}
			});
		}
	};
});