// function creates a new user and uploads it to db
async function createCharacter(event) {
  event.preventDefault();

  const newUsernameInput = document.querySelector("#new-username-input").value;
  const newPasswordInput = document.querySelector("#new-password-input").value;

  if (!newUsernameInput || !newPasswordInput) {
    return;
  }
  // hit_points no more than 12, no less than 5
  let randomHP = Math.floor(5 + Math.random() * (12 - 5 + 1));
  // strength no more than 10, no less than 4
  let randomStr = Math.floor(4 + Math.random() * (10 - 4 + 1));

  const newPlayerInfo = {
    username: newUsernameInput,
    password: newPasswordInput,
    hit_points: randomHP,
    strength: randomStr,
    monstersDefeated: [],
  };

  if (newUsernameInput && newPasswordInput) {
    const response = await fetch(`/api/users`, {
      method: "POST",
      body: JSON.stringify(newPlayerInfo),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("success!");
      response.json().then((data) => {
        window.localStorage.setItem("playerSave", JSON.stringify(data));
      });
      document.location.replace("/");
    } else {
      const formEl = document.querySelector("#new-character-form");
      formEl.innerHTML += `<p class="error">This username is already taken.</p>`;
      console.log(response.statusText);
    }
  }
}

document
  .querySelector("#new-character-form")
  .addEventListener("submit", createCharacter);
