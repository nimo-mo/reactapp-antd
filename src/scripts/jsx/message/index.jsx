var React = require('react');
var Header = require('../component/header');
var Aside = require('../component/aside');

var Message = React.createClass({
	getInitialState: function () {
		return {}
	},
	componentDidMount: function () {
		// console.log(1)
	},
	render: function() {
		return (
			<div className="app-container">
				<Header />
				<Aside active="messages" />
				<div className="app-body">
					<div className="app-content messages animate">
						messages
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Message;