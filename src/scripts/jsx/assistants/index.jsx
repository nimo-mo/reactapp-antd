var React = require('react');
var Aside = require('../components/aside');

var Assistants = React.createClass({
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
					<div className="app-content assistants animate">
						assistants
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Assistants;