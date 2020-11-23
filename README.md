# sentry-sdk

An sentry sdk 

## 安装与使用
1. npm 安装依赖

```tsx
   npm install --save sentry-sdk
```

2. .sentryclirc文件

项目根目录上添加.sentryclirc文件

```tsx
[defaults]
url=http://xxxxxx:xxxx/ 
org=sentry
project=project

[auth]
token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

[upload]
sourcemapPath=./xxxxxx/js/

```

url: sentry部署地址  
org: 管理设置项目所属组织  
project: 管理台设置项目名称  
token: {url}/settings/account/api/auth-tokens/ 下创建请求token 
sourcemapPath：项目打包js文件目录

3. src/main.ts(main.js)入口文件

```tsx
    import Vue from 'vue';
    import Report from 'sentry-sdk';
    Vue.use(Report, {
      // 用于source-map，匹配对应相应版本号 version 可设置package.json version对应
      release: '{version}', 
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

1. webpack配置

```tsx
   npm install --save-dev @sentry/webpack-plugin

   const SentryCliPlugin = require("@sentry/webpack-plugin")
   Plugins: [
      new SentryCliPlugin({
        release: '{version}', // 注意需要和Sentry 初始化时传入release对应
        include: './dist', // 作用文件夹，一般为项目打包文件夹 './dist'
        ignore: ['node_modules', 'vue.config.js'],
        urlPrefix: '~/' // 对应webpack publicPath配置
      })
   ] 
```
2. 使用vue-cli 打包配置

注意配置文件设置** productionSourceMap: true **生成sourceMap, 然后上传后，注意删除sourceMap

```tsx
   npm install --save-dev @sentry/webpack-plugin

   const SentryCliPlugin = require("@sentry/webpack-plugin");

   config.plugin('sentry').use(SentryCliPlugin, [{
      release: '{version}',  // package.js文件 version字段
      include: './dist', // 作用文件夹，一般为项目打包文件夹 './dist'
      ignore: ['node_modules', 'vue.config.js'],
      urlPrefix: '~/' // 对应webpack publicPath配置
   }]);
```

### 手动上传

1. 首先安装sentry/cli

```tsx
   npm install -g @sentry/cli
```

2. 项目根目录下添加上传脚本

sentry-report.sh

```sh
#!/bin/bash

#export语句是将控制台语言环境设置为UTF-8格式，以免出现Podfile文件打开错误
export LANG=en_US.UTF-8
export LANGUAGE=en_US.UTF-8
export LC_ALL=en_US.UTF-8

if [ ! -f ".sentryclirc" ]; then

  echo "The need .sentryclirc file don't exit"

  sleep 3

  exit -1

fi

set -a && . ./.sentryclirc && set +a # 设置环境变量

which sentry-cli # 测试是否安装sentry-cli客户端

if [ $? -ne 0 ]; then

echo "sentry-cli don't install, please install sentry-cli"

sleep 3

exit -1

fi

echo "begining to upload-sourcemaps"

if [ -z "${version}" -a -f "package.json" ]; then

  version=$(cat package.json | grep 'version' | sed -e 's/[,"]//g' | awk '{print $2}')

fi

sentry-cli --auth-token ${token} \
      --url ${url} \
    releases files ${version} \
    upload-sourcemaps ./dist

echo "upload-sourcemaps success"

echo "beginin to clean sourcemaps"

find ${sourcemapPath} -name "*.map" -type f -print -exec rm -rf {} \;

echo "clean sourcemaps success"

sleep 3

```
