# sentry-sdk
An sdk sentry

## 安装与使用
1. npm 安装依赖

```tsx
   npm install --save sentry-sdk
```

2. 入口文件使用

项目根目录上添加.sentryclirc文件

```tsx
[defaults]
url=http://xxxxxx:xxxx/ 
org=sentry
project=project

[auth]
token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

url: sentry部署地址  
org: 管理设置项目所属组织  
project: 管理台设置项目名称  
token: {url}/settings/account/api/auth-tokens/ 下创建请求token  

```tsx
    import Vue from 'vue';
    import Report from 'sentry-sdk';
    Vue.use(Report, {
      // 用于source-map，匹配对应相应版本号 version可设置package.json version对应
      release: '{project}@{version}', 
      dsn: 'http://xxxxxxxxx@{sentryt}:{port}/2', // 上传项目 url, 需要在sentry 管理台新建项目后获取
      allowUrls: [/www.baidu.com/i], // 可选项，如果设置，只有匹配到当期规则才会上传日志
      ... // 其他可以传入的配置项
    })
```

dsn: {url}/settings/{org}/projects/{project}/keys/

3. 手动上传错误日志

```tsx
   import Report from 'sentry-sdk';
   Report.log(new Error(), data); // 注意第一个错误必须继承Error
```

## 上传sourceMap

### webpack配置自动上传


```tsx
   npm install --save-dev @sentry/webpack-plugin

   const SentryCliPlugin = require("@sentry/webpack-plugin")
   Plugins: [
      new SentryCliPlugin({
        release: '{project}@{version}', // 注意需要和Sentry 初始化时传入release对应
        include: './dist', // 作用文件夹，一般为项目打包文件夹 './dist'
        ignore: ['node_modules', 'vue.config.js'],
        urlPrefix: '~/' // 对应webpack publicPath配置
      })
   ] 
```
使用vue-cli 打包配置

注意配置文件设置** productionSourceMap: true **生成sourceMap, 然后上传后，注意删除sourceMap

```tsx
   npm install --save-dev @sentry/webpack-plugin

   const SentryCliPlugin = require("@sentry/webpack-plugin");

   config.plugin('sentry').use(SentryCliPlugin, [{
      release: '{project}@{version}',  // 注意需要和Sentry 初始化时传入release对应
      include: './dist', // 作用文件夹，一般为项目打包文件夹 './dist'
      ignore: ['node_modules', 'vue.config.js'],
      urlPrefix: '~/' // 对应webpack publicPath配置
   }]);
```

