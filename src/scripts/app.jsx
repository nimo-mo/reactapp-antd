
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
var Course = require('./jsx/course/index');
var Dashboard = require('./jsx/dashboard/index');
var Message = require('./jsx/message/index');

var UserList = require('./jsx/user/userlist');
var LecturerList = require('./jsx/user/lecturerList');
var AssistantList = require('./jsx/user/assistantList');
var UserDetail = require('./jsx/user/userDetail');
var LecturerDetail = require('./jsx/user/lecturerDetail');
var AssistantDetail = require('./jsx/user/assistantDetail');

var AdminList = require('./jsx/admin/adminList');
var Privilege= require('./jsx/admin/privilege');

var ClassroomList = require('./jsx/classroom/classroomList');
var ClassroomDetail = require('./jsx/classroom/classroomDetail');

var NoMatch = require('./jsx/component/noMatch');
var Header = require('./jsx/component/header');
var Aside = require('./jsx/component/aside');

ReactDOM.render(<Header history={AppHistory} />, document.getElementById('app-header'));
ReactDOM.render(<Aside history={AppHistory} />, document.getElementById('app-aside'));
ReactDOM.render((
  <Router history={AppHistory}>
  	<Route path="/" components={Login}></Route>
  	<Route path="/login" components={Login}></Route>
    <Route path="/admin/list" components={AdminList}></Route>
    <Route path="/admin/privilege" components={Privilege}></Route>
    <Route path="/classroom/list" components={ClassroomList}></Route>
    <Route path="/classroom/detail/:id" components={ClassroomDetail}></Route>
    <Route path="/course" components={Course}></Route>
    <Route path="/dashboard" components={Dashboard}></Route>
    <Route path="/message" components={Message}></Route>
    <Route path="/user/list" components={UserList}></Route>
    <Route path="/lecturer/list" components={LecturerList}></Route>
    <Route path="/assistant/list" components={AssistantList}></Route>
    <Route path="/user/detail/:id" components={UserDetail}></Route>
    <Route path="/lecturer/detail/:id" components={LecturerDetail}></Route>
    <Route path="/assistant/detail/:id" components={AssistantDetail}></Route>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('app-body'));
