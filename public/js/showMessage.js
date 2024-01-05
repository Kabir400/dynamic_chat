//showing error message--
const showError = (message) => {
  document.getElementById("message").innerText = message;
};
//showing success message--
const showMessage = (msg) => {
  const ele = document.getElementById("message");
  ele.innerText = msg;
  ele.style.color = "green";
};
