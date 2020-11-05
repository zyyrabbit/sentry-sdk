import { BrowserOptions } from '@sentry/browser'

type Options = BrowserOptions & {
  Vue: any
}

declare class Report {
  static install(Vue, options: Options): void
  static init(options: Options): void
  static registerError(): void
  static log(exception: Error, data: any): void
}

export default Report