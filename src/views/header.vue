<template>
  <div class="header row" style="margin-top:200px">
    <div class="col-12 d-flex justify-content-center mb-3">
      <div class="w-25">
        <label for="account">帳號</label>
        <a-input
          id="account"
          oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
          onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
          onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
          placeholder="Basic usage"
          v-model:value="content.account"
        />
      </div>
    </div>
    <div class="col-12 d-flex justify-content-center mb-3">
      <div class="w-25">
        <label for="password">密碼</label>
        <a-input-password
          id="password"
          oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
          onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
          onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
          placeholder="Basic usage"
          v-model:value="content.password"
        />
      </div>
    </div>
    <div class="col-12 d-flex justify-content-center mb-3">
      <div class="w-25">
        <label for="email">E-mail</label>
        <a-input
          id="email"
          oncontextmenu="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
          onkeyup="value=value.replace(/[^\a-\z\A-\Z0-9\@\.]/g,'')"
          onpaste="value=value.replace(/[^\a-\z\A-\Z0-9]/g,'')"
          placeholder="Basic usage"
          v-model:value="content.email"
        />
      </div>
    </div>
    <div class="col-12 d-flex justify-content-center">
      <div class="w-25 text-center">
        <a-button @click="submit" type="primary">註冊</a-button>
      </div>
    </div>
  </div>
</template>


<script setup>
import axios from 'axios';
import { useStore } from 'vuex';

const store = useStore();
const content  = reactive(computed(() => store.state.register.content))
    onMounted(() => {
      console.log('res')
      });
const submit = () =>{
  
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(re.test(content.value.email));
  switch(true){
    case content.value.acc==='':
      toast.clear('content')
      toast.error('帳號請勿留空')
      break;
    case content.value.password==='':
      toast.clear('content')
      toast.error('密碼請勿留空')
      break;
    case content.value.email==='':
      toast.clear('content')
      toast.error('Email請勿留空')
      break;
    case !re.test(content.value.email):
      toast.clear('content')
      toast.error('E-mail 格式錯誤')
      break;
      default:
        console.log(content.value);
        store.dispatch('register/submit',content.value)
        break;
  }

}

</script>



<style lang="scss">
</style>