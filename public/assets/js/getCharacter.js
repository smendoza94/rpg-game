// load a saved character, if nothing is saved create a default character for practice
const getCharacter = () => {
  // load saved character
  // playerInfo = JSON.parse(localStorage.getItem("playerSave"));
  fetch(`/api/users/${characterId}`).then((response) => {
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    response.json().then((data) => {
      playerInfo = data;
      displayPlayer(playerInfo);
    });
  });
};
