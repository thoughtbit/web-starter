import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class SiderSubMenu extends Vue {
  @Getter private setting: any;

  @Prop({ type: Boolean, default: true })
  private collapsed: boolean | undefined;

  @Prop({
    type: Array,
    required: true,
    default() {
      return [];
    }
  })
  private menuData!: any;

  @Prop({ type: String, default: "", required: true })
  private menuPath!: string;

  @Prop({ type: String, default: "", required: true })
  private menuTitle!: string;

  private filterMenus: Array<{}> = [];

  // 设置过滤列表
  private setFilterMenus() {
    this.filterMenus = this.memberRegisterExamine === "1" ? [] : ["vipCheckPending"];
  }

  private onSelect(index: string) {
    // @ts-ignore
    this.$routerLink(index);
  }

  private get memberRegisterExamine() {
    const { memberRegisterExamine } = this.setting.attrs || {};
    return memberRegisterExamine;
  }

  private get activeMenu() {
    // @ts-ignore
    const { meta, path } = this.$route;
    if (meta.activeMenu) {
      return meta.activeMenu;
    }
    return path;
  }

  @Watch("memberRegisterExamine")
  private onMemberRegisterExamine() {
    this.setFilterMenus();
  }

  private mounted() {
    this.setFilterMenus();
  }
}
