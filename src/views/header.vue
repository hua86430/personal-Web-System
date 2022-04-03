<template>
  <div class="row">
    <div class="col-12 header py-2">
      <div class="header-content" style="max-width: 1280px; width: 100%">
        <div class="header-icon mr-auto"></div>
        <router-link class="sign-btn" to="register">
          <i class="far fa-user mr-2"></i>
          <span>登入 / 註冊</span>
        </router-link>
      </div>
    </div>
    <div class="col-12">
      <router-view />
    </div>
  </div>
</template>

<script setup>
onMounted(() => {
  console.log(axios.defaults.headers);
});
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  background-color: #fff;
  justify-content: center;
  align-items: center;

  .header-content {
    display: flex;
    align-items: center;
    .header-icon {
      width: 175px;
      height: 51px;

      background-image: url('../../static/img/instagram_icon.png');
      background-repeat: no-repeat;
      background-position: 0 -130px;
    }
    .sign-btn {
      color: #000;
      &:hover {
        color: #422e2e;
      }
    }
  }
}
</style>
