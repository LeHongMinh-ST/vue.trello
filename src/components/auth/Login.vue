<template>
  <LoginLayout>
    <template #login>
      <main class="loginWrap">
        <div class="logoWrap">
          <img class="logo" src="../../assets/image/logo.jpg" alt=""></div>

        <button class="submitButton"
                tabindex="0" type="button" @click="submitLogin()">
          <span class="btnLabel">ĐĂNG NHẬP</span>
          <span class="MuiTouchRipple-root"></span>
        </button>

        <div class="returnRegisterWrap">
          <button class="registerBtn">
            <span class="btnLabel" @click="register()">Đăng kí</span>
            <span class="MuiTouchRipple-root"></span>
          </button>
        </div>
      </main>
    </template>
  </LoginLayout>
</template>

<script>
import LoginLayout from "@/layouts/LoginLayout";

export default {
  name: "Login",
  components: {
    LoginLayout
  },
  methods:{
    register(){
      this.$router.push('/register')
    },

    submitLogin(){
      this.$router.push('/admin')
    }
  }
}
</script>

<style scoped lang="scss">
.loginWrap {
  width: 444px;
  display: block;
  box-sizing: border-box;
  margin: 0 auto;
  background: #fff;
  padding: 24px;
  border-radius: 10px;

  .logoWrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;

    img {
      width: 200px;
      box-sizing: border-box;
      vertical-align: middle;
      border-style: none;
    }
  }

  .submitButton {
    width: 100%;
    height: 50px;
    border: none;
    background: #5cdee4;
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    line-height: 18px;
    text-transform: none;
    padding: 6px 8px;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 800;
    outline: none;
    border-radius: 4px;
    cursor: pointer;


    .btnLabel {
      width: 100%;
      display: inherit;
      align-items: inherit;
      justify-content: inherit;
      box-sizing: border-box;
    }
  }

  .returnRegisterWrap {
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 24px;
    box-sizing: border-box;
    color: #5cdee4;

    .registerBtn {
      font-size: 14px;
      line-height: 18px;
      background: transparent;
      border-radius: 4px;
      text-transform: none;
      outline: none;
      cursor: pointer;
      border: none;
      background: none;
      padding: 6px 8px;
      box-sizing: border-box;
      transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      font-family: "Roboto", "Helvetica", "Arial", sans-serif;
      font-weight: 500;
      border: 0;
      margin: 0;
      display: inline-flex;
      outline: 0;
      color: #5cdee4;


    }

    .registerBtn:hover {
      text-decoration: none;
      background-color: rgba(0, 0, 0, 0.04);
    }


  }

}

</style>