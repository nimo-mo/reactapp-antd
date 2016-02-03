
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var RouterHistory = require('history'); // 3d part
var Redirect = ReactRouter.Redirect;
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
// var HashHistory = ReactRouter.hashHistory;
// var BrowserHistory = ReactRouter.browserHistory;
var AppHistory = ReactRouter.useRouterHistory(RouterHistory.createHashHistory)({queryKey: false});
// @ https://github.com/rackt/react-router/blob/master/upgrade-guides/v2.0.0.md#using-history-with-router
// import { Router, useRouterHistory } from 'react-router'
// import { createHashHistory } from 'history'
// // useRouterHistory creates a composable higher-order function
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
// <Router history={appHistory}/>
var injectTapEventPlugin = require('react-tap-event-plugin')();
window.$ = require('jquery');
require('jquery.cookie');
require('./js/dateFormat');
$.cookie.json = true;

// console.log(new Date().format('yyyy年MM月dd日 HH:mm:ss'));
var Util = require('./js/util');
var Login = require('./jsx/login');
var Index = require('./jsx/index');
var Assistant = require('./jsx/assistant/index');
var Classroom = require('./jsx/classroom/index');
var Course = require('./jsx/course/index');
var Dashboard = require('./jsx/dashboard/index');
var Lecturer = require('./jsx/lecturer/index');
var Material = require('./jsx/material/index');
var Message = require('./jsx/message/index');
var Schedule = require('./jsx/schedule/index');
var UserList = require('./jsx/user/list');
var UserDetail = require('./jsx/user/detail');
var NoMatch = require('./jsx/component/noMatch');
var Header = require('./jsx/component/header');
var Aside = require('./jsx/component/aside');

ReactDOM.render(<Header history={AppHistory} />, document.getElementById('app-header'));
ReactDOM.render(<Aside history={AppHistory} />, document.getElementById('app-aside'));
ReactDOM.render((
  <Router history={AppHistory}>
  	<Route path="/" components={Login}></Route>
  	<Route path="/login" components={Login}></Route>
    <Route path="/index" components={Index}></Route>
    <Route path="/assistant" components={Assistant}></Route>
    <Route path="/classroom" components={Classroom}></Route>
    <Route path="/course" components={Course}></Route>
    <Route path="/dashboard" components={Dashboard}></Route>
    <Route path="/lecturer" components={Lecturer}></Route>
    <Route path="/material" components={Material}></Route>
    <Route path="/message" components={Message}></Route>
    <Route path="/schedule" components={Schedule}></Route>
    <Route path="/user/list/:type" components={UserList}></Route>
    <Route path="/user/detail/:id" components={UserDetail}></Route>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('app-body'));
