/* eslint-disable */
export default function VueBus(Vue) {
  const Bus = new Vue({
    methods: {
      emit(event, ...args) {
        this.$emit(event, ...args);
      },
      on(event, callback) {
        this.$on(event, callback);
      },
      once(event, callback) {
        this.$once(event, callback);
      },
      off(event, callback) {
        this.$off(event, callback);
      },
    },
  });
  Vue.prototype.$bus = Bus;
}

/**
 * this.$bus.emit('add', num);
 * this.$bus.on('add', this.handleAddRandom);
 * this.$bus.off('add', this.handleAddRandom);
 */
