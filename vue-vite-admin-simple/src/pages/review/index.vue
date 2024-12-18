<template>
    <div class="review-container">
        <div class="review-header">
            <div class="title">用户认证</div>
            <div class="process-list">
                <div class="item" v-for="(item, index) in model.process">
                    <div class="circle"></div>
                    <div class="text">{{ item.name }}</div>
                </div>
            </div>
        </div>
        <div class="review-content"></div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue'

const model = reactive({
    process: [
        { name: '企业信息填写', checked: false },
        { name: '申请人信息填写', checked: false },
        { name: '完成认证', checked: false },
    ],
})
</script>
<style lang="scss" scoped>
.page {
    &-home {
        position: relative;
        height: 100vh;
    }
}
</style>
