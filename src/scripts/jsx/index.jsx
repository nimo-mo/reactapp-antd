var React = require('react');
var Aside = require('./components/aside');

var Index = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },
	render: function() {
		// console.log(this.context.router);
		return (
			<div className="app-container">
				<Aside />
				<div className="app-body">
					<div className="app-content index animate">Index</div>
				</div>
			</div>
		);
	}

});

module.exports = Index;