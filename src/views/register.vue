<template>
  <vue-load />
  <section class="regis_bg">
    <div class="register_block">
      <div class="row d-flex justify-content-center">
        <div class="col-5">
          <div class="phoneImg">
            <div class="imgList">
              <img :key="img" :src="imgSrc[img - 1]" alt="phone1" v-for="img in 4" />
            </div>
          </div>
        </div>
        <div class="col-4 d-flex align-items-center">
          <section class="sign_up_block">
            <div class="row sign_in mb-3 px-4 py-3">
              <div class="sign_up_img mx-auto mb-3"></div>
              <div class="col-12" v-if="!signUpState">
                <a-input @change="changeBtnState" class="first_input mb-2" id="account" placeholder="手機號碼、用戶名稱或電子郵件地址" v-model:value="content.account" />
              </div>
              <!-- 註冊 -->
              <div class="col-12" v-if="signUpState">
                <a-input @change="changeBtnState" class="first_input mb-2" id="account" placeholder="手機號碼、或電子郵件" v-model:value="content.email" />
              </div>
              <div class="col-12" v-if="signUpState">
                <a-input @change="changeBtnState" class="mb-2 sec_input" id="name" placeholder="全名" v-model:value="content.name" />
              </div>
              <div class="col-12" v-if="signUpState">
                <a-input @change="changeBtnState" class="mb-2 sec_input" id="account_sign_up" placeholder="用戶名稱" v-model:value="content.account" />
              </div>
              <!-- 註冊 -->
              <div class="col-12">
                <a-input-password @change="changeBtnState" class="mb-2 sec_input" id="password" placeholder="密碼" v-model:value="content.password" />
              </div>
              <div class="text-center col-12">
                <a-button :class="{ sign_up_btn: signInBtn }" @click="submit" class="w-100 br-4" type="primary">
                  {{ signUpState ? '註冊' : '登入' }}
                </a-button>
              </div>
              <a-divider />
              <a class="forget_btn">忘記密碼？</a>
            </div>
            <div class="row sign_up px-4 py-3">
              <span v-if="!signUpState">
                沒有帳號嗎？
                <a @click.prevent="signInUp(true)" class="f-w500" href="#">註冊</a>
              </span>
              <span v-else>
                有帳號嗎？
                <a @click.prevent="signInUp(false)" class="f-w500" href="#">登入</a>
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useStore } from 'vuex';
import { checkEmail } from '@/plugins/checkEmail';

const store = useStore();
const content = reactive(computed(() => store.state.register.content));
const imgSrc = reactive(computed(() => store.state.register.imgSrc));
// 登入 button
const signInBtn = ref(true);
// 註冊 button
const signUpState = ref(false);
// 檢查 input 是否輸入完成
const changeBtnState = () => {
  const a = content.value.account;
  const p = content.value.password;
  const e = content.value.email;
  const n = content.value.name;
  if (a.length >= 6 && p.length >= 6) {
    switch (signUpState) {
      case true:
        if (n.length >= 3 && checkEmail(e)) {
          signInBtn.value = false;
        }
        break;
      default:
        signInBtn.value = false;
        break;
    }
  } else {
    signInBtn.value = true;
  }
};

// 清空欄位
const clearInput = () => {
  store.state.register.content = {
    account: '',
    password: '',
    email: '',
    name: ''
  };
};
// 切換登入註冊
const signInUp = state => {
  signUpState.value = state;
  signInBtn.value = true;
  clearInput();
};
const submit = () => {
  toast.clear('content');
  if (signUpState.value) {
    store.dispatch('register/signUp', content.value).then(res => {
      if (res) {
        signUpState.value = false;
        signInBtn.value = true;
        clearInput();
      }
    });
  } else {
    store.dispatch('register/signIn', content.value);
  }
};
onMounted(() => {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);

  console.log(axios.defaults.headers);
});
</script>

<style lang="scss">
.regis_bg {
  width: 100%;
  background-color: #fafafa;
  display: flex;
  justify-content: center;
  align-items: center;
}
.register_block {
  height: calc(var(--vh, 1vh));
  width: 100%;
  max-width: 1000px;
  padding-top: 10%;
  .phoneImg {
    height: 581px;
    background-image: url('../../static/img/phone.png');
    background-repeat: no-repeat;
    background-size: 468.32px 634.15px;
    background-position: -46px 0;
    .imgList {
      display: inline-block;
      margin: 27px 0 0 112.5px;
      position: relative;

      img {
        position: absolute;
        opacity: 0;
        animation: fadeInOut 20s linear infinite;
      }
      img:nth-child(1) {
        opacity: 1;
        animation-delay: 0s;
      }
      img:nth-child(2) {
        animation-delay: 5s;
      }
      img:nth-child(3) {
        animation-delay: 10s;
      }
      img:nth-child(4) {
        animation-delay: 15s;
      }
    }
  }
  .sign_up_block {
    max-width: 300px;
    width: 100%;
    .sign_in,
    .sign_up {
      border: 1px solid #dbdbdb;
      background-color: #fff;
      border-radius: 4px;
      display: flex;
      justify-content: center;
    }
    .sign_up_img {
      width: 175px;
      height: 51px;
      background-image: url('../../static/img/instagram_icon.png');
      background-repeat: no-repeat;
      background-position: 0 -130px;
    }
    .first_input,
    .sec_input,
    #password {
      background-color: #fafafa;
      font-size: 10px;
      line-height: 24px;
    }
    .sign_up_btn {
      transition: 0.3s;
      pointer-events: none;
      opacity: 0.4;
    }
    .forget_btn {
      font-size: 12px;
      color: #00376b;
    }
    .ant-divider-horizontal {
      border-color: #dbdbdb;
    }
  }
}

@keyframes fadeInOut {
  7% {
    opacity: 1;
    filter: alpha(opacity= 100);
  }
  20% {
    opacity: 1;
    filter: alpha(opacity= 100);
  }
  25% {
    opacity: 1;
    filter: alpha(opacity= 100);
  }
  30% {
    opacity: 0;
    filter: alpha(opacity= 0);
  }
}
</style>
