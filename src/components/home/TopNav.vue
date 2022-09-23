<template>
<div class="topNav">
    <div class="topLeft">
        <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-a-menuclose"></use>
    </svg>
    </div>
<div class="topContent">
    <span @click="$router.push('/userInfo')">我的</span>
    <span class="active">发现</span>
    <span>云村</span>
    <span>视频</span>
</div>
<div class="topRight">
    <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
    <use xlink:href="#icon-seach"></use>
</svg>
</div>
</div>
</template>

<script>
export default {
name:'TopNav'
}
</script>

<style lang="less" scoped>
.topNav{
    width:100%;
    height: 50px;
    display: flex;
    padding:10px;
    justify-content: space-between;
    align-items: center;
    .topContent{
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        font-size: 18px;
        .active{
            font-weight: 900;
        }
    }
}
</style>