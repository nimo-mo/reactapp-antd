var React = require('react');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');

var LecturerDetail = React.createClass({
	childContextTypes: {
    history: React.PropTypes.object
  },
	getInitialState: function() {
		return {
			
		}
	},
	componentDidMount: function() {

	},
	crumb: {
		current: '讲师详情',
		items:[{
			href: '#/user/list/normal',
			title: '用户管理'
		}]
	},
	render: function() {
		return (
			<div className="app-content userdetail animate">
				<AppContentHeader crumb={this.crumb} />
				<div className="app-content-body">
					UserDetail
				</div>
			</div>
		);
	}

});

module.exports = LecturerDetail;