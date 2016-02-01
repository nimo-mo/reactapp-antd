var React = require('react');
var Header = require('../component/header');
var Aside = require('../component/aside');

var Course = React.createClass({
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
				<Aside active="courses" />
				<div className="app-body">
					<div className="app-content courses animate">
						courses
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Course;