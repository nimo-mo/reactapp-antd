var React = require('react');
var MenuData = require('../../js/menuData');

var Aside = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },
	// pushState: function (e) {
	// 	this.context.router.push($(e.target).data('path'));
	// },
	render: function() {
		var self = this;
		return (
			<div className="app-aside">
				<ul className="menu">
					{
						MenuData.map(function (item,index) {
							return (
								<li className="item" key={index}>
									<a href={item.path}>{item.title}</a>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
});

module.exports = Aside;