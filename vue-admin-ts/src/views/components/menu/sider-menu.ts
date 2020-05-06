import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SiderMenu extends Vue {
  @Prop({
    type: Array,
    required: true,
    default() {
      return [];
    }
  })
  private menuData!: any;

  @Prop({ type: String })
  private activeMenu: string | undefined;

  private onSelect(index: string) {
    let collapsed = false;
    const selectMenu = this.menuData.find((m: any) => {
      return m.path === index;
    });
    if (!(selectMenu && selectMenu.children && selectMenu.children.filter((m: any) => !m.hidden).length)) {
      collapsed = true;

      // @ts-ignore
      this.$routerLink(index);
    }
    this.$emit("menuSelect", index, collapsed);
  }

  private mounted() {
    // console.log("menuData:", this.menuData);
    // console.log("activeMenu:", this.activeMenu);
  }
}
