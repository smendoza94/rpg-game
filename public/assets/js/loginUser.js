const loginUser = (event) => {
  event.preventDefault();
  if (usernameInput && passwordInput) {
    const response = fetch(`/api/users/${usernameInput}`).then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      response.json().then((data) => {});
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};
