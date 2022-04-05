import axios from 'axios';

export default {
  namespaced: true,
  state: {
    content: {
      account: '',
      password: '',
      email: '',
      name: ''
    },
    imgSrc: ['../../static/img/ani_phone1.png', '../../static/img/ani_phone2.png', '../../static/img/ani_phone3.png', '../../static/img/ani_phone4.png'],
    regisState: false
  },
  actions: {
    signUp(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${import.meta.env.VITE_API_URL}/myweb/register`, data)
          .then(res => {
            if (res.data.status) {
              toast.clear('content');
              toast.success(res.data.message);
              if (res.data.message.includes('成功')) {
                resolve(true);
              } else {
                resolve(false);
              }
            } else {
              toast.clear('');
              toast.error('伺服器錯誤，請稍後再試。');
              resolve(false);
            }
          })
          .catch(err => {
            toast.clear('content');
            toast.error(err.message);
            reject(new Error(false));
          });
      });
    },
    signIn(context, data) {
      toast.clear('');
      const loginData = {
        account: data.account,
        password: data.password
      };
      return new Promise((resolve, reject) => {
        axios
          .post(`${import.meta.env.VITE_API_URL}/myweb/login`, loginData)
          .then(res => {
            switch (res.data.status) {
              case false:
                toast.error('登入失敗，請重新登入。');
                resolve(false);
                break;
              default:
                const { t, e } = res.data;
                document.cookie = `token=${t};expires=${new Date(e)}`;
                toast.success('登入成功！');
                resolve(true);
                break;
            }
          })
          .catch(err => {
            toast.error(err);
            reject(new Error(false));
          });
      });
    }
  },
  mutations: {},
  getters: {}
};
