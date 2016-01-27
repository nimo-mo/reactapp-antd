var React = require('react');

var Login = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },
	render: function() {
		// console.log(this.context.router);
		return (
			<div className="app-container">
				<div className="app-body full-size">
					<div className="app-content login animate">
						login
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Login;