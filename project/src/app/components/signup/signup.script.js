function toggleForm() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const mobileLogin = document.getElementById("mobileLoginForm");
  const mobileRegister = document.getElementById("mobileRegisterForm");

  if (loginForm && registerForm) {
    loginForm.classList.toggle("hidden");
    registerForm.classList.toggle("hidden");
  }

  if (mobileLogin && mobileRegister) {
    mobileLogin.classList.toggle("hidden");
    mobileRegister.classList.toggle("hidden");
  }
}
