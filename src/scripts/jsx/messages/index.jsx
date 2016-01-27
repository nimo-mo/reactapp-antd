var React = require('react');
var Aside = require('../components/aside');

var Messages = React.createClass({
	getInitialState: function () {
		return {}
	},
	componentDidMount: function () {
		// console.log(1)
	},
	render: function() {
		return (
			<div className="app-container">
				<Aside />
				<div className="app-body">
					<div className="app-content messages animate">
						messages
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Messages;