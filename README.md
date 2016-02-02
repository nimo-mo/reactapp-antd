# reactapp + antd with gulp & webpack

##开发环境
###在开始之前请安装node.js

下载nodejs [https://nodejs.org/en/](https://nodejs.org/en/) (for windows & OSX)

以下方法仅适用于OSX(全局安装npm模块时无需sudo,推荐)

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

brew update

export PATH="/usr/local/bin:$PATH"

brew install node


##进入项目根目录安装依赖
`cd path/to/reactapp-antd`

`npm install`


##开启实时编译
`gulp watch`


##启动服务
`cd path/to/reactapp-antd` (open a new terminal window or tab)

`npm start`

[http://localhost:2048/](http://localhost:2048/)

##打包构建
`gulp build`

##相关资料
gulp [gulp](http://gulpjs.com/)

bower [bower](http://bower.io/)

react [react](http://facebook.github.io/react/)

nodejs [nodejs](https://nodejs.org/en/)

webpack [webpack](https://webpack.github.io/)
