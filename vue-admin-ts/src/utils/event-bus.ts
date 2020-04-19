import Vue, { VueConstructor } from "vue";

type VueComponentVM = Vue & { _uid: string };

interface Handles {
  [key: string]: any[];
}

export class EventBus {
  private readonly Vue: any;
  private readonly eventMapUid: any;
  private handles!: Handles;

  constructor(vue: VueConstructor) {
    if (!this.handles) {
      Object.defineProperty(this, "handles", {
        value: {},
        enumerable: false
      });
    }
    this.Vue = vue;
    // _uid and event name map
    this.eventMapUid = {};
  }

  /**
   * Map events and component relationships while listening for events.
   * @param eventName
   * @param vm vue component object or undefined, if is undefined, event not auto destroy.
   * @param callback event callback
   */
  public $on(eventName: string, vm: Vue | undefined, callback: (cb: any) => void) {
    if (!this.handles[eventName]) {
      this.handles[eventName] = [];
    }
    this.handles[eventName].push(callback);
    if (vm instanceof this.Vue) {
      const vueComponentVM = vm as VueComponentVM;
      this.setEventMapUid(vueComponentVM._uid, eventName);
    }
  }

  /**
   * eventBus.$emit.
   * @param eventName
   * @param params
   */
  public $emit(eventName: string, ...params: any) {
    if (this.handles[eventName]) {
      const len = this.handles[eventName].length;
      for (let i = 0; i < len; i++) {
        this.handles[eventName][i](...params);
      }
    }
  }

  /**
   * eventBus.$off.
   * @param eventName
   */
  public $off(eventName: string) {
    delete this.handles[eventName];
  }

  /**
   * eventBus.$offVmEvent.
   * @param uid uid of VueComponentVM
   */
  public $offVmEvent(uid: string) {
    const currentEvents = this.eventMapUid[uid] || [];
    currentEvents.forEach((event: any) => {
      this.$off(event);
    });
  }

  private setEventMapUid(uid: string, eventName: string) {
    if (!this.eventMapUid[uid]) {
      this.eventMapUid[uid] = [];
    }
    // Push the name of each _uid subscription to the array to which the respective uid belongs.
    this.eventMapUid[uid].push(eventName);
  }
}

const $EventBus = {
  install: (vue: VueConstructor) => {
    vue.prototype.$eventBus = new EventBus(vue);
    vue.mixin({
      deactivated() {
        // @ts-ignore
        (this as VueComponentVM).$eventBus.$offVmEvent((this as VueComponentVM)._uid);
      },
      beforeDestroy() {
        // @ts-ignore
        (this as VueComponentVM).$eventBus.$offVmEvent((this as VueComponentVM)._uid);
      }
    });
  }
};

export default $EventBus;

/*
// 使用方式:
this.$eventBus.$on('SET_LOADING_TRUE', this, (cb: any) => {
   if (cb) {
      cb();
   }
});
this.$eventBus.$on('SET_LOADING_FALSE', this, () => {
  this.loading = false;
});
this.$eventBus.$emit('SET_LOADING_TRUE', () => {
   this.GET_TRACELIST().then(() => {
      this.$eventBus.$emit('SET_LOADING_FALSE');
   });
});
this.$eventBus.$on('HANDLE-SELECT-SPAN', this, this.handleSelectSpan);
this.$eventBus.$emit('HANDLE-SELECT-SPAN', this.data);
*/
