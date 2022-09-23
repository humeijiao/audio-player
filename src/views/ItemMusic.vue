<template>
  <div>
    <ItemMusicTop :playlist="state.playlist"/>
  <ItemMusicList :itemList="state.itemList"/>
  </div>
</template>

<script>
    import { onMounted,reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import {getMusicItemList,getItemList} from '../request/api/item'
    import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
    import ItemMusicList from '@/components/item/ItemMusicList.vue';

export default {
    name: "ItemMusic",
    setup() {
        const state = reactive({
            playlist: {},//歌单详情数据
            itemList:[]//歌单歌曲
        });
        onMounted(async () => {
            let id = useRoute().query.id;
            //获取歌单详情页
            let res = await getMusicItemList(id);
            console.log(res);
            state.playlist = res.data.playlist;
            //防止页面刷新，数据丢失
            sessionStorage.setItem('itemDetail',JSON.stringify(state))
            //获取歌单的歌曲
           let result=await getItemList(id)
           console.log('歌单歌曲',result)
           state.itemList=result.data.songs
        });
        components: {
            ItemMusicTop;
        }
        return { state };
    },
    components: { ItemMusicTop,ItemMusicList }
}
</script>

<style>

</style>