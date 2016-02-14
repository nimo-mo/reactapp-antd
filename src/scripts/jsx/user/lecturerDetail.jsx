var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');
var Util = require('../../js/util');

import { Button, DatePicker, Select, Table, Pagination, Modal } from 'antd';
var Option = Select.Option;

var UploadAvatar = React.createClass({
	getInitialState: function() {
		return {
			src: '' 
		};
	},
	componentDidMount: function () {
		this.loadUploadedAvatar();
	},
	loadUploadedAvatar: function () {
		Api.get('lecturer_Avatar',{})
		.done(function (res) {
			this.setState({
				src: res.data.src
			});
		}.bind(this))
		.fail(function (error) {
			console.log(error)
		})
	},
	onFileChange: function () {
		var formData = new FormData();
		var file = this.refs['file'].files[0];
		formData.append('resource', file, file.name);
		Util.previewFile(file,function (blobURL) {
			this.setState({
				src: blobURL 
			});
		}.bind(this))
		Api.upload('upload',formData)
		.done(function (res) {
			// body...
		})
		.fail(function (error) {
			console.log(error)
		});
	},
	triggerChange: function () {
		$(this.refs['file']).click();
	},
	render: function () {
		return(
			<div className="ui-panel last">
				<div className="ui-panel-header">
					<h1 className="">讲师头像</h1>
				</div>
				<div className="ui-panel-body clearfix">
					<div className="preview fl"><img src={this.state.src} /></div>
					<div className="trigger-area">
						<p>1、图片将在微信网页端显示，图片尺寸控制在750*750像素范围内为最佳</p>
						<p>2、图片显示样式仅供参考，实际呈现以微信网页端为准</p>
						<input className="not-display" ref="file" type="file" accept="image/gif,image/jpeg,image/png" onChange={this.onFileChange} />
						<Button type="primary" ref="trigger-btn" onClick={this.triggerChange}>修改头像</Button>
					</div>
				</div>
			</div>
		)
	}
});

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
					<h1 className="">讲师信息</h1>
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

