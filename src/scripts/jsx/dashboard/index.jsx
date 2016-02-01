var React = require('react');
var Header = require('../component/header');
var Aside = require('../component/aside');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');


import { Pagination } from 'antd';

var Dashboard = React.createClass({
	getInitialState: function() {
		return {
			userChart: {},
			couponChart: {},
			lecturerChart: {},
			applyForLecturer: {
				page:1,
				size:20,
				list:[]
			},
			applyForAssistant: {
				page:1,
				size:20,
				list:[]
			},
			crumb:{
				current: '报表总览',
				items:[]
			}
		}
	},
	componentDidMount: function() {
		this.getUserChart();
		this.getCouponChart();
		this.getLecturerChart();
		this.getApplyForLecturer();
		this.getApplyForAssistant();
	},
	getUserChart: function () {
		var self = this;
		Api.get('dashboard/user',{})
		.done(function (res) {
			self.setState({userChart:res.data});
			// console.log(self.state);
		})
		.fail(function (error) {
			console.log(error)
		});
	},
	getCouponChart: function () {
		var self = this;
		Api.get('dashboard/coupon',{})
		.done(function (res) {
			self.setState({couponChart:res.data});
			// console.log(self.state);
		})
		.fail(function (error) {
			console.log(error)
		});
	},
	getLecturerChart: function () {
		var self = this;
		Api.get('dashboard/lecturer',{})
		.done(function (res) {
			self.setState({lecturerChart:res.data});
			// console.log(self.state);
		})
		.fail(function (error) {
			console.log(error)
		});
	},
	getApplyForLecturer: function () {
		var self = this;
		Api.get('dashboard/apply_for_lecturer',{})
		.done(function (res) {
			self.setState({applyForLecturer:res.data});
			// console.log(self.state);
		})
		.fail(function (error) {
			console.log(error)
		});
	},
	getApplyForAssistant: function () {
		var self = this;
		Api.get('dashboard/apply_for_assistant',{})
		.done(function (res) {
			self.setState({applyForAssistant:res.data});
			// console.log(self.state);
		})
		.fail(function (error) {
			console.log(error)
		});
	},
	render: function() {
		var size1 = this.state.applyForLecturer.size;
		var page1 = this.state.applyForLecturer.page;
		var size2 = this.state.applyForAssistant.size;
		var page2 = this.state.applyForAssistant.page;
		return (
			<div className="app-container">
				<Header />
				<Aside active="dashboard" />
				<div className="app-body">
					<div className="app-content dashboard animate">
						<AppContentHeader crumb={this.state.crumb} />
						<div className="app-content-body">
							<div className="dashboard-panels clearfix">
								<div className="ui-panel-wrap">
									<div className="ui-panel">
										<div className="ui-panel-header">
											<h1>图标统计1</h1>
										</div>
										<div className="ui-panel-body">123</div>
									</div>
								</div>
								<div className="ui-panel-wrap">
									<div className="ui-panel">
										<div className="ui-panel-header">
											<h1>图标统计2</h1>
										</div>
										<div className="ui-panel-body">123</div>
									</div>
								</div>
								<div className="ui-panel-wrap">
									<div className="ui-panel">
										<div className="ui-panel-header">
											<h1>图标统计3</h1>
										</div>
										<div className="ui-panel-body">123</div>
									</div>
								</div>
							</div>
							<div className="ui-panel">
								<div className="ui-panel-header">
									<h1>数据表格1</h1>
								</div>
								<table className="ui-table">
									<thead>
										<tr>
											<th className="index">#</th>
											<th>key</th>
											<th>name</th>
											<th>mobile</th>
											<th>email</th>
											<th className="tac" width="80">操 作</th>
										</tr>
									</thead>
									<tbody>
									{
										this.state.applyForLecturer.list.map(function (item,index) {
											return (
												<tr key={index}>
													<td className="index">{(page1 - 1) * size1 + index + 1}</td>
													<td>{item.key}</td>
													<td>{item.name}</td>
													<td>{item.mobile}</td>
													<td>{item.email}</td>
													<td className="tac">
														<a className="opera-link" href="javascript:;">编辑</a>
														<a className="opera-link" href="javascript:;">删除</a>
													</td>
												</tr>
											)
										})
									}
									</tbody>
								</table>
								<div className="ui-panel-footer">
									<div className="total-item">共 {this.state.applyForLecturer.total} 条数据</div>
									<Pagination showSizeChanger showQuickJumper defaultCurrent={2} total={500} />
								</div>
							</div>
							<div className="ui-panel">
								<div className="ui-panel-header">
									<h1>数据表格2</h1>
								</div>
								<table className="ui-table">
									<thead>
										<tr>
											<th className="index">#</th>
											<th>key</th>
											<th>name</th>
											<th>mobile</th>
											<th>email</th>
											<th className="tac" width="80">操 作</th>
										</tr>
									</thead>
									<tbody>
									{
										this.state.applyForAssistant.list.map(function (item,index) {
											return (
												<tr key={index}>
													<td className="index">{(page2 - 1) * size2 + index + 1}</td>
													<td>{item.key}</td>
													<td>{item.name}</td>
													<td>{item.mobile}</td>
													<td>{item.email}</td>
													<td className="tac">
														<a className="opera-link" href="javascript:;">编辑</a>
														<a className="opera-link" href="javascript:;">删除</a>
													</td>
												</tr>
											)
										})
									}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Dashboard;