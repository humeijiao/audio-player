<template>
  <div class="footerMusic">
     <div class="footerLeft" @click="updateDetailShow">
        <img :src="playList[playListIndex].al.picUrl" alt="">
      <div>
        <div>{{playList[playListIndex].name}}</div>
        <span>横滑可以切换上下首哦</span>
      </div>
     </div>
     <div class="footerRight">
        <svg class="icon" aria-hidden="true" @click="play" v-if="isbtnShow">
          <use xlink:href="#icon-24gl-playCircle"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-24gl-playlistMusic"></use>
        </svg>
     </div>
     <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
     <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%' ,width:'100%'}" >
        <MusicDetail 
        :musicList="playList[playListIndex]" 
        :play="play" 
        :isbtnShow="isbtnShow"
        :addDuration="addDuration"/>
     </van-popup>
</div>
</template>

<script>
    import { mapState,mapMutations } from 'vuex';
import MusicDetail from './MusicDetail.vue';
export default {
    name: "FooterMusic",
    data(){
        return {InterVal:0}
    },
    mounted(){
      this.$store.dispatch('getLyric',this.playList[this.playListIndex].id)
      this.addDuration()
    },
    updated(){
        this.$store.dispatch('getLyric',this.playList[this.playListIndex].id)
        // console.log('audio',this.$refs.audio.duration)
        this.addDuration()
    },
    computed: { ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow","duration","currentTime"]) },
    methods: {
        play: function () {
            if (this.$refs.audio.paused) {
                this.$refs.audio.play();
                this.updateIsbtnShow(false);
                this.updateTime()//播放就调用函数进行传值
            }
            else {
                this.$refs.audio.pause();
                this.updateIsbtnShow(true);
                clearInterval(this.InterVal)//暂停清除定时器
            }
        },
        updateTime(){
            this.InterVal=setInterval(()=>{
           this.updateCurrentTime(this.$refs.audio.currentTime)
          },1000)
        },
        addDuration(){
            // console.log('duration',this.$refs.audio.duration)
          this.updateDuration(this.$refs.audio.duration)
        },
        ...mapMutations(["updateIsbtnShow", "updateDetailShow","updateCurrentTime","updateDuration"])
    },
    watch: {
        playListIndex: function () {
            //监听如果下标发生了改变，就自动播放音乐
            this.$refs.audio.autoplay = true;
            if (this.$refs.audio.paused) {
                //如果是暂停状态，改变图标
                this.updateIsbtnShow(false);
            }
        },
        playList: function () {
            if (this.isbtnShow) {
                this.$refs.audio.autoplay = true;
                this.updateIsbtnShow(false);
            }
        },
    },
    components: { MusicDetail }
}
</script>

<style lang="less" scoped>
.footerMusic{
    width: 100%;
    height: 1.5rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    display: flex;
    padding: 10px;
    justify-content: space-between;
    .footerLeft{
        width: 70%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        img{
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
        }
    }
    .footerRight{
        width: 30%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
}
</style>