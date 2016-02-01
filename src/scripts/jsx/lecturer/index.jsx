var React = require('react');
var Header = require('../component/header');
var Aside = require('../component/aside');

var Lecturer = React.createClass({
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
				<Aside active="lecturers" />
				<div className="app-body">
					<div className="app-content lecturers animate">
						lecturers
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Lecturer;