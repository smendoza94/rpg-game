async function logout() {
  const response = await fetch(`/api/users/${playerInfo._id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(playerInfo),
  });
  if (response.ok) {
    response.json();
    localStorage.removeItem("playerSave");
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document.querySelector("#logout").addEventListener("click", logout);

if (playerInfo) {
  document.querySelector("#logout").classList.remove("hide");
} else {
  document.querySelector("#logout").classList.add("hide");
}

if (!playerInfo) {
  document.querySelector("#login").classList.remove("hide");
} else {
  document.querySelector("#login").classList.add("hide");
}
