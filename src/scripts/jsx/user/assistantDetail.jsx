var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');
var Util = require('../../js/util');

import { Button, Modal } from 'antd';

var BasicInfo = React.createClass({
	componentDidMount: function() {
		this.loadBasicInfo();
	},
	getInitialState: function() {
		return {
			error: '',
			name: '',
			title: '',
			number: '',
			description: ''
		};
	},
	loadBasicInfo: function () {
		Api.get('lecturer_info',{
			id: this.props.id
		})
		.done(function (res) {
			this.setState({
				name: res.data.name,
				title: res.data.title,
				number: res.data.number,
				description: res.data.description
			});
		}.bind(this))
		.fail(function (error) {
			console.log(error)
		});
	},
	updateBasicInfo: function () {
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
		// if (!/^1[3|5|7|8]\d{9}$/.test(this.state.number)) {
		// 	this.setState({error:'手机号格式有误'});
		// 	this.refs['number'].focus();
		// 	return;
		// }
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
			<div className="ui-panel last">
				<div className="ui-panel-header">
					<h1>助理信息</h1>
				</div>
				<div className="ui-panel-body">
					<table className="basic-info">
						<tbody>
							<tr>
								<td className="tar">头衔</td>
								<td>
									<input className="ui-input" name="title" ref="title" type="text" value={this.state.title} onChange={function (e) {
										this.setState({title:e.target.value})
									}.bind(this)} />
								</td>
								<td className="error-msg"></td>
							</tr>
							<tr>
								<td className="tar">真实姓名</td>
								<td><input className="ui-input" name="name" ref="name" type="text" value={this.state.name} onChange={function (e) {
									this.setState({name:e.target.value})
								}.bind(this)} /></td>
								<td className="error-msg"></td>
							</tr>
							<tr>
								<td className="tar">联系方式</td>
								<td><input className="ui-input" name="number" ref="number" type="text" value={this.state.number} onChange={function (e) {
									this.setState({number:e.target.value})
								}.bind(this)} /></td>
								<td className="error-msg"></td>
							</tr>
							<tr>
								<td className="tar vat">详细描述</td>
								<td><textarea className="ui-input" name="description" ref="description" rows="6" value={this.state.description} style={{width:500}} onChange={function (e) {
									this.setState({description:e.target.value})
								}.bind(this)} /></td>
								<td className="error-msg"></td>
							</tr>
							<tr>
								<td className="tar"></td>
								<td>
									<Button type="primary" ref="trigger-btn" onClick={this.updateBasicInfo}>保 存</Button>
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

var AssistantDetail = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	crumb: {
		current: '助理详情',
		items: [{
			href: '#/user/list',
			title: '用户管理'
		},{
			href: '#/lecturer/list',
			title: '助理管理'
		}]
	},
	render: function() {
		var id = this.props.routeParams.id;
		return (
			<div className="app-content animate">
				<AppContentHeader crumb={this.crumb} />
				<div className="app-content-body lecturer">
					<BasicInfo id={id} />
				</div>
			</div>
		);
	}

});

module.exports = AssistantDetail;