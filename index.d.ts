import { BrowserOptions } from '@sentry/browser'

declare class Report {
    constructor(options: BrowserOptions)
    log(exception: Error, data: any): void
}

export default Report