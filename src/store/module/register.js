export default {
  namespaced: true,
  state: {
    content: {
      account: '',
      password: '',
      email: ''
    }
  },
  actions: {
    submit(context, data) {
      axios
        .post('http://localhost:3003/register/new', data)
        .then(res => {
          if (res.data.success) {
            toast.clear('content');
            toast.success('註冊成功！');
          } else {
            toast.clear('');
            toast.error('伺服器錯誤，請稍後再試。');
          }
        })
        .catch(err => {
          toast.clear('content');
          toast.error(err);
        });
    }
  },
  mutations: {}
};
