<template>
  <div>
    <router-view/>
  <FooterMusic v-show="isFooterMusicShow"/>  
  </div>
</template>
<script>
  import FooterMusic from "./components/item/FooterMusic.vue";
  import { mapState } from "vuex";
  export default {
    components:{ FooterMusic},
    computed:{
      ...mapState(['isFooterMusicShow'])
    }
  }
</script>
<style lang="less">
*{
  margin:0px;
  padding:0px;
  box-sizing: border-box;
}
.icon{
  width: 30px;
  height: 30px;
}
</style>
