const $monsterListCont = document.querySelector("#monster-display");
const $navLevelCont = document.querySelector("#nav");

// set the default enemy rating to 1/4 lowest
let monsterRating = `1/4`;

// using the difficulty buttons, select a rating and refresh the enemy list
function selectDifficulty() {
  const difficultyInput = document.querySelector('[role="difficulty"]');
  difficultyInput.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.innerHTML === "Easy") {
        monsterRating = Math.floor(1 + Math.random() * (4 - 1 + 1));
      }
      if (btn.innerHTML === "Normal") {
        monsterRating = Math.floor(5 + Math.random() * (14 - 5 + 1));
      }
      if (btn.innerHTML === "Hard") {
        monsterRating = Math.floor(15 + Math.random() * (25 - 15 + 1));
      }
      getEnemyArr();
    });
  });
}

// fetch monsters from remote api,
// then create default character, display character, and display monster cards list
async function getEnemyArr() {
  $monsterListCont.innerHTML = "";
  // select the challenge level of enemies
  // all monster/enemy array information from 3rd party API
  const APIurl = `https://api.open5e.com/monsters/?challenge_rating=${monsterRating}&armor_class=&type=&name=&document=&document__slug=&name=&ordering=hit_points&type=`;
  // convert the full response to just the json data array
  // use the monster array from API data to create the monster card displays
  await fetch(APIurl)
    .then((response) => {
      response.json().then((enemyArr) => {
        enemyArr.results.forEach(printEnemy);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

const printEnemy = ({ name, size, type, alignment, hit_points, strength }) => {
  const enemyCard = `
  <div class="card bg-dark m-2 border border-white" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${size} ${type}, ${alignment}</p>
      <p class="card-text">HP: ${hit_points}, Att: ${strength}</p>
    </div>
  </div>
  `;
  // ${(() => {
  //   if (playerInfo.monstersDefeated.includes(monsterObj.name)) {
  //     return `<button class="btn btn-secondary">Defeated</button>`;
  //   } else {
  //     return `<button class="btn btn-success" data-action="fight" data-name="${name}">Fight</button>`;
  //   }
  // })()}
  $monsterListCont.innerHTML += enemyCard;
  // $monsterListCont
  //   .querySelectorAll(`[data-action="fight"]`)
  //   .forEach((fightBtn) => {
  //     console.log(fightBtn);
  //     fightBtn.addEventListener("click", () => {
  //       console.log(`You fight the ${fightBtn.getAttribute("data-name")}!`);
  //     });
  //   });
};

getEnemyArr();
selectDifficulty();
