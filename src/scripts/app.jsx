
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var RouterHistory = require('history'); // 3d part
var Redirect = ReactRouter.Redirect;
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var HashHistory = ReactRouter.hashHistory;
// var BrowserHistory = ReactRouter.browserHistory;
// var AppHistory = ReactRouter.useRouterHistory(RouterHistory.createHashHistory)({queryKey: false});
// @ https://github.com/rackt/react-router/blob/master/upgrade-guides/v2.0.0.md#using-history-with-router
// import { Router, useRouterHistory } from 'react-router'
// import { createHashHistory } from 'history'
// // useRouterHistory creates a composable higher-order function
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
// <Router history={appHistory}/>
var injectTapEventPlugin = require('react-tap-event-plugin')();
window.$ = require('jquery');
require('jquery.cookie');
$.cookie.json = true;

var Api = require('./js/api');
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
var Start = !!$.cookie('X-User-Token') ? Index : Login;

ReactDOM.render((
  <Router history={HashHistory}>
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
), document.getElementById('app'));
