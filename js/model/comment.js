/**
 * 评论数据模型
 * @author zhengjin
 */
define([], function(){
	'use strict';
	
	var host = 'http://210.52.217.236';
//	var host = 'http://182.118.20.208';
//	var host = 'http://10.16.29.96:8080';
	var path = {
		getCommentListByTopicId: '/comments/getComments', // { topicId: 留言id， start: 起始位置, count: 获取的数量 }
		addComment: '/comments/add' // { mid: 留言id， wName: 墙名称, content: 评论内容 }
	};
	return {
		/*************************************************************************************
		 * 根据留言id获取评论列表
		 * @param {Number} options[topicId]
		 * @param {Number} options[start]
		 * @param {Number} options[count]
		 */
		getCommentListByTopicId: function(options, ret, err){
			mui.ajax({
				url: host + path.getCommentListByTopicId,
				data: {
					mid: options['topicId'] || '',
					start: options['start'] || 0,
					count: options['count'] || 10
				},
				dataType: 'json',
				success : function(data){
					ret(data);
				},
				error : function(data){
					err(data);
				}
			});
		},
		/*************************************************************************************
		 * 添加一条评论
		 * @param {Number} options[topic]
		 * @param {Number} options[user]
		 * @param {String} options[content]
		 */
		addComment: function(options, ret, err){			
			mui.ajax({
				url: host + path.addComment,				
				data: {
					mid: options['topic'].topicId,
					wallName: options['topic'].wallName,
					user : options['user'],
					content: options['content']
				},
				dataType: 'json',
				success : function(data){
					ret(data);
				},
				error : function(data){
					err(data);
				}
			});
		}
	};
});