var React = require('react');
var Util = require('../../js/util');
var Api = require('../../js/api');
import { Popover } from 'antd';

var Header = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },
	// pushState: function (e) {
	// 	this.context.router.push($(e.target).data('path'));
	// },
	getInitialState: function () {
    return {
      visible: false
    };
  },
  hide: function () {
    this.setState({
      visible: false
    });
  },
  handleVisibleChange: function (visible) {
    this.setState({ visible:visible });
  },
  logout: function () {
  	Api.post('logout',{})
  	.done(function (data) {
  		// todo...
  	})
  	.fail(function (error) {
  		// todo...
  	});
  	Util.clearCurrentUser();
  	Util.pushToLogin('/login',this);
  },
	render: function() {
		var self = this;
		var content = (
			<div className="ui-pop-content">
				<div className="ui-pop-item"><a href="javascript:;">修改密码</a></div>
				<div className="ui-pop-item"><a href="javascript:;" onClick={this.logout}>登 出</a></div>
			</div>
		);
		return (
			<div className="app-header">
				<div className="app-header-inner clearfix">
					<h1 className="logo">拼客帮</h1>
					<div className="settings">
						<Popover overlay={content} placement="bottomRight" trigger="click"
			        visible={this.state.visible} onVisibleChange={this.handleVisibleChange}>
			        <a className="username arrow arrow-down" href="javascript:;">{Util.getCurrentUser().name}</a>
			      </Popover>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Header;