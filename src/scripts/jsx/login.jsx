var React = require('react');
var Api = require('../js/api');

var Login = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },
  getInitialState: function() {
  	return {
  		username: '',
  		password: '',
  		errorMsg: '',
  		errorCls: ''
  	}
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

    console.log(self.context.router);

  	Api.post('login',{
			username: username,
			password: password
		}).done(function (data, textStatus, jqXHR) {
		  $.cookie('X-User-Id', data.username);
      $.cookie('X-User-Token', data.usertoken);
      self.context.router.push('/index');
  	}).fail(function (jqXHR, textStatus, errorThrown) {
  		self.setState({
        errorMsg: jqXHR.errorMsg,
        errorCls: 'visible'
      })
  	});
  },
	render: function() {
		// console.log(this.context.router);
		return (
			<div className="app-container without-aside">
				<div className="app-body">
					<div className="app-content login animate">
						<form className="loign-form">
							<input id="username" name="username" type="text" onChange={this.setValue} />
							<input id="password" name="password" type="password" onChange={this.setValue} />
							<button type="button" onTouchTap={this.login}>登录</button>
						</form>
						<div className={"error-msg login-error-msg " + this.state.errorCls}>{this.state.errorMsg}</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Login;