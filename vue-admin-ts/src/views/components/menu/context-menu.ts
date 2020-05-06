import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ContextMenu extends Vue {
  @Prop({
    type: Array,
    required: true,
    default() {
      return [];
    }
  })
  private itemList!: any;

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  private visible: boolean | undefined;

  private left = 0;
  private top = 0;
  private target = null;
  private active = null;

  private get style() {
    return {
      left: this.left + "px",
      top: this.top + "px"
    };
  }

  private created() {
    // window.addEventListener('mousedown', e => this.closeMenu(e))
    // window.addEventListener('contextmenu', e => this.setPosition(e))
  }

  closeMenu(e: any) {
    if (["menuitemicon", "menuitem"].indexOf(e.target.getAttribute("role")) < 0) {
      this.$emit("update:visible", false);
    }
  }
  setPosition(e: any) {
    e.preventDefault();
    this.left = e.clientX;
    this.top = e.clientY;
    this.target = e.target.id.substr(4);
  }
  onSelect(key: any) {
    this.$emit("select", key, this.target);
    this.$emit("update:visible", false);
  }
  onMouseLeave() {
    this.$emit("update:visible", false);
  }

  private mounted() {
    document.onclick = () => {
      this.$emit("update:visible", false);
    };
  }
}
