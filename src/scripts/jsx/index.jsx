var React = require('react');
var Header = require('./components/header');

var Index = React.createClass({
	render: function() {
		// console.log(this.props)
		return (
			<div className="index">
				<Header />
				index page
			</div>
		);
	}

});

module.exports = Index;