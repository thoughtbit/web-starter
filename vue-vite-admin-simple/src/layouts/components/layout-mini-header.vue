<template>
  <header id="header" class="header" role="banner">
    <nav class="topbar">
      <div class="container">
        <div class="topbar-left">
          <p class="welcome">欢迎来到, 榆数启航</p>
        </div>
        <div class="topbar-right">
          <el-dropdown class="quick-nav" @command="userCommand">
            <div class="el-dropdown-link">
              <span class="name">工作台</span>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item divided command="user-center">个人中心</el-dropdown-item>
                <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </nav>
    <!-- /.topbar -->
    <div class="masthead">
      <div class="container">
        <h1 class="app-logo-title">
          <app-link class="navbar-brand" name="logo" :to="'/index'">{{ APP_NAME }}</app-link>
        </h1>
      </div>
    </div>
    <!-- /.masthead -->
    <nav class="main-nav">
      <ul class="container">
        <li class="nav-item" v-for="(link, key) in menuList" :key="key">
          <app-link
            class="nav-link"
            :name="link.name"
            :to="link.value"
          >
            {{ link.title }}
          </app-link>
        </li>
      </ul>
    </nav><!-- ./main-nav -->
  </header>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue";
import { useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";
import { APP_NAME } from "@/constants";

export default defineComponent({
  name: "LayoutHeader",
  components: {},
  setup() {
    const router = useRouter();
    // @ts-ignore
    const { proxy } = getCurrentInstance();

    const menuList = ref([
      {
        title: "首页",
        path: "index",
        name: "Index",
      },
      {
        title: "政策中心",
        path: "policy-center",
        name: "PolicyCenter",
      },
      {
        title: "综合服务",
        path: "integrated-service",
        name: "IntegratedService",
        
        children: [
          {
            title:"供需对接",
            path: "",
            name: "",
          },
          {
            title:"数字化评测",
            path: "",
            name: "",
          },
          {
            title:"数字化诊断",
            path: "",
            name: "",
          },
          {
            title:"项目申报",
            path: "",
            name: "",
          },
          {
            title:"奖补申请",
            path: "",
            name: "",
          },
          {
            title:"专家库",
            path: "",
            name: "",
          },
          {
            title:"下载专区",
            path: "",
            name: "",
          },
          {
            title:"典型案例",
            path: "",
            name: "",
          },                 
          {
            title:"服务商/企业查询知识库",
            path: "",
            name: "",
          },
          {
            title:"知识库",
            path: "",
            name: "",
          },  
        ],

      },
      {
        title: "应用超市",
        path: "app-supermarket",
        name: "Supermarket",
      },
      {
        title: "模型超市",
        path: "model-supermarket",
        name: "ModelSupermarket",
      },
      {
        title: "人才培训",
        path: "talent-training",
        name: "TalentTraining",
      },
      {
        title: "上云服务",
        path: "cloud-service",
        name: "CloudService",
      },
    ]);

    const userCommand = async (command: string) => {
      switch (command) {
        case "user-center":
          router.push({
            name: "UserCenterIndex",
          });
          break;
        case "change-password":
          router.push({
            name: "ChangePassword",
          });
          break;
        case "logout":
          proxy.$modal
            .confirm("确定要退出登录吗?", "警告", {
              cancelButtonText: "取消",
              confirmButtonText: "确定",
              type: "warning",
            })
            .then(async () => {
              router.push({
                name: "Login",
              });
            });

          break;
      }
    };

    return {
      APP_NAME,
      userCommand,

      menuList,
    };
  },
});
</script>
<style lang="scss" scoped>
.header {

  .app-logo-title {
   
    .navbar-brand {
      font-size: 28px;
      color: #333;
      &:hover {
        color: #00ffff;
      }
    }
  }
}
</style>
