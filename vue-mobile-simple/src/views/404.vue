<template>
  <div class="page-404">
    <page-status
      imgUrl="//manhattan.didistatic.com/static/manhattan/mfd/result-page/lost"
      :describe="$t('record.errorTip')"
    ></page-status>
  </div>
</template>

<script>
import PageStatus from './../components/status';

export default {
  components: {
    PageStatus,
  },
};
</script>

<style lang="stylus" scoped>
.page-404 .page-status {
  margin-top 200px;
}
</style>
