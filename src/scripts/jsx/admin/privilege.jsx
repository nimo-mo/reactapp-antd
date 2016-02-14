var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');

import { Button, Modal } from 'antd';

var Privilege = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	getInitialState: function () {
		return {
			menuData: ''
		}
	},
	componentDidMount: function() {
		this.getMenuData();
	},
	getMenuData: function () {
		Api.get('menudata',{})
		.done(function (res) {
			this.setState({menuData:JSON.stringify(res.data)});
		}.bind(this))
		.fail(function (error) {
			console.log(error)
		})
	},
	updateMenuData: function () {
		Api.put('menudata',this.state)
		.done(function (res) {
			Modal.success({
		    title: '更新成功',
		    content: '点击确定将重新加载',
		    okText: '确 定',
		    onOk: function () {
		      window.location.reload();
		    }
		  });
		})
		.fail(function (error) {
			console.log(error)
		})
	},
	handleChange: function (e) {
		this.setState({menuData:e.target.value});
	},
	crumb: {
		current: '菜单管理',
		items: [{
			href: '#/admin/privilege',
			title: 'Admin Plus'
		}]
	},
	render: function() {
		return (
			<div className="app-content animate">
				<AppContentHeader crumb={this.crumb} />
				<div className="app-content-body">
					<div className="ui-panel">
						<div className="ui-panel-header">
							<h1>编辑菜单</h1>
						</div>
						<div className="ui-panel-body">
							<textarea
								rows="45"
								className="ui-input"
								value={this.state.menuData}
								style={{width:'100%',display:'block',marginBottom:12}}
								onChange={this.handleChange}>
							</textarea>
							<div className="tar">
								<Button type="primary" onClick={this.updateMenuData}>保存菜单</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

});
module.exports = Privilege;