import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";

function VueRender({ appContent, loading }: any = {}) {
  return new Vue({
    el: "#main-app",
    router,
    store,
    data() {
      // @ts-ignore
      return { appContent: this.appContent, loading: this.loading };
    },
    render(h) {
      return h(App, {
        // @ts-ignore
        props: { appContent: this.appContent, loading: this.loading }
      });
    }
  });
}

let app: any = null;

export default function render({ appContent, loading }: any = {}) {
  if (!app) {
    app = VueRender({ appContent, loading });
  } else {
    app.appContent = appContent;
    app.loading = loading;
  }
}
