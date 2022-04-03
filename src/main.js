import { createApp, ref, reactive, computed, onMounted, onBeforeMount, watch, watchEffect } from 'vue'; // eslint-disable-line object-curly-newline
/* Vue Toastification */
/* Document : https://vue-toastification.maronato.dev/ */
import Toast, { useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
/* Vue Toastification */

/* Vue Loading */
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
/* Vue Loading */

/* Ant Design Vue */
/* Document : https://next.antdv.com/docs/vue/introduce-cn */
import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.less';
import './assets/helper/less/all.less';
/* Ant Design Vue */

/* vxe table v4 */
import 'xe-utils';
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
/* vxe table v4 */

/* Bootstrap 4.16 */
import Modal from 'bootstrap/js/dist/modal';
import 'bootstrap/dist/js/bootstrap.min';
/* Bootstrap 4.16 */

/* Vue Axios & lodash */
import VueAxios from 'vue-axios';
import _ from 'lodash';
import axios from '@/plugins/axios';
/* Vue Axios & lodash */

// components
import vueLoad from '@/components/plugins/vueLoad.vue';

/* self plugins */
/* VueX */
import store from './store';
/* VueX */
import App from './App.vue';
import router from './router';

VXETable.setup({
  zIndex: 1050,
  input: {
    parseFormat: 'yyyy-MM-dd HH:mm',
    labelFormat: 'yyyy-MM-dd HH:mm',
    valueFormat: 'yyyy-MM-dd HH:mm'
  },
  icon: {
    //   // select
    SELECT_OPEN: 'vxe-icon--arrow-bottom rotate180',
    SELECT_CLOSE: 'vxe-icon--arrow-bottom'
  }
});

/* GLOBAL_METHODS */
window.ref = ref;
window.reactive = reactive;
window.computed = computed;
window.onMounted = onMounted;
window.onBeforeMount = onBeforeMount;
window.watch = watch;
window.watchEffect = watchEffect;
window.Modal = Modal;
window.toast = useToast();
window.axios = axios;
window._ = _;
/* GLOBAL_METHODS */

router.beforeEach((to, from, next) => {
  if (to.meta.content) {
    const head = document.getElementsByTagName('head');
    const meta = document.createElement('meta');
    meta.content = to.meta.content;
    head[0].appendChild(meta);
  }
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
const app = createApp(App);
// app.config.productionTip = false; // 關閉生產模式警告

/* VXETable Global variables */
function useTable() {
  app.use(VXETable);
  app.config.globalProperties.$XModal = VXETable.modal;
}
/* VXETable Global variables */

/* Vue Toastification GLOBAL OPTION */
app.use(Toast, {
  position: 'top-center',
  transition: 'Vue-Toastification__fade',
  timeout: 10000,
  showCloseButtonOnHover: true,
  draggable: false,
  newestOnTop: true,
  filterBeforeCreate: (toast1, toasts2) => {
    if (toasts2.filter(t => t.type === toast1.type).length !== 0) {
      return false;
    }
    return toast1;
  }
});
/* Vue Toastification GLOBAL OPTION */

app.use(Antd);
app.use(store);
app.use(VueAxios, axios);
app.use(useTable);
app.component('vueLoad', vueLoad);
app.component('VueLoading', VueLoading);
app.use(router);
app.mount('#app');
