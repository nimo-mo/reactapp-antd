var React = require('react');
var MenuData = require('../../js/menuData');

var Aside = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },
	// pushState: function (e) {
	// 	this.context.router.push($(e.target).data('path'));
	// },
	componentDidMount: function() {
		// console.log(this);
	},
	render: function() {
		var self = this;
		// console.log(self.props.active)
		return (
			<div className="app-aside">
				<div className="app-aside-inner">
					<ul className="menu">
						{
							MenuData.map(function (item,index) {
								return (
									<li className={"item" + (self.props.active === item.model ? " active" : "")} key={index}>
										<a className="arrow arrow-left" href={item.href}>
											<i className={"icon fa fa-"+item.iconCls}></i>
											{item.title}
										</a>
									</li>
								)
							})
						}
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = Aside;