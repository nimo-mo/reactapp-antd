var React = require('react');
var Header = require('./components/header');
var Menu = require('./components/menu');

var Index = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },
	render: function() {
		// console.log(this.context.router);
		return (
			<div className="index">
				<Header />
				<Menu scope={this} />
				index page
			</div>
		);
	}

});

module.exports = Index;