var FreeTimeList = React.createClass({
	getInitialState: function() {
		return {
			total: 0,
			currentPage: 1,
			pageSize: 10,
			dataSource: [],
			name: '',
			date: '',
			error: '',
			modalVisible: false,
			freeDate: '',
			freeTimeStart: '',
			freeTimeEnd: ''
		}
	},
	componentDidMount: function() {
		this.getUserData(0,10);
	},
	showModal: function () {
    this.setState({
    	error: '',
    	freeDate: '',
			freeTimeStart: '',
			freeTimeEnd: '',
      modalVisible: true
    });
  },
  handleOk: function () {
  	if (this.state.freeDate === '') {
  		this.setState({error:'*空闲日期不能为空'});
  		// $(ReactDOM.findDOMNode(this.refs['free-date'])).find('input').focus();
  		return;
  	};
  	if (this.state.freeTimeStart === '') {
  		this.setState({error:'*请选择起始空闲时间'});
  		return;
  	};
  	if (this.state.freeTimeEnd === '') {
  		this.setState({error:'*请选择截止空闲时间'});
  		return;
  	};
  	if (Number(this.state.freeTimeEnd) <= Number(this.state.freeTimeStart)) {
  		this.setState({error:'*截止空闲时间必须晚于起始空闲时间'});
  		return;
  	};
    this.setState({
    	error: '',
      modalVisible: false
    });
    Api.post('add_free_time',{
    	id: this.props.id,
    	freeDate: this.state.freeDate,
    	freeTimeStart: this.state.freeTimeStart,
    	freeTimeEnd: this.state.freeTimeEnd
    })
    .done(function (res) {
    	this.getUserData(0,this.state.pageSize);
    	Modal.success({
    		title: '添加成功',
		    okText: '关 闭'
    	});
    }.bind(this))
    .fail(function (error) {
    	console.log(error)
    })
  },
  handleCancel: function (e) {
    this.setState({
      modalVisible: false
    });
  },
  onFreeDateChange: function (value) {
  	this.setState({freeDate:new Date(value).format('yyyy-MM-dd')})
  },
  onFreeTimeStartChange: function (value) {
  	this.setState({freeTimeStart:value})
  },
  onFreeTimeEndChange: function (value) {
  	this.setState({freeTimeEnd:value})
  },
  limitArray: function (start, end) {
	  var result = [];
	  for (var i = start; i < end; i++) {
	    result.push(i);
	  }
	  return result;
	},
	disabledMinutes: function () {
	  return this.limitArray(0, 60).filter(function (value) {
	  	return (value % 30 !== 0)
	  });
	},
	disabledStartHours: function () {
		if (this.state.freeTimeEnd !== '') {
			var hours = this.limitArray(0, 24);
			var endHour = this.state.freeTimeEnd;
	  	return hours.splice(endHour, hours.length - endHour);
		};
	  return [];
	},
	disabledEndHours: function () {
		if (this.state.freeTimeStart !== '') {
			var hours = this.limitArray(0, 24);
			var startHour = this.state.freeTimeStart;
			return hours.splice(0, startHour);
		};
	  return [];
	},
  showConfirm: function (id) {
	  Modal.confirm({
	    title: '确认要删除该条记录吗',
	    content: '',
	    okText: '是的，我确定',
	    cancelText: '再考虑一下',
	    onOk: function () {
	      Api.post('delete_free_time',{
	      	id:id
	      })
	      .done(function (res) {
	      	this.getUserData(this.state.currentPage,this.state.pageSize);
	      }.bind(this))
	      .fail(function (error) {
	      	console.log(error)
	      })
	    }.bind(this),
	    onCancel: function () {}
	  });
	},
	getUserData: function (page,size) {
		Api.get('boss_user/list',{
			page: page,
			size: size,
			name: this.state.name,
			date: this.state.date,
			type: 'lecturer',
			sort: 'createTime',
			direction: 'DESC'
		})
		.done(function (res) {
			var total = res.data.total;
			var dataSource = res.data.list;
			for (var i = 0; i<dataSource.length; i++) {
				dataSource[i].key = i;
				dataSource[i].operation = ['删除','安排课程'];
			}
			this.setState({
				total: total,
				dataSource: dataSource
			});
		}.bind(this))
		.fail(function (error) {
			console.log(error)
		});
	},
	queryUserData: function () {
		this.getUserData(0,this.state.pageSize);
	},
	resetQueryParams: function () {
		this.setState({name:'',date:''})
	},
	onNameChange: function (e) {
		this.setState({name:e.target.value})
	},
	onDateChange: function (value) {
		this.setState({date:new Date(value).format('yyyy-MM-dd')})
	},
	generateColumns: function () {
		return [{
			width: 48,
		  title: 'ID',
		  dataIndex: 'id',
		  className: 'tac'
		},{
		  title: '讲师姓名',
		  dataIndex: 'userName'
		},{
		  title: '空闲日期',
		  dataIndex: 'updateTime',
		  render: function (text,record) {
		  	return <span>{new Date(text).format('yyyy-MM-dd')}</span>
		  }
		},{
		  title: '空闲时间',
		  dataIndex: 'createTime',
		  render: function (text,record) {
		  	return <span>{new Date(text).format('HH:mm')} 至 {new Date(text).format('HH:mm')}</span>
		  }
		},{
		  title: '操作',
		  dataIndex: 'operation',
		  className: 'tac',
		  render: function (text,record) {
		    return (
		    	<span className="operation">
			    	<a href="javascript:;" onClick={this.showConfirm.bind(null,record.id)}>{record.operation[0]}</a>
			    	<a href="javascript:;" onClick={this.showConfirm.bind(null,record.id)}>{record.operation[1]}</a>
		    	</span>
	    	)
		  }.bind(this)
		}];
	},
	generatePagination: function () {
		return {
		  total: this.state.total,
		  current: this.state.currentPage,
		  pageSize: this.state.pageSize,
		  showSizeChanger: true,
		  showQuickJumper: true,
		  pageSizeOptions: ['10','20','30'],
		  onShowSizeChange: function (current, pageSize) {
		    this.getUserData(current,pageSize);
		    this.setState({pageSize:pageSize});
		  }.bind(this),
		  onChange: function (current) {
		    this.getUserData(current,this.state.pageSize);
		  }.bind(this)
		}
	},
	render: function() {
		return (
			<div className="ui-panel last">
				<div className="ui-panel-header">
					<h1>讲师空闲时间表</h1>
				</div>
				<div className="ui-panel-header query-bar clearfix">
					<label className="query-item fl">
						<span className="label-name">讲师姓名</span>
						<input className="ui-input" name="name" type="text" value={this.state.name} onChange={this.onNameChange} />
					</label>
					<label className="query-item fl">
						<span className="label-name">空闲日期</span>
						<DatePicker style={{width:280}} value={this.state.date} onChange={this.onDateChange} />
					</label>
					<div className="ui-btn-group fr">
						<Button type="primary" onClick={this.resetQueryParams}>重 置</Button>
						<Button type="primary" onClick={this.queryUserData}>查 询</Button>
						<Button type="primary" onClick={this.showModal}>新增空闲时间</Button>
					</div>
				</div>
				<div className="ui-panel-body">
					<Table
						columns={this.generateColumns()}
						pagination={this.generatePagination()}
						dataSource={this.state.dataSource}
						bordered />
					<Modal
						width="400"
						title="新增空闲时间"
						className="free-time-modal"
						visible={this.state.modalVisible}
						onOk={this.handleOk}
						onCancel={this.handleCancel}>
						<table className="form-table">
							<tbody>
								<tr>
									<td width="100" className="tar">空闲日期</td>
									<td>
										<DatePicker
											ref="free-date"
											style={{width:252}}
											value={this.state.freeDate}
											onChange={this.onFreeDateChange} />
									</td>
								</tr>
								<tr>
									<td className="tar">空闲时间(起始)</td>
									<td>
										<Select style={{width:252}} defaultValue="9" value={this.state.freeTimeStart} onChange={this.onFreeTimeStartChange}>
											<Option value="">请选择</Option>
											{this.limitArray(0,24).map(function (item,index) {
												var hour;
												item = String(item);
												hour = item < 10 ? ('0'+item) : item;
												return (
													<Option key={index} value={item}>{hour+":00 时"}</Option>
												)
											})}
										</Select>
									</td>
								</tr>
								<tr>
									<td className="tar">空闲时间(截止)</td>
									<td>
										<Select style={{width:252}} defaultValue="12" value={this.state.freeTimeEnd} onChange={this.onFreeTimeEndChange}>
											<Option value="">请选择</Option>
											{this.limitArray(0,24).map(function (item,index) {
												var hour;
												item = String(item);
												hour = item < 10 ? ('0'+item) : item;
												return (
													<Option key={index} value={item}>{hour+":00 时"}</Option>
												)
											})}
										</Select>
									</td>
								</tr>
								<tr>
									<td className="tar"></td>
									<td className="error-msg">{this.state.error}</td>
								</tr>
							</tbody>
						</table>
					</Modal>
				</div>
			</div>
		);
	}

});

var LecturerDetail = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	crumb: {
		current: '讲师详情',
		items: [{
			href: '#/user/list',
			title: '用户管理'
		},{
			href: '#/lecturer/list',
			title: '讲师管理'
		}]
	},
	render: function() {
		var id = this.props.routeParams.id;
		return (
			<div className="app-content animate">
				<AppContentHeader crumb={this.crumb} />
				<div className="app-content-body lecturer">
					<FreeTimeList id={id} />
					<BasicInfo id={id} />
					<UploadAvatar />
				</div>
			</div>
		);
	}

});

module.exports = LecturerDetail;