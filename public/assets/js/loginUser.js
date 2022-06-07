// const loginUser = (event) => {
//   event.preventDefault();
//   if (usernameInput && passwordInput) {
//     const response = fetch(`/api/users/${usernameInput}`).then((response) => {
//       if (!response.ok) {
//         throw new Error("Something went wrong!");
//       }
//       response.json().then((data) => {});
//     });
//     if (response.ok) {
//       document.location.reload();
//     } else {
//       alert(response.statusText);
//     }
//   }
// };
async function loginUser(event) {
  event.preventDefault();

  const usernameInput = document.querySelector("#login-username-input").value;
  const passwordInput = document.querySelector("#login-password-input").value;

  if (!usernameInput || !passwordInput) {
    return;
  }
  if (usernameInput && passwordInput) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: usernameInput,
        password: passwordInput,
      }),
      headers: { "Content-type": "application/json" },
    });
    if (response.ok) {
      console.log("success!");
      response.json().then((data) => {
        window.localStorage.setItem("playerSave", JSON.stringify(data));
      });
      document.location.replace("/");
    } else {
      const formEl = document.querySelector("#login-character-form");
      formEl.innerHTML += `<p class="error">This Hero does not exist.</p>`;
      console.log(response.statusText);
    }
  }
}

document
  .querySelector("#login-character-form")
  .addEventListener("submit", loginUser);
