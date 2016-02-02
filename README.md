# reactapp + antd with gulp & webpack

##开发环境
###安装依赖(在开始之前请安装node.js)

下载nodejs [https://nodejs.org/en/](https://nodejs.org/en/) (for windows & OSX)

ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" (only for OSX 此方法全局安装npm模块无需使用sudo,推荐)

brew update

export PATH="/usr/local/bin:$PATH"

brew install node

`cd path/to/reactapp-antd`

`npm install`


##开启实时编译
`cd path/to/reactapp`

`gulp watch`


##启动服务
`npm start`  (open a new terminal window or tab)

[http://localhost:2048/](http://localhost:2048/)

##打包构建
`gulp build`

##相关资料
gulp [gulp](http://gulpjs.com/)

bower [bower](http://bower.io/)

react [react](http://facebook.github.io/react/)

nodejs [nodejs](https://nodejs.org/en/)

webpack [webpack](https://webpack.github.io/)
