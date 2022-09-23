<template>
    <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
    <use xlink:href="#icon-arrowLeft"></use>
</svg>
<input type="text" placeholder="周杰伦" v-model="searchKey" @keydown.enter="enterKey">
  </div>
  <div class="searchHistroy">
    <span class="searchSpan">历史</span>
    <span v-for="item in histroyList" :key="item" class="spanKey" @click="searchHistroy(item)">
    {{item}}
    </span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
    <use xlink:href="#icon-shanchu"></use>
</svg>
  </div>
  <div class="itemList">
        <div class="item" v-for="(item, i) in searchList" :key="i">
          <div class="itemLeft" @click="updateIndex(item)">
            <span class="leftSpan">{{ i + 1 }}</span>
            <div>
              <p>{{ item.name }}</p>
              <span v-for="(item1, index) in item.artists" :key="index">{{
                item1.name
              }}</span>
            </div>
          </div>
          <div class="itemRight">
            <svg class="icon bofang" aria-hidden="true" v-if='item.mvid !=0'>
              <use xlink:href="#icon-mv-line"></use>
            </svg>
            <svg class="icon liebiao" aria-hidden="true">
              <use xlink:href="#icon-a-menuclose"></use>
            </svg>
          </div>
        </div>
      </div>
</template>

<script>
  import {getSearchMusic} from '@/request/api/home.js'
import { mapMutations } from 'vuex'
export default {
name:'Search',
data(){
    return {
        histroyList:[],
        searchKey:"",
        searchList:[]
    }
},
mounted(){
this.histroyList=JSON.parse(localStorage.getItem('histroyList'))?JSON.parse(localStorage.getItem('histroyList')):[]
},
methods:{
    async enterKey(){
        if(this.searchKey!=''){
          this.histroyList.unshift(this.searchKey)
          //去重
          if(this.histroyList.length>5){
            // this.histroyList.pop()
            this.histroyList.splice(this.histroyList.length-1,1)
          }
       this.histroyList=[...new Set(this.histroyList)]
        localStorage.setItem('histroyList',JSON.stringify(this.histroyList))
        let res=await getSearchMusic(this.searchKey)
        this.searchList=res.data.result.songs
        console.log(this.searchList)
        this.searchKey=""
        }
    },
    delHistory(){
        localStorage.removeItem('histroyList')
        this.histroyList=[]
    },
    async searchHistroy(item){
      let res=await getSearchMusic(item)
        this.searchList=res.data.result.songs
        console.log(this.searchList)
    },
    updateIndex(item){
      this.updatePushPlayList(item)
      this.updatePlayListIndex(this.$store.state.playList.length-1)
      item.al=item.album
      item.al.picUrl=item.album.artist.img1v1Url
    },
    ...mapMutations(['updatePushPlayList','updatePlayListIndex'])
}
}
</script>

<style lang="less">
.searchTop{
    width: 100%;
    height: 1rem;
    padding: 0 10px;
    display: flex;
    align-items: center;
    input{
       width: 90%;
       padding: 5px;
       border: none;
       border-bottom: 1px solid #999;
       margin-left: 10px;
    }
}
.searchHistroy{
  width:100%;
  padding: 0.2rem;
  position: relative;
  .searchSpan{
    font-weight: 700;
  }
  .spanKey{
    background-color: rgb(205, 189, 189);
    padding: 5px 10px;
    border-radius: 20px;
    margin:5px 10px;
    display: inline-block;
  }
  .icon{
    position: absolute;
    left: 330px;
  }
}
.itemList {
      width: 100%;
      .item {
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .itemLeft {
          width: 85%;
          height: 100%;
          display: flex;
          align-items: center;
          .leftSpan {
            display: inline-block;
            width: 0.2rem;
            text-align: center;
          }
          div {
            p {
              width: 4.54rem;
              height: .4rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: 700;
            }
            span{
              font-weight: 400;
              font-size: .24rem;
              color: #999;
            }
            margin-left: 0.3rem;
          }
        }
        .itemRight{
          width: 20%;
          height: 100%;
          display: flex;
          // justify-content: space-between;
          align-items: center;
          position: relative;
          .icon{
            fill: #999;
          }
           .bofang{
              position: absolute;
              left: 0;
            }
           .liebiao{
              position: absolute;
              right: 0;
            }
        }
      }
    }
</style>