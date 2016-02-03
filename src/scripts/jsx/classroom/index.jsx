var React = require('react');

var Classroom = React.createClass({
	getInitialState: function () {
		return {}
	},
	componentDidMount: function () {
		// console.log(1)
	},
	render: function() {
		return (
			<div className="app-content classrooms animate">
				classrooms
			</div>
		);
	}

});

module.exports = Classroom;