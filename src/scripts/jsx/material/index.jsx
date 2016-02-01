var React = require('react');
var Header = require('../component/header');
var Aside = require('../component/aside');

var Material = React.createClass({
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
				<Aside active="materials" />
				<div className="app-body">
					<div className="app-content materials animate">
						materials
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Material;