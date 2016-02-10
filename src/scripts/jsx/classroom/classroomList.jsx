var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');

import { Button, Table, Pagination, Modal } from 'antd';

var ClassroomList = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	getInitialState: function() {
		return {
			total: 0,
			dataSource: [],
			modalVisible: false,
			name: '',
			address: ''
		}
	},
	componentDidMount: function() {
		this.getClassroomList(0,30);
	},
	showModal: function () {
    this.setState({
      visible: true
    });
  },
  handleOk: function () {
    console.log('点击了确定');
    this.setState({
      visible: false
    });
  },
  handleCancel: function (e) {
    console.log(e);
    this.setState({
      visible: false
    });
  },
	getClassroomList: function (page,size) {
		Api.get('classroom/list',{
			page: page,
			size: size,
			name: this.state.name,
			address: this.state.address,
			sort: '',
			direction: 'DESC'
		})
		.done(function (res) {
			var total = res.data.total;
			var dataSource = res.data.list;
			for (var i = 0; i<dataSource.length; i++) {
				dataSource[i].key = i;
				dataSource[i].operation = ['修改','详情'];
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
	operation: function () {
		console.log(1)
	},
	onNameChange: function (e) {
		this.setState({name:e.target.value})
	},
	onAddressChange: function (e) {
		this.setState({address:e.target.value})
	},
	addClassroom: function () {
		this.props.history.push('/classroom/detail/add');
	},
	qeuryClassroom: function () {
		this.getClassroomList(0,30);
	},
	generateColumns: function () {
		return [{
		  title: '教室名称',
		  dataIndex: 'name'
		},{
		  title: '联系人姓名(1)',
		  dataIndex: 'contactHuman1'
		},{
		  title: '联系人电话(1)',
		  dataIndex: 'contactNumber1'
		},{
		  title: '联系人职位(1)',
		  dataIndex: 'contactJobTitle1'
		},{
		  title: '教室地址',
		  dataIndex: 'address',
		  render: function (text,record) {
		    return (
		    	<span>{record.province+record.city+record.area+record.address}</span>
	    	)
		  }
		},{
		  title: '提供设备',
		  dataIndex: 'devices'
		},{
		  title: '最大座位数',
		  dataIndex: 'maxseats'
		},{
		  title: '供应商',
		  dataIndex: 'supplier'
		},{
		  title: '百度关键字',
		  dataIndex: 'baiduKeywords'
		},{
		  title: '操作',
		  dataIndex: 'operation',
		  className: 'tac',
		  render: function (text,record) {
		    return (
		    	<span className="operation">
			    	<a href={"#/classroom/detail/"+record.id}>{record.operation[1]}</a>
		    	</span>
	    	)
		  }.bind(this)
		}];
	},
	generatePagination: function () {
		return {
		  total: this.state.total,
		  current: 1,
		  pageSize: 30,
		  showSizeChanger: true,
		  showQuickJumper: true,
		  pageSizeOptions: ['20','30','50'],
		  onShowSizeChange: function (current, pageSize) {
		    console.log('Current: ', current, '; PageSize: ', pageSize);
		  },
		  onChange: function (current) {
		    console.log('Current: ', current);
		  }
		}
	},
	generateCrumb: function () {
		return {
			current: '教室管理',
			items: []
		}
	},
	render: function() {
		return (
			<div className="app-content userlist animate">
				<AppContentHeader crumb={this.generateCrumb()} />
				<div className="app-content-body">
					<div className="ui-panel">
						<div className="ui-panel-header query-bar clearfix">
							<label className="query-item fl">
								<span className="label-name">教室名称</span>
								<input className="ui-input" name="name" type="text" value={this.state.name} onChange={this.onNameChange} />
							</label>
							<label className="query-item fl">
								<span className="label-name">教室地址</span>
								<input className="ui-input" name="address" type="text" value={this.state.address} onChange={this.onAddressChange} />
							</label>
							<div className="ui-btn-group fr">
								<Button type="primary" onClick={this.qeuryClassroom}>查询</Button>
								<Button type="primary" onClick={this.addClassroom}>新增教室</Button>
							</div>
						</div>
						<div className="ui-panel-body">
							<Table
								columns={this.generateColumns()}
								pagination={this.generatePagination()}
								dataSource={this.state.dataSource}
								bordered />
							<Modal
								title="角色变更"
								visible={this.state.visible}
								onOk={this.handleOk}
								onCancel={this.handleCancel}>
			        </Modal>
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = ClassroomList;