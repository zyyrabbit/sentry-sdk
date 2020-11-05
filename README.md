# sentry-sdk
An sdk sentry

## 安装与使用
1. npm 安装依赖

```tsx
   npm install --save sentry-sdk
```

2. 入口文件使用

```tsx
    import Vue from 'vue';
    import Report from 'sentry-sdk';
    Vue.use(Report, {
      release: String, // 用于source-map，匹配对应文件
      dsn: String // 标识sentry 项目，需要在sentry 管理台新建项目后获取
      ... // 其他可以传入的配置项
    })
```

3. 手动上传错误日志

```tsx
   import Report from 'sentry-sdk';
   Report.log(new Error(), data); // 注意第一个错误必须继承Error
```

## 上传sourceMap

### webpack配置自动上传

1. 安装相关webpack 插件与使用

```tsx
   npm install --save-dev @sentry/webpack-plugin

   const SentryCliPlugin = require("@sentry/webpack-plugin")
   Plugins: [
      new SentryCliPlugin({
        release: string, // 注意需要和Sentry 初始化时传入release对应
        inclue: string, // 作用文件夹，一般为项目打包文件夹 './dist'
        configFile: 'sentry.properties',
        ignore: ['node_modules', 'vue.config.js'],
        urlPrefix: '~/' // 对应webpack public配置
      })
   ] 
```
