import Vue from 'vue'
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

class Report {
  options;

  constructor(options = {}) {
    this.options = options;
    this.init();
    this.registerError();
  }

  init () {
    // sentry初始化参数
    Sentry.init({
      ...this.options,
      integrations: [
        new Integrations.Vue( { Vue, attachProps: true,  logErrors: true }),
      ],
    });
    Vue.prototype.$report = this;
  }

  registerError () {
    window.addEventListener('error', (e) => {
      if (!e.target) return;
      const typeName = e.target.tagName.toLowerCase();
      if (typeName === 'link' || typeName === 'script') {
        const scoureUrl = e.target.href || e.target.src;
        this.log(e, {
          desc: `资源加载失败：${scoureUrl}`,
          scoureUrl
        });
      }  
    }, true);
  }

  log (exception, data) {
    Sentry.captureException(exception, {
      level: Sentry.Severity.Error,
      extra: {
        ...data,
        date: new Date()
      }
    })
  }

}

export default Report;