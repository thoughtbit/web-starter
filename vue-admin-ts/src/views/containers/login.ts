import { Component, Vue, Watch } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { Route } from "vue-router";
import { isValidUsername } from "@/utils/validation";

interface User {
  username: string | any[];
  password: string | any[];
}

const validateUsername = (rule: any, value: string, callback: any): void => {
  if (!isValidUsername(value)) {
    callback(new Error("请输入正确的用户名"));
  } else {
    callback();
  }
};
const validatePassword = (rule: any, value: string, callback: any): void => {
  if (value.length < 6) {
    callback(new Error("密码不能少于6位"));
  } else {
    callback();
  }
};

@Component({})
export default class Login extends Vue {
  private loginForm = <User>{
    username: "",
    password: ""
  };
  private loginRules = <User>{
    username: [{ required: true, trigger: "blur", validator: validateUsername }],
    password: [{ required: true, trigger: "blur", validator: validatePassword }]
  };

  private passwordType: string = "password";
  private capsTooltip: boolean = false;
  private loading: boolean = false;
  private redirect: any = null;
  private otherQuery: any = {};

  private checkLoginStatus = false;

  @State("auth")
  private authState: any;

  get loginStatus(): boolean {
    return this.authState.isLogin;
  }

  @Watch("loginStatus")
  change() {
    this.checkLoginStatus = this.loginStatus;
  }

  @Watch("$route", { immediate: true })
  private onRouteChange(route: Route) {
    this.redirect = route.query && (route.query.redirect as string);
  }

  // private created() {
  //   console.log("===> created");
  // }

  private beforeMount () {
    setTimeout(() => {
      if (!! this.authState.isLogin) {
        this.$router.push({
          name: "/"
        })
      }
    }, 1000);
  }

  private mounted() {
    if (this.loginForm.username === "") {
      // @ts-ignore
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      // @ts-ignore
      this.$refs.password.focus();
    }
  }

  // private destroyed() {
  //   console.log("===> destroyed");
  // }

  private checkCapslock({ shiftKey = "", key = "" } = {}) {
    if (key && key.length === 1) {
      if ((shiftKey && key >= "a" && key <= "z") || (!shiftKey && key >= "A" && key <= "Z")) {
        this.capsTooltip = true;
      } else {
        this.capsTooltip = false;
      }
    }
    if (key === "CapsLock" && this.capsTooltip === true) {
      this.capsTooltip = false;
    }
  }

  private showPwd(): void {
    if (this.passwordType === "password") {
      this.passwordType = "";
    } else {
      this.passwordType = "password";
    }
  }

  private handleLogin(): void {
    // @ts-ignore
    this.$refs.loginForm.validate((valid) => {
      if (valid) {
        this.loading = true;
        this.$store
          .dispatch("auth/login", this.loginForm)
          .then(() => {
            this.$router.push({ path: this.redirect || "/", query: this.otherQuery });
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
          });
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }
}
