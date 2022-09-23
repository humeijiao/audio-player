import serves from '..'
//获取首页轮播图的数据
export function getBanner(){
    return serves({
        method:'GET',
        url:'banner?type=2'
    })
}
//获取推荐歌单
export function getMusicList(){
    return serves({
        method:'GET',
        url:'/personalized'


    })
}
//搜索
export function getSearchMusic(data){
    return serves({
        method:'GET',
        url:`/search?keywords=${data}`
    })
}
//手机号码登录
export function getPhoneLogin(data){
    return serves({
        method:'GET',
        url:`/login/cellphone?phone=${data.phone}&md5_password=${data.password}`
    })
}