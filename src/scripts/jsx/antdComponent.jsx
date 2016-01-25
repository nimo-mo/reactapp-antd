var React = require('react');
var Antd = require('antd');
var DatePicker = Antd.DatePicker;

var AntdComponent = React.createClass({

	render: function() {
		return (
			<div>
				<DatePicker defaultValue="2015-01-02" />
			</div>
		);
	}

});

module.exports = AntdComponent;