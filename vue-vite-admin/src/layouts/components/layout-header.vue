<template>
  <div class="navbar">
    <div class="left-side">
      <h1 class="logo">
        <router-link class="logo-link" to="/">{{ APP_NAME }}</router-link>
      </h1>
    </div>
    <div class="right-side">
      <el-dropdown class="user-container" size="default" @command="userCommand">
        <div class="user-wrapper">
          <el-avatar :size="32">
            <el-icon>
              <svg-icon name="user" />
            </el-icon>
          </el-avatar>
          <span class="user">
            {{ userInfo?.username }}
          </span>
          <el-icon>
            <svg-icon name="caret-bottom" />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <el-dropdown-item command="setting">个人设置</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { APP_NAME } from "@/constants";
import { useStore } from "@/store";

export default defineComponent({
  name: "LayoutHeader",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  setup() {
    const router = useRouter();
    const { user } = useStore();
    const { userInfo } = storeToRefs(user);

    const userCommand = (command: string) => {
      switch (command) {
        case "setting":
          // router.push({
          //   name: "demo",
          // });
          break;
        case "logout":
          user.logout().then(() => {
            router.push({
              name: "login",
            });
          });
          break;
      }
    };

    return {
      APP_NAME,
      userInfo,
      userCommand,
    };
  },
});
</script>
<style lang="scss" scoped>
.navbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .left-side {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    .logo {
      font-size: 24px;
      &-link {
        display: block;
        height: 100%;
        color: #fff;
      }
    }
  }

  .right-side {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}

:deep(.user-container) {
  height: 100%;
  cursor: pointer;
  .user-wrapper {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 10px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
    .el-avatar {
      margin-right: 10px;
    }

    .user {
      font-size: 16px;
      color: #fff;
    }
  }
}
</style>
