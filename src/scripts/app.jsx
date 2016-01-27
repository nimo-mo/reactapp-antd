
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
var $ = window.$ = require('jquery');
require('jquery.cookie');
$.cookie.json = true;

var Api = require('./js/api');
var Login = require('./jsx/login');
var Index = require('./jsx/index');
var Assistants = require('./jsx/assistants/index');
var Classrooms = require('./jsx/classrooms/index');
var Courses = require('./jsx/courses/index');
var Dashboard = require('./jsx/dashboard/index');
var Lecturers = require('./jsx/lecturers/index');
var Materials = require('./jsx/materials/index');
var Messages = require('./jsx/messages/index');
var Schedules = require('./jsx/schedules/index');
var Users = require('./jsx/users/index');
var User = require('./jsx/users/user');
var NoMatch = require('./jsx/components/noMatch');

ReactDOM.render((
  <Router history={HashHistory}>
  	<Route path="/" components={Index}></Route>
  	<Route path="/login" components={Login}></Route>
    <Route path="/index" components={Index}></Route>
    <Route path="/assistants" components={Assistants}></Route>
    <Route path="/classrooms" components={Classrooms}></Route>
    <Route path="/courses" components={Courses}></Route>
    <Route path="/dashboard" components={Dashboard}></Route>
    <Route path="/lecturers" components={Lecturers}></Route>
    <Route path="/materials" components={Materials}></Route>
    <Route path="/messages" components={Messages}></Route>
    <Route path="/schedules" components={Schedules}></Route>
    <Route path="/users" components={Users}></Route>
    <Route path="/users/user/:userid" components={User}></Route>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('app'));
