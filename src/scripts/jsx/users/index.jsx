var React = require('react');
var Aside = require('../components/aside');

var Users = React.createClass({

	getInitialState: function () {
		return {
			users: [
				{userid:'1',username:'nimo',useremail:'nimo.mo@woladai.com'},
				{userid:'2',username:'oliver',useremail:'oliver.monet@woladai.com'}
			]
		}
	},

	componentDidMount: function () {
		// console.log(1)
	},

	render: function() {
		return (
			<div className="app-container">
				<Aside />
				<div className="app-body">
					<div className="app-content users animate">
						<table>
							<thead>
								<tr>
									<th>username</th>
									<th>useremail</th>
									<th>userdetail</th>
								</tr>
							</thead>
							<tbody>
								{
									this.state.users.map(function (user,index) {
										return (
											<tr key={index}>
												<td>{user.username}</td>
												<td>{user.useremail}</td>
												<td><a href={'#/user/'+user.userid}>userdetail</a></td>
											</tr>
										)
									})
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}

});

module.exports = Users;