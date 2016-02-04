var React = require('react');

var AppContentHeader = React.createClass({

	render: function() {
		return (
			<div className="app-content-header clearfix">
				<h1>{this.props.crumb.current}</h1>
				<div className="crumbs">
					当前位置
					{
						this.props.crumb.items.map(function (item,index) {
							return (
								<span className="crumb-item" key={index}><i>/</i><a href={item.href}>{item.title}</a></span>
							)
						})
					}
					<span className="crumb-item current"><i>/</i><strong>{this.props.crumb.current}</strong></span>
				</div>
			</div>
		);
	}

});

module.exports = AppContentHeader;