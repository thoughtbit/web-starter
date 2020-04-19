import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
import { isValidUsername } from "@/utils/validation";
import { State } from "vuex-class";

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

@Component({})
export default class Login extends Vue {
  private registerForm = <User>{
    username: ""
  };
  private registerRules = <User>{
    username: [{ required: true, trigger: "blur", validator: validateUsername }]
  };

  private loading: boolean = false;
  private redirect: any = null;
  private otherQuery: any = {};

  @State("auth")
  private authState: any;

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
    if (this.registerForm.username === "") {
      // @ts-ignore
      this.$refs.username.focus();
    }
  }

  // private destroyed() {
  //   console.log("===> destroyed");
  // }

  private handleRegister(): void {
    // @ts-ignore
    this.$refs.registerForm.validate((valid) => {
      if (valid) {
        this.loading = true;
        this.$store
          .dispatch("user/register", this.registerForm)
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
