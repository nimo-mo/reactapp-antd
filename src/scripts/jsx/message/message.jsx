var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');
var Util = require('../../js/util');

import { Button, Select, Modal } from 'antd';
var Option = Select.Option;

var BasicInfo = React.createClass({
	componentDidMount: function() {
		if (this.props.id) {
			this.getMessage();
		}
	},
	getInitialState: function() {
		return {
			error: '',
	    title: '',
	    content: '',
	    description: '',
	    origin: '',
	    cover: '',
	    keywords: '',
	    keywordsMatchType: '',
	    replyType: ''
		};
	},
	getMessage: function () {
		Api.get('message/'+this.props.id,{})
		.done(function (res) {
			for (var i in res.data) {
				this.state[i] = res.data[i]
			}
			this.setState(this.state);
		}.bind(this))
		.fail(function (error) {
			console.log(error)
		});
	},
	saveMessage: function () {
		if (this.state.title === '') {
			this.setState({error:'*头衔不能为空'});
			this.refs['title'].focus();
			return;
		}
		if (this.state.name === '') { 
			this.setState({error:'*真实姓名不能为空'});
			this.refs['name'].focus();
			return;
		}
		if (this.state.number === '') { 
			this.setState({error:'*联系方式不能为空'});
			this.refs['number'].focus();
			return;
		}
		if (this.state.description === '') {
			this.setState({error:'*详细描述不能为空'});
			this.refs['description'].focus();
			return;
		}
		this.setState({error:''}); // clear error
		Api.put('update_lecturer_info',this.state)
		.done(function (res) {
			Modal.success({
		    title: '更新成功',
		    okText: '关 闭'
		  });
		})
		.fail(function (error) {
			console.log(error)
		})
	},
	render: function() {
		return (
			<div className="ui-panel last basic-info">
				<div className="ui-panel-header">
					<h1>助理信息</h1>
				</div>
				<div className="ui-panel-body">
					<table className="form-table">
						<tbody>
							<tr>
								<td  className="tar" width="100">标题</td>
								<td>
									<input
										ref="title"
										type="text"
										className="ui-input"
										value={this.state.title}
										onChange={function (e) {
											this.setState({title:e.target.value})
										}.bind(this)} />
								</td>
							</tr>
							<tr>
								<td className="tar">关键字</td>
								<td>
									<input
										ref="keywords"
										type="text"
										className="ui-input"
										value={this.state.keywords}
										onChange={function (e) {
											this.setState({keywords:e.target.value})
										}.bind(this)} />
								</td>
							</tr>
							<tr>
								<td className="tar">关键字匹配方式</td>
								<td>
									<Select
										ref="keywords-match-type"
										style={{width:280}}
										value={this.state.keywordsMatchType}
										onChange={function (value) {
											this.setState({keywordsMatchType:value})
										}.bind(this)}>
										<Option value="">请选择</Option>
										<Option value="like">模糊匹配</Option>
										<Option value="equal">完全匹配</Option>
									</Select>
								</td>
							</tr>
							<tr>
								<td className="tar">回复方式</td>
								<td>
									<Select
										ref="reply-type"
										style={{width:280}}
										value={this.state.replyType}
										onChange={function (value) {
											this.setState({replyType:value})
										}.bind(this)}>
										<Option value="">请选择</Option>
										<Option value="plain">文本回复</Option>
										<Option value="both">图文回复</Option>
									</Select>
								</td>
							</tr>
							<tr>
								<td className="tar vat">回复内容</td>
								<td>
									<textarea
										rows="5"
										ref="content"
										style={{width:500}}
										className="ui-textarea"
										value={this.state.content}
										onChange={function (e) {
											this.setState({content:e.target.value})
										}.bind(this)} />
								</td>
							</tr>
							<tr>
								<td className="tar vat">消息描述</td>
								<td>
									<textarea
										rows="5"
										ref="description"
										style={{width:500}}
										className="ui-textarea"
										value={this.state.description}
										onChange={function (e) {
											this.setState({description:e.target.value})
										}.bind(this)} />
								</td>
							</tr>
							<tr>
								<td className="tar vat">原文地址</td>
								<td>
									<textarea
										rows="5"
										ref="origin"
										style={{width:500}}
										className="ui-textarea"
										value={this.state.origin}
										onChange={function (e) {
											this.setState({origin:e.target.value})
										}.bind(this)} />
								</td>
							</tr>
							<tr>
								<td className="tar"></td>
								<td>
									<Button type="primary" ref="trigger-btn" onClick={this.saveMessage}>保 存</Button>
									<span style={{marginLeft:12}} className="error-msg">{this.state.error}</span>
								</td>
								<td className="error-msg"></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}

});

var Message = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	crumb: {
		current: '消息详情',
		items: [{
			href: '#/message/list/121',
			title: '微信回复管理'
		}]
	},
	render: function() {
		var id = this.props.routeParams.id;
		return (
			<div className="app-content message">
				<AppContentHeader crumb={this.crumb} />
				<div className="app-content-body">
					<BasicInfo id={id} />
				</div>
			</div>
		);
	}

});

module.exports = Message;