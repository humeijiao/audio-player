<template>
  <div class="swiperTop">
    <van-swipe :autoplay="3000" lazy-render>
  <van-swipe-item v-for="image in images.state" :key="image">
    <img :src="image.pic" />
  </van-swipe-item>
</van-swipe>
  </div>

</template>

<script>
    import axios from 'axios'
    import { reactive,onMounted } from 'vue';
    import {getBanner} from '@/request/api/home.js'
export default {
name:'SwiperTop',
setup() {
    const images = reactive({
        state:[
    //   'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
    "http://p1.music.126.net/tz-FC5q-ztHiidN5xs9scQ==/109951167856616493.jpg",
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ]});
    onMounted(async ()=>{
//         axios.get('http://localhost:3000/banner?type=2').then((res)=>{
//             console.log(res.data)
//             images.state=res.data.banners
//  })
       let res=await getBanner()
       images.state=res.data.banners
    })
    return { images };
  },
}
</script>

<style lang="less">
.swiperTop{
    .van-swipe{
    width: 100%;
    height: 3rem;
       
        .van-swipe-item{
            padding: 0 10px;
            img{
                width:100%;
            height: 100%;
            border-radius: 10px;
            }
           }
    .van-swipe__indicator--active{
        background-color: rgb(219, 130, 130);
    }
}
}
</style>