var React = require('react');
var Header = require('../component/header');
var Aside = require('../component/aside');

var Schedule = React.createClass({
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
				<Aside active="schedules" />
				<div className="app-body">
					<div className="app-content schedules animate">
						schedules
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Schedule;