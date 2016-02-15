var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');

import { Button, Select, Table, Pagination, Modal } from 'antd';
var Option = Select.Option;

var MessageList = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	getInitialState: function() {
		return {
			total: 0,
			error: '',
			pageSize: 30,
			currentPage: 1,
			dataSource: [],
			title: '',
			keywords: ''
		}
	},
	componentDidMount: function () {
		this.getMessageList(0,30);
	},
  showConfirm: function (record) {
	  Modal.confirm({
	    title: '确认要删除该条记录吗',
	    content: '',
	    okText: '是的，我确定',
	    cancelText: '再考虑一下',
	    onOk: function () {
	      Api.delete('message/'+record.id,{})
	      .done(function (res) {
	      	this.getMessageList(0,this.state.pageSize);
	      	Modal.success({
				    title: '删除成功'
				  });
	      }.bind(this))
	      .fail(function (error) {
	      	console.log(error)
	      })
	    }.bind(this),
	    onCancel: function () {}
	  });
	},
	getMessageList: function (page,size) {
		Api.get('message_list',{
			page: page,
			size: size,
			name: this.state.title,
			role: this.state.keywords,
			sort: 'createTime',
			direction: 'DESC'
		})
		.done(function (res) {
			var total = res.data.total;
			var dataSource = res.data.list;
			for (var i = 0; i<dataSource.length; i++) {
				dataSource[i].key = i;
				dataSource[i].operation = ['删除','修改'];
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
	queryMessageList: function () {
		this.getMessageList(0,this.state.pageSize);
	},
	resetQueryParams: function () {
		this.setState({title:'',keywords:''})
	},
	onQueryTitleChange: function (e) {
		this.setState({title:e.target.value})
	},
	onQueryKeywordsChange: function (e) {
		this.setState({keywords:e.target.value})
	},
	pushToMessageDetail: function () {
		this.props.history.push('/message/create')
	},
	generateColumns: function () {
		return [{
		  title: 'ID',
		  dataIndex: 'id',
		  className: 'tac',
		  width: 48
		},{
			title: '关键字',
			dataIndex: 'keywords'
		},{
			title: '关键字匹配类型',
			dataIndex: 'keywordsMatchType'
		},{
			title: '回复方式',
			dataIndex: 'replyType'
		},{
		  title: '标题',
		  dataIndex: 'title'
		},{
		  title: '内容',
		  dataIndex: 'content'
		},{
			title: '描述',
			dataIndex: 'description'
		},{
			title: '原文地址',
			dataIndex: 'origin'
		},{
		  title: '创建时间',
		  dataIndex: 'createTime',
		  render: function (text,record) {
		  	return <span>{new Date(text).format('yyyy-MM-dd HH:mm:ss')}</span>
		  }
		},{
		  title: '最后修改',
		  dataIndex: 'updateTime',
		  render: function (text,record) {
		  	return <span>{new Date(text).format('yyyy-MM-dd HH:mm:ss')}</span>
		  }
		},{
		  title: '操作',
		  dataIndex: 'operation',
		  className: 'tac',
		  render: function (text,record) {
		    return (
		    	<span className="operation">
			    	<a href="javascript:;" onClick={this.showConfirm.bind(null,record)}>{record.operation[0]}</a>
			    	<a href={"#/message/"+record.id}>{record.operation[1]}</a>
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
		  pageSizeOptions: ['20','30','50'],
		  onShowSizeChange: function (current, pageSize) {
		    this.getMessageList(current,pageSize);
		    this.setState({pageSize:pageSize,currentPage:current});
		  }.bind(this),
		  onChange: function (current) {
		    this.getMessageList(current,this.state.pageSize);
		    this.setState({currentPage:current});
		  }.bind(this)
		}
	},
	generateCrumb: function () {
		return {
			current: '自动回复',
			items: [{
				href: '#/message/list/pushed',
				title: '微信回复管理'
			}]
		}
	},
	render: function() {
		return (
			<div className="app-content animate">
				<AppContentHeader crumb={this.generateCrumb()} />
				<div className="app-content-body">
					<div className="ui-panel">
						<div className="ui-panel-header query-bar clearfix">
							<label className="query-item fl">
								<span className="label-name">标题</span>
								<input className="ui-input" name="name" type="text" value={this.state.title} onChange={this.onQueryTitleChange} />
							</label>
							<label className="query-item fl">
								<span className="label-name">关键字</span>
								<input className="ui-input" name="address" type="text" value={this.state.keywords} onChange={this.onQueryKeywordsChange} />
							</label>
							<div className="ui-btn-group fr">
								<Button type="primary" onClick={this.resetQueryParams}>重 置</Button>
								<Button type="primary" onClick={this.queryMessageList}>查 询</Button>
								<Button type="primary" onClick={this.pushToMessageDetail}>新 增</Button>
							</div>
						</div>
						<div className="ui-panel-body">
							<Table
								columns={this.generateColumns()}
								dataSource={this.state.dataSource}
								pagination={this.generatePagination()}
								bordered />
						</div>
					</div>
				</div>
			</div>
		);
	}

});
module.exports = MessageList;