var React = require('react');
var MenuData = require('../../js/menuData');

var Menu = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },
	// pushState: function (e) {
	// 	this.context.router.push($(e.target).data('path'));
	// },
	render: function() {
		console.log(this.context.router);
		console.log(React.PropTypes.object.isRequired);
		var self = this;
		return (
			<div className="menu">
				<ul>
					{
						MenuData.map(function (item,index) {
							return (
								<li className="item" key={index}>
									<a href={item.children ? "javascript:;" : item.href }>{item.title}</a>
									{
										item.children ?
										item.children.map(function (item,index) {
											return (
												<li className="child-item" key={index}>
													<a href={item.href}>{item.title}</a>
												</li>
											)
										}) : null
									}
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}

});

module.exports = Menu;