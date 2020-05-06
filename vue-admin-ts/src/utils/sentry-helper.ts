import { VueConstructor } from "vue";
import * as Sentry from "@sentry/browser";
import * as Integrations from "@sentry/integrations";

export default class SentryHelper {
  private readonly Vue: VueConstructor;
  private options: Sentry.BrowserOptions;
  private static instance: SentryHelper;

  constructor(Vue: VueConstructor, options: any) {
    this.Vue = Vue;
    this.options = options;
  }

  static getInstance(Vue: VueConstructor, options: any) {
    if (!this.instance) {
      this.instance = new SentryHelper(Vue, options);
      this.instance.setup();
      this.instance.registerGlobalError();
    }
    return this.instance;
  }

  setup() {
    try {
      const options: Sentry.BrowserOptions = {
        dsn: this.options.dsn,
        environment: this.options.environment,
        release: this.options.release,
        integrations: [
          /*
            Vue Error Handling
            Please note that if you enable this integration, Vue will not call its logError internally.
            This means that errors occurring in the Vue renderer will not show up in the developer console.
            If you want to preserve this functionality, make sure to pass the logErrors: true option.

          */
          new Integrations.Vue({
            // Vue, this is optional assuming window.Vue is present
            logErrors: true, // call original Vue logError as well
            attachProps: true // send Vue props to sentry
          }),
          /*
          CaptureConsole
          This integration captures all Console API calls and redirects them to Sentry using
          captureMessage call. It then retriggers to preserve default native behaviour.
          */
          new Integrations.CaptureConsole({
            levels: ["error"]
          })
        ]
      }

      /* Turns debug mode on or off. If debug is enabled SDK will attempt to print out useful debugging information
      if something goes wrong with sending the event. The default is always false and it’s generally not
      recommended to turn it on in production but doing so will not cause any safety concerns.
      */
      // options.debug = true

      // Sentry recommends manually setting the release name (string)
      // options.release = app-release-id

      Sentry.init(options);
    }
    catch (err) {
      console.warn(`Sentry failed to initialize: ${err.message}`, err)
    }
  }

  setUser(userInfo: Sentry.User) {
    Sentry.setUser(userInfo);
  }

  registerGlobalError() {
    window.addEventListener(
      "error",
      (event) => {
        const target = event.target || event.srcElement;
        const isElementTarget =
          target instanceof HTMLScriptElement ||
          target instanceof HTMLLinkElement ||
          target instanceof HTMLImageElement
        if (!isElementTarget) {
          return false;
        }
        // @ts-ignore
        const url = target.src || target.href;
        this.log({
          error: new Error(`ResourceLoadError: ${url}`),
          type: "resource load"
        })
      },
      true
    )
  }

  log(info: any) {
    Sentry.withScope((scope) => {
      Object.keys(info).forEach((key) => {
        if (key !== "error") {
          scope.setExtra(key, info[key])
        }
      })
      Sentry.captureException(info.error || new Error(""))
    })
  }
}
