var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var RouterHistory = require('history'); // 3rd part lib
var AppHistory = ReactRouter.useRouterHistory(RouterHistory.createHashHistory)({queryKey: false});
var MenuData = require('../../js/menuData');

var Aside = React.createClass({
	getInitialState: function() {
		return {
			theme: 'dark'
		}
	},
	childContextTypes: {
		history: React.PropTypes.object
  },
	componentDidMount: function() {
		$(document).on('click','.global-menu > .item', function (e) {
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			$(this).find('.sub-item').removeClass('active');
			$(this).find('.sub-item').eq(0).addClass('active');
		});
		$(document).on('click','.sub-item', function (e) {
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			e.stopPropagation();
		});
	},
	handleClick: function (e) {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  },
  itemClick: function () {
  	
  },
	render: function() {
		var self = this;
		return (
			<div className="app-aside-inner">
				<ul className="global-menu">
					{
						MenuData.map(function (item,index) {
							return (
								<li className="item" key={index}>
									<a className="arrow arrow-left" href={item.href}>
										<i className={"icon fa fa-"+item.iconCls}></i>
										{item.title}
									</a>
									{
										item.children ?
										<ul className="sub-menu">
										{
											item.children.map(function (item,index) {
												return (
													<li className="sub-item" key={index}>
														<a href={item.href}>{item.title}</a>
													</li>
												)
											})
										}
										</ul> : null
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

// <Menu theme={this.state.theme}
//   onClick={this.handleClick}
//   defaultOpenKeys={['sub1']}
//   selectedKeys={[this.state.current]}
//   mode="inline">
//   {
// 	MenuData.map(function (item,index) {
// 		return (
// 			<SubMenu
// 				key={index}
// 				href={item.children ? "javascript:;" : item.href}
// 				title={<span><Icon type={item.iconCls} /><span>{item.title}</span></span>}>
// 				{
// 					item.children ?
// 					item.children.map(function (item,index) {
// 						return (
// 							<Menu.Item key={index}>{item.title}</Menu.Item>
// 						)
// 					}) : null
// 				}
//       </SubMenu>
// 		)
// 	})
//   }
// </Menu>

module.exports = Aside;