const $navLevelCont = document.querySelector("#nav");

const playerInfo = JSON.parse(localStorage.getItem("playerSave"));

// // load a saved character, if nothing is saved create a default character for practice
// const getCharacter = () => {
//   // load saved character
//   fetch(`/api/users/${characterId}`).then((response) => {
//     if (!response.ok) {
//       throw new Error("Something went wrong!");
//     }
//     response.json().then((data) => {
//       window.localStorage.setItem("playerSave", JSON.stringify(data));
//     });
//     // displayPlayer(playerInfo);
//   });
// };

function displayCharacter({
  username,
  hit_points,
  strength,
  monstersDefeated,
}) {
  const characterCard = `
  <div class="card bg-dark mt-4" style="width: 100%">
  <h6 class="mt-1 ms-4"><u>Hero Card</u></h6>
    <div class="card-body">
      <h5 class="card-title ps-3 py-2 bg-success rounded-pill"> ${username}</h5>
      <p class="card-text p-2">HP: ${hit_points}, Att: ${strength}</p>
      <!-- collapsable count of monsters defeated -->
      <p>
        <button class="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseList" aria-expanded="false" aria-controls="collapseList">
          Monsters Defeated: ${monstersDefeated.length}
        </button>
      </p>
    </div>
  </div>
  `;
  $navLevelCont.innerHTML += characterCard;
}

if (playerInfo) {
  displayCharacter(playerInfo);
}
