var React = require('react');
var Aside = require('../components/aside');

var Dashboard = React.createClass({
	getInitialState: function() {
		return {}
	},
	componentDidMount: function() {
		
	},
	render: function() {
		return (
			<div className="app-container">
				<Aside />
				<div className="app-body">
					<div className="app-content dashboard animate">
						dashboard
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Dashboard;