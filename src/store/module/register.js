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
      const loginData = {
        account: data.account,
        password: data.password
      };
      axios.post(`${import.meta.env.VITE_API_URL}/myweb/login`, loginData).then(res => {
        axios.defaults.headers.token = res.data.token;
        console.log(axios.defaults.headers.token);
      });
    }
  },
  mutations: {},
  getters: {}
};
