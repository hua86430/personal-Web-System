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
              <div class="w-100" v-if="!forgetState">
                <div class="sign_up_img mx-auto mb-2"></div>
                <div v-if="signUpState" class="col-12 mb-2 register_title">註冊即可查看朋友的相片和影片。</div>

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
                  <a-button :class="{ sign_up_btn: signInBtn }" @click="submit" style="font-weight: 600" class="w-100 br-4" type="primary" :loading="axiosLoading">
                    {{ signUpState ? '註冊' : '登入' }}
                  </a-button>
                </div>
                <div v-if="signUpState" class="col-12 mt-2 register_remind">
                  <p class="mb-0">註冊即表示你同意我們的 服務條款 、 資料政策 和 Cookie 政策 。</p>
                </div>

                <div v-if="!signUpState" class="w-100">
                  <a-divider />
                  <a class="forget_btn" @click.prevent="forgetState = true">忘記密碼？</a>
                </div>
              </div>
              <div class="w-100" v-else>
                <div class="forget_img mx-auto mb-2"></div>
                <div class="col-12 forget_title mb-1">
                  <p class="mb-0">無法登入？</p>
                  <span>輸入你的電子郵件、電話號碼或用戶名稱，我們將會幫你重設密碼。</span>
                </div>
                <div class="col-12">
                  <a-input @change="passwordBtnState" class="first_input mb-2" id="account" placeholder="手機號碼、用戶名稱或電子郵件地址" v-model:value="content.account" />
                </div>
                <div class="text-center col-12">
                  <a-button :class="{ sign_up_btn: content.account.length < 6 }" @click="resetPassword" style="font-weight: 600" class="w-100 br-4" type="primary"> 重設密碼 </a-button>
                </div>
                <a-divider>或</a-divider>
                <a class="forget_toNew" href="#" @click.prevent="signInUp(true), clearInput(), (forgetState = false)"> 建立新帳號</a>
                <div class="col-12 back_toLogin py-1" @click="signInUp(false), clearInput(), (forgetState = false)">返回登入</div>
              </div>
            </div>
            <div class="row sign_up px-4 py-3" v-if="!forgetState">
              <span v-if="!signUpState">
                沒有帳號嗎？
                <a @click.prevent="signInUp(true)" class="f-w500" href="#">註冊</a>
              </span>
              <span v-else>
                已經有帳號嗎？
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
import { useRouter } from 'vue-router';
import { checkEmail } from '@/plugins/checkEmail';
import { getExpires } from '@/plugins/getCookie';

const router = useRouter();
const store = useStore();
const content = reactive(computed(() => store.state.register.content));
const imgSrc = reactive(computed(() => store.state.register.imgSrc));
const axiosLoading = ref(computed(() => store.state.loading));
// 登入 button
const signInBtn = ref(true); // true=登入 false=註冊
// 註冊 button
const signUpState = ref(false); // false=註冊帳號 true=登入
// 忘記密碼 button
const forgetState = ref(false);
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

// 檢查忘記密碼欄位
const passwordBtnState = () => {
  const a = content.value.account;
  if (a.length >= 6) {
    signInBtn.value = false;
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
// 重設密碼
const resetPassword = () => {
  console.log('重設密碼');
};
const submit = () => {
  toast.clear('content');
  switch (forgetState) {
    case true:
      console.log('forget');
      break;
    default:
      if (signUpState.value) {
        store.dispatch('register/signUp', content.value).then(res => {
          if (res) {
            signUpState.value = false;
            signInBtn.value = true;
            clearInput();
          }
        });
      } else {
        store.dispatch('register/signIn', content.value).then(res => {
          if (res) {
            setTimeout(() => {
              // window.location.href = '/';
            }, 1000);
          }
        });
      }
      break;
  }
};

onMounted(() => {
  console.log(document.cookie);
  document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
  // const tokenStatus = getExpires('token');
  // if (tokenStatus) {
  // router.push('/');
  // }
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
    text-align: center;
    max-width: 350px;
    width: 100%;
    .sign_in,
    .sign_up {
      border: 1px solid #dbdbdb;
      background-color: #fff;
      border-radius: 4px;
      display: flex;
      justify-content: center;
    }
    .register_title {
      font-size: 17px;
      font-weight: 600;
      line-height: 20px;
      color: #8e8e8e;
    }
    .register_remind {
      p {
        font-size: 12px;
        line-height: 16px;
        color: #8e8e8e;
      }
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
    .forget_img {
      width: 96px;
      height: 96px;
      background-image: url('../../static/img/instagram_icon.png');
      background-repeat: no-repeat;
      background-position: -130px 0;
    }
    .forget_title {
      p {
        font-size: 16px;
        line-height: 24px;
        color: #262626;
        font-weight: 600;
      }
      span {
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
      }
    }
    .forget_toNew {
      color: rgb(38, 38, 38);
      font-size: 14px;
      line-height: 18px;
      font-weight: 600;
    }
    .back_toLogin {
      border: 1px solid #bdbdbd;
      font-size: 14px;
      line-height: 18px;
      font-weight: 600;
      margin-top: 80px;
      background-color: #fafafa;
      cursor: pointer;
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
