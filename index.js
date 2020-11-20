const Sentry = require('@sentry/browser');
const Integrations = require('@sentry/integrations');

export default class Report {
  /**
   * 用于Vue 插件加载问题
   * @param {*} Vue 
   * @param {*} options 
   */
  install (Vue, options = {}) {
    options.Vue = Vue;
    Report.init(options);
  }
  /**
   * 初始化函数
   * @param {*} options 
   */
  init (options = {}) {
    console.log(Integrations.Vue);
    // sentry初始化参数
    if (options.Vue) {
      options.integrations = [
        new Integrations.Vue({ 
          Vue: options.Vue, 
          attachProps: true,  
          logErrors: true 
        }),
      ];
    }
    Sentry.init(options);
    Report.registerError();
  }
  /**
   * 处理资源加载失败异常
   */
  registerError () {
    window.addEventListener('error', (e) => {
      if (!e.target || !e.target.tagName) return;
      const typeName = e.target.tagName.toLowerCase();
      if (typeName === 'link' || typeName === 'script') {
        const scoureUrl = e.target.href || e.target.src;
        Report.log(e, {
          desc: `资源加载失败：${scoureUrl}`,
          scoureUrl
        });
      }  
    }, true);
  }
  /**
   *  手动上传错误日志
   * @param {*} exception @ Exception
   * @param {*} extra 
   */
  log (exception, extra = {}) {
    extra.date = new Date();
    Sentry.captureException(exception, {
      level: Sentry.Severity.Error,
      extra
    });
  }
}