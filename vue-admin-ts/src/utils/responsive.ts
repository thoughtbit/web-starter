import { VueConstructor } from "vue";

export default {
  install (vue: VueConstructor, options: any) {
    const finalOptions = Object.assign({}, {
      computed: {}
    }, options)

    let responsive = new vue({
      data () {
        return {
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      computed: finalOptions.computed
    })

    Object.defineProperty(vue.prototype, '$responsive', {
      get: () => responsive
    })

    window.addEventListener('resize', () => {
      responsive.width = window.innerWidth
      responsive.height = window.innerHeight
    })
  }
}
