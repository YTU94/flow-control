# yuanhang

> 远航流程管理系统

vue-cli启动 采用vue + vue-router + axios + vuex(后来没用了，不过安装也注册了)

## 目前

基本流程都能走通，10.11简单测试，修改部分Bug,暂时没有什么问题

审批流程的搜索功能，中期需求有过说不需要，所以这个功能好像有点问题

## 功能

主要是一个审批流程的系统，包括人员管理这块，发起流程，以及流程审批的整个进度。

## 目录介绍

1.直接从src介绍：
src<br>
-- api // 所有的ajax的请求 都在这里<br>
-- common // 存放组件公用的img && css <br>
---- stylus<br>
------ variable.styl // 所有公用的css 颜色 字体 之类<br>
------ approval.styl // 流程审批3种状态页面的 公用css<br>
-- components<br>
---- approval // 流程审批<br>
------ state // 3种审批的状态<br>
-------- approval.All // 全部<br>
-------- approvalAlready // 已发起<br>
-------- approvalOK // 已审批<br>
-------- approvalUn // 未审批<br>
------ approval // 流程审批页面<br>
------ lookApproval // 查看流程详情页面<br>
---- dialog // 弹出框组件<br>
---- home<br>
------ addFlow // 添加流程页<br>
------ addMember // 添加流程中 -> 添加人员角色页<br>
------ approvalDetail // 流程详情页面<br>
------ home // 主页<br>
---- login // 登录页<br>
---- m-footer // 底栏组件<br>
---- m-hader // 顶部组件<br>
---- material // 材料管理组件<br>
---- personnel<br>
------ materialAdd, materialManage, materialUpdate // 废弃页面,个人中心页面已隐藏<br>
------ memberAdd // 添加人员<br>
------ mamberMange // 人员管理<br>
------ memberUpdate // 人员编辑<br>
------ roleAdd // 角色添加<br>
------ roleManage // 角色管理<br>
------ roleUpdate // 角色编辑<br>
---- tab // 审批流程 tab组件 <br>
-- filter // 全局过滤器<br>
-- store // 状态管理（不过后来没用到）<br>
static<br>
---- css<br>
------ iconfont.css // icon图标 （图片较少，所以都放在组件中）<br>
------ index.css // 一些基础样式<br>

## 注意

api.js中
开发环境和生产环境的 请求基础URL做了区分，因为后台接口不是很规范（大概就那个意思），所以要做区分处理。

这里的axios设置除了这个其他基本不用动，然后webpack的设置也没什么要改动的。

然后代码中 我也做了些注释，可以借鉴。

## 数据缓存

没有用vuex的store, 都用了sessionStorage，存的数据也不多，具体你跑一下，在 开发中工具->Application->Storage中 可以看下。

## FTP

主机名： yuanhang.youledi.cn
用户名： db_yuanhang
密码: ***

## 数据库 MySQL (和FTP一样)

主机名： yuanhang.youledi.cn
用户名： db_yuanhang
密码: ***





## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
