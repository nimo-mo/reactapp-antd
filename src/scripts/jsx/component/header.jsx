var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var RouterHistory = require('history'); // 3d part
var AppHistory = ReactRouter.useRouterHistory(RouterHistory.createHashHistory)({queryKey: false});
var Util = require('../../js/util');
var Api = require('../../js/api');

var Header = React.createClass({
	// contextTypes: {
 //    router: React.PropTypes.object.isRequired
 //  },
	// pushState: function (e) {
	// 	this.context.router.push($(e.target).data('path'));
	// },
	childContextTypes: {
		history: React.PropTypes.object
  },
	getInitialState: function () {
    return {
      openedCls: '',
    };
  },
  componentDidMount: function() {
  	// console.log(this)
  },
  componentDidUpdate: function (prevProps, prevState) {
  	// console.log(1,prevProps,prevState);
  },
  componentWillReceiveProps: function (nextProps) {
  	// console.log(2,nextProps);
  },
  shouldComponentUpdate: function (nextProps, nextState) {
  	// console.log(3,nextProps,nextState);
  	return true;
  },
  toggleDropMenu: function () {
  	var openedCls = !this.state.openedCls ? ' opened': '';
  	this.setState({openedCls:openedCls});
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
  	ReactDOM.render(<div history={AppHistory} />, document.getElementById('app-header'));
    ReactDOM.render(<div history={AppHistory} />, document.getElementById('app-aside'));
    this.props.history.push('/login');
  },
	render: function() {
		var self = this;
		return (
			<div className="app-header">
				<div className="app-header-inner clearfix">
					<h1 className="logo">DEMO</h1>
					<div className={"settings"+this.state.openedCls} onClick={this.toggleDropMenu}>
		        <a className="username arrow arrow-down" href="javascript:;">{Util.getCurrentUser().name || 'nobody'}</a>
		        <ul className="drop-menu arrow arrow-up">
		        	<li className="item"><a href="javascript:;">修改密码</a></li>
							<li className="item"><a href="javascript:;" onClick={this.logout}>登 出</a></li>
		        </ul>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Header;