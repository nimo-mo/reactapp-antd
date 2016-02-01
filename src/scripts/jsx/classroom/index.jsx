var React = require('react');
var Header = require('../component/header');
var Aside = require('../component/aside');

var Classroom = React.createClass({
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
				<Aside active="classrooms" />
				<div className="app-body">
					<div className="app-content classrooms animate">
						classrooms
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Classroom;