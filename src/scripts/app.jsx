// not using an ES6 transpiler
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var RouterHistory = require('history'); // 3d part
var Redirect = ReactRouter.Redirect;
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;
var HashHistory = ReactRouter.hashHistory;
var BrowserHistory = ReactRouter.browserHistory;
var AppHistory = ReactRouter.useRouterHistory(RouterHistory.createHashHistory)({queryKey: false});
// @ https://github.com/rackt/react-router/blob/master/upgrade-guides/v2.0.0.md#using-history-with-router
// import { Router, useRouterHistory } from 'react-router'
// import { createHashHistory } from 'history'
// // useRouterHistory creates a composable higher-order function
// const appHistory = useRouterHistory(createHashHistory)({ queryKey: false })
// <Router history={appHistory}/>

var $ = require('./js/lib/jquery');
$.cookie = require('./js/lib/jquery.cookie');
$.cookie.json = true;

var Api = require('./js/api');
var Index = require('./jsx/index');
var About = require('./jsx/about');
var Users = require('./jsx/users');
var User = require('./jsx/user');
var AntdComponent = require('./jsx/antdComponent');
var NoMatch = require('./jsx/components/noMatch');

ReactDOM.render((
  <Router history={HashHistory}>
  	<Route path="/" components={Index}></Route>
    <Route path="/index" components={Index}></Route>
    <Route path="/about" components={About}></Route>
    <Route path="/users" components={Users}></Route>
    <Route path="/user/:userid" components={User}></Route>
    <Route path="/antdComponent" components={AntdComponent}></Route>
    <Route path="*" component={NoMatch}/>
  </Router>
), document.getElementById('app'));