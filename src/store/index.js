import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
import { getPhoneLogin } from '@/request/api/home'

export default createStore({
  state: {
    playList:[{//播放列表
      al:{
        id: 36451504,
        name: "祝你幸福",
        pic: 109951166562842110,
        picUrl: "https://p2.music.126.net/8bZeyMGD4xY-O3eXtP-C4w==/109951166562842114.jpg",
        pic_str:"109951166562842114"
      },
      name: "祝你幸福",
      id: 511920347,
      isbtnShow:true,//暂停按钮的显示
      detailShow:false,//歌曲详情页的显示
      lyricList:{}//歌词
    }
    ],
    playListIndex:0,//默认下标为0
    currentTime:0,//当前时间
    duration:0,//歌曲总时长
    isLogin:false,//判断是否登录
    isFooterMusicShow:true//是否显示底部音乐组件
   
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow(state,value){
        state.isbtnShow=value
    },
    updatePlayList(state,value){
      state.playList=value
    },
    updatePushPlayList(state,value){
      state.playList.push(value)
    },
    updatePlayListIndex(state,value){
      state.playListIndex=value
    },
    updateDetailShow(state){
      state.detailShow=!state.detailShow
    },
    updateLyricList(state,value){
state.lyricList=value
    },
    updateCurrentTime(state,value){
      state.currentTime=value
      // console.log(state.currentTime)
    },
    updateDuration(state,value){
      state.duration=value
    }
  },
  actions: {
    getLyric: async function (context,value){
     let res= await getMusicLyric(value)
     console.log('歌词',res)
     context.commit('updateLyricList',res.data.lrc)
    },
    getLogin:async function(context,value){
      let res=await getPhoneLogin(value)
      console.log('login',res)
      return res
    }
  },
  modules: {
  }
})
