var React = require('react');
var Aside = require('../components/aside');

var Schedules = React.createClass({
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
					<div className="app-content schedules animate">
						schedules
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Schedules;