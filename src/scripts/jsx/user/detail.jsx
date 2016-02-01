var React = require('react');
var Header = require('../component/header');
var Aside = require('../component/aside');
var AppContentHeader = require('../component/appContentHeader');
var Api = require('../../js/api');


var UserDetail = React.createClass({
	getInitialState: function() {
		return {
			crumb:{
				current: '用户详情',
				items:[]
			}
		}
	},
	componentDidMount: function() {

	},
	render: function() {
		return (
			<div className="app-container">
				<Header />
				<Aside active="user" />
				<div className="app-body">
					<div className="app-content userdetail animate">
						<AppContentHeader crumb={this.state.crumb} />
						<div className="app-content-body">
							UserDetail
						</div>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = UserDetail;