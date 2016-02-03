var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var RouterHistory = require('history'); // 3d part
var AppHistory = ReactRouter.useRouterHistory(RouterHistory.createHashHistory)({queryKey: false});

var Api = require('../js/api');
var Util = require('../js/util');
var Header = require('./component/header');
var Aside = require('./component/aside');

var Login = React.createClass({
	// contextTypes: {
 //    router: React.PropTypes.object.isRequired
 //  },
  childContextTypes: {
    history: React.PropTypes.object
  },
  getInitialState: function() {
  	return {
  		username: '',
  		password: '',
  		errorMsg: '',
  		errorCls: '',
      requestUrl: ''
  	}
  },
  componentDidMount: function() {
    if (!!Util.getCurrentUser().token) {
      this.props.history.push('/dashboard');
    }
    // this.setState({requestUrl:Util.getRequestUrl()});
    $('.api-select').val(Util.getRequestUrl());
    $('.api-input').val(Util.getRequestUrl());
  },
  setValue: function (e) {
  	var input = e.target;
  	if (input.name=='username') {
  		this.setState({username:input.value});
  	}
  	if (input.name=='password') {
  		this.setState({password:input.value});
  	}
  },
  login: function () {
    var self = this ;
  	var username = this.state.username;
  	var password = this.state.password;
  	if (username == '') {
  		this.setState({
  			errorMsg: '请输入用户名',
  			errorCls: 'visible'
  		});
  		return;
  	}

  	if (password == '') {
  		this.setState({
  			errorMsg: '请输入密码',
  			errorCls: 'visible'
  		});
  		return;
  	}

  	this.setState({
			errorMsg: '',
			errorCls: ''
		});

    // console.log(self.context.router);

  	Api.post('login',{
			username: username,
			password: password
		}).done(function (data, textStatus, jqXHR) {
		  $.cookie('X-User-Id', data.userid);
      $.cookie('X-User-Name',data.username);
      $.cookie('X-User-Token', data.usertoken);
      $.cookie('X-User-Mobile',data.usermobile)
      self.props.history.push('/dashboard');
      ReactDOM.render(<Header history={AppHistory} />, document.getElementById('app-header'));
      ReactDOM.render(<Aside history={AppHistory} />, document.getElementById('app-aside'));
  	}).fail(function (jqXHR, textStatus, errorThrown) {
  		self.setState({
        errorMsg: jqXHR.errorMsg,
        errorCls: 'visible'
      })
  	});
  },
  onChange: function (e) {
    this.setState({requestUrl:e.target.value});
    console.log(this.state.requestUrl);
  },
  setRequestUrl: function () {
    Util.setRequestUrl(this.state.requestUrl);
    window.location.reload();
  },
	render: function() {
		// console.log(this.context.router);
    // api-kit
    var ApiKit = location.hostname != 'boss.pinkestudy.com' ? (
      <div className="api-kit tac">
        <select className="ui-select api-select" onChange={this.onChange}>
          <option value="http://112.74.76.109:8080/PkbBiz/">develop</option>
          <option value="http://localhost:2048/">location</option>
        </select>
        <input className="ui-input api-input" placeholder="请选择一个api请求地址或自定义输入" value={this.state.requestUrl}  onChange={this.onChange} />
        <div className="tac"><button className="ui-btn block" type="button" onTouchTap={this.setRequestUrl}>设 置</button></div>
      </div>
    ) : null;

		return (
			<div className="app-content login animate">
        <div className="login-shim">
          <div className="login-box">
  					<form className="login-form">
  						<label className="form-item">
                <span className="label-name">用户名</span>
                <input className="ui-input" id="username" name="username" type="text" onChange={this.setValue} />
              </label>
  						<label className="form-item">
                <span className="label-name">密 码</span>
                <input className="ui-input" id="password" name="password" type="password" onChange={this.setValue} />
              </label>
  						<div className="tar">
                <span className={"error-msg login-error-msg " + this.state.errorCls}>{this.state.errorMsg}</span>
                <button className="ui-btn login-btn" type="button" onTouchTap={this.login}>登 录</button>
              </div>
  					</form>
            {ApiKit}
          </div>
        </div>
			</div>
		)
	}
});

module.exports = Login;