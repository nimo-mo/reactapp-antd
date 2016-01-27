var React = require('react');
var Aside = require('../components/aside');

var User = React.createClass({

	getInitialState: function () {
		return {
			user: {
				username: 'nimo',
				useremail: 'nimo.mo@wolaidai.com'
			}
		}
	},
	componentDidMount: function () {
		// console.log(1)
	},
	render: function() {
		var user = this.state.user;
		console.log(this.props)
		return (
			<div className="app-container">
				<Aside />
				<div className="app-body">
					<div className="app-content users animate">
						<div>{user.username}</div>
						<div>{user.useremail}</div>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = User;