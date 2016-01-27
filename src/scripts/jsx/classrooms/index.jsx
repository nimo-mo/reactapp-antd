var React = require('react');
var Aside = require('../components/aside');

var Classrooms = React.createClass({
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
					<div className="app-content classrooms animate">
						classrooms
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Classrooms;