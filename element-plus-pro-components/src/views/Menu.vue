<template>
  <aside class="aside">
    <div class="container">
      <ui-menu :data="data1" defaultActive="1" name="a" index="b" icon="c" children="d" />
    </div>
  </aside>
  <aside class="aside">
    <div class="container">
      <ui-infinite-menu :data="data2" defaultActive="2" name="a" index="b" icon="c" children="d" />
    </div>
  </aside>
</template>

<script setup lang="ts">
const data1 = [
  {
    a: "导航1",
    b: "1",
    c: "Document",
  },
  {
    a: "导航2",
    b: "2",
    c: "Document",
  },
  {
    a: "导航3",
    b: "3",
    c: "Document",
    d: [
      {
        a: "导航3-1",
        b: "3-1",
        c: "Document",
      },
    ],
  },
];
const data2 = [
  {
    a: "导航1",
    b: "1",
    c: "Document",
  },
  {
    a: "导航2",
    b: "2",
    c: "Document",
  },
  {
    a: "导航3",
    b: "3",
    c: "Document",
    d: [
      {
        a: "导航3-1",
        b: "3-1",
        c: "Document",
        d: [
          {
            a: "导航3-1-1",
            b: "3-1-1",
            c: "Document",
            d: [
              {
                a: "导航3-1-1-1",
                b: "3-1-1-1",
                c: "Document",
                d: [
                  {
                    a: "导航3-1-1-1-1",
                    b: "3-1-1-1-1",
                    c: "Document",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>

<style scoped lang="scss">
.aside {
  display: flex;
  .container {
    flex: 1;
  }
}
</style>
