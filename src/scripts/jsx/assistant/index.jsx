var React = require('react');
var Header = require('../component/header');
var Aside = require('../component/aside');

var Assistant = React.createClass({
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
				<Aside active="assistants" />
				<div className="app-body">
					<div className="app-content assistants animate">
						assistants
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Assistant;