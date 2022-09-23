<template>
    <img src="@/assets/background.jpeg" alt="">
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="password"
        name="passworld"
        class="passworld"
        v-model="password"
        placeholder="请输入密码"
      />
      <button class="btn" @click="Login">登录</button>
    </div>
  </div>
</template>

<script>
export default {
name:'Login',
data(){
    return {
        phone:0,
        password:''
    }
},
methods:{
    async Login(){
        res=await this.$store.dispatch('getLogin',{phone:this.phone,password:this.password})
        console.log(res)
    }
}
}
</script>

<style lang="less" scoped>
    img{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
        filter: blur(5px);
    }
    .login {
      width: 100%;
      height: 13.34rem;
      padding: 0.2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .loginTop {
        margin-top: 1rem;
        font-size: 1rem;
        color: #fff;
      }
      .loginContent {
        width: 100%;
        height: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        margin-top: 2rem;
       .phone,
        .passworld {
          width: 5rem;
          height: 1rem;
          border: 0.02rem solid #999;
        }
        .btn{
            width: 2rem;
            height: .6rem;
        }
      }
    }
    </style>
    