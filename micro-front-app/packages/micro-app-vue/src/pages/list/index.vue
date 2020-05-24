<template>
  <section>
    <a-card title="Vue 子应用列表页">
      列表页
    </a-card>
  </section>
</template>

<script>
import fetch from "isomorphic-fetch";

export default {
  name: "List",

  data() {
    return {
      data: [],
      pageInfo: {
        onChange: page => this.fetchUsers(page, 10)
      },
    }
  },
  
  methods: {
    async fetchUsers () {
      return fetch("/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((res) => res.json());
    }
  },

  created() {
    this.fetchUsers(1, 10);
  }
}
</script>