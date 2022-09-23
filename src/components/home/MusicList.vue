<template>
  <div class="musicList">
    <div class="musicTop">
        <div class="title">发现好歌单</div>
        <div class="more">查看更多</div>
    </div>

   <div class="musicContent">
 <van-swipe :loop="false" :width="150" class="my-swiper">
  <van-swipe-item v-for="item in music.musicList" :key="item.id">
    <router-link :to="{
        path:'/itemMusic',
        query:{id:item.id}
    }">
    <img :src="item.picUrl" alt="">
 <div class="playCount">
    <svg class="icon" aria-hidden="true">
    <use xlink:href="#icon-24gl-play"></use>
    </svg>
    {{changeCount(item.playCount)}}
</div>
 <span class="name">{{item.name}}</span>
  </router-link>
  </van-swipe-item>
  </van-swipe>
   </div>
  
  </div>
</template>

<script>
    import { getMusicList } from '@/request/api/home';
import { onMounted,reactive } from '@vue/runtime-core';
export default {
name:'MusicList',

setup(){
    const music=reactive({
        musicList:[]
    })
    function changeCount(num){
      if(num>10000){
        return (num/10000).toFixed(1)+'万'
      }
    }
    onMounted(async ()=>{
        const res = await getMusicList()
        console.log(res.data)
        music.musicList=res.data.result
    })
    return {music,changeCount}
}
}
</script>

<style lang="less" scoped>
.musicList{
    width: 100%;
    height: 5rem;
    padding: 0.2rem;
    .musicTop{
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        .title{
            font-size: 0.4rem;
            font-weight:900;
        }
        .more{
            border:1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding :0 0.2rem;
            border-radius: 0.4rem;
        }
    }
    .musicContent{
width: 100%;
height: 4rem;
.my-swiper{
    height: 100%;
    position: relative;
    img{
        width: 100%;
        height: 150px;
        border-radius: 15px;
        padding: 0 5px
    };
    .playCount{
        padding: 0 7px;
        position: absolute;
        top:-10px;
        color: rgb(255, 255, 255);
        .icon{
            width: 20px;
           position: relative;
           top: 9px;
        }
    }
    .name{
       margin:0 10px;
        color: black;
    }
}
}   
}

</style>