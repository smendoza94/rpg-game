// main display containers for User Interface
const playerDispCont = document.querySelector("#nav");
const monsterListCont = document.querySelector("#monster-display");

// obtain the values from the user login information
const loginForm = document.querySelector("#login-form");
const usernameInput = document.querySelector("#username-input");
const passwordInput = document.querySelector("#password-input");

// all monster/enemy array information from 3rd party API
const monsterRating = `0`;
const APIurl = `https://api.open5e.com/monsters/?challenge_rating=${monsterRating}&armor_class=&type=&name=&document=&document__slug=&name=&ordering=hit_points&type=`;

// this will hold the active player information when logged in
let playerInfo;

const characterId = "";

const loginUser = (event) => {
  event.preventDefault();
  console.log(usernameInput.value);
  console.log(passwordInput.value);
};
const createUser = (event) => {
  event.preventDefault();
  console.log(usernameInput.value);
  console.log(passwordInput.value);
};

loginForm.addEventListener("submit", loginUser);

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

// fetch monsters from remote api,
// then create default character, display character, and display monster cards list
const getMonsterArr = () => {
  fetch(APIurl)
    .then((response) => {
      // use the monster array from API data to create the monster card displays
      response.json().then((data) => displayMonsters(data.results));
    })
    .catch((err) => {
      console.log(err);
    });
};

const fight = (player, enemy) => {
  let fightWon;
  // hold hit_point values in variables so they dont change in the input object
  let playerHp = player.hit_points;
  let enemyHp = enemy.hit_points;
  // start battle loop, continue until one reaches 0 hp
  while (playerHp > 0 && enemyHp > 0) {
    // player deals damage to the enemy first
    enemyHp -= player.strength;
    // if enemy hp reaches 0 break the fight loop, Player WINS!
    if (enemyHp <= 0) {
      fightWon = true;
      break;
    }
    // enemy deals damage to player
    playerHp -= enemy.strength;
    if (playerHp <= 0) {
      // the player has died. YOU LOSE. delete character.
      fightWon = false;
      break;
    }
  }
  // give the player HP, Str upgrades, and add the defeated monster to its WIN list
  if (fightWon) {
    player.hit_points += Math.ceil(enemy.hit_points * 0.1);
    player.strength += Math.ceil(enemy.strength * 0.1);
    player.monstersDefeated.push(enemy.name);
    // save the user's updated info to the db
    // localStorage.setItem("playerSave", JSON.stringify(playerInfo));
    // document.location.reload();
    fetch(`/api/users/${characterId}`, {
      method: "PUT",
      headers: {
        Accpet: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerInfo),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        response.json();
      })
      .then(location.reload())
      .catch((err) => {
        console.log(err);
      });
  } else {
    // if the player looses the fight, delete the character
    // localStorage.removeItem("playerSave");
    // document.location.reload();
    fetch(`/api/users/${characterId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        response.json();
      })
      .then(location.reload())
      .catch((err) => {
        console.log(err);
      });
  }
};

function displayMonsters(monsterArr) {
  // if the returned array has no values stored in it, print "No Enemies" to the title page
  if (monsterArr === 0) {
    monsterListCont.textContent = "No Enemies Found.";
    return;
  }

  monsterArr.forEach((monsterObj) => {
    // expect: append card with monster data to an existing container monsterObj,
    // html literal ------>
    // `<div class="card bg-dark m-2" style="width: 18rem">
    //   <div class="card-body">
    //     <h5 class="card-title">${monsterObj.name}</h5>
    //     <p class="card-text">${monsterObj.size} ${monsterObj.type}, ${monsterObj.alignment}</p>
    //     <p class="card-text">HP: ${monsterObj.hit_points}, Att: ${monsterObj.strength}</p>
    //     <button class="btn btn-success">Fight</button>
    //   </div>
    // </div>`

    // create a monster card container
    const monsterCard = document.createElement("div");
    monsterCard.classList = `card bg-dark m-2 border border-white`;
    monsterCard.setAttribute("style", "width: 18rem");

    // create the monster card body div to append the "name" and "info"
    const monsterBody = document.createElement("div");
    monsterBody.classList = `card-body`;
    monsterCard.appendChild(monsterBody);

    // create the monster name/title h5 element, append to Body
    const monsterName = document.createElement("h5");
    monsterName.classList = `card-title`;
    monsterName.textContent = monsterObj.name;
    monsterBody.appendChild(monsterName);

    // create monster description, append to body
    const monsterDescp = document.createElement("p");
    monsterDescp.classList = "card-text";
    monsterDescp.textContent = `${monsterObj.size} ${monsterObj.type}, ${monsterObj.alignment}`;
    monsterBody.appendChild(monsterDescp);

    // create the monster stats, append to body
    const monsterStats = document.createElement("p");
    monsterStats.classList = "card-text";
    monsterStats.textContent = `HP: ${monsterObj.hit_points}, Att: ${monsterObj.strength}`;
    monsterBody.appendChild(monsterStats);

    if (playerInfo.monstersDefeated.includes(monsterObj.name)) {
      // if the player has already defeated the monster
      // display a defeated grey button
      const monsterFightBtn = document.createElement("button");
      monsterFightBtn.classList = "btn btn-secondary";
      monsterFightBtn.textContent = "Defeated";
      monsterFightBtn.addEventListener("click", () => {
        console.log(`You've alreaded defeated the ${monsterObj.name}!`);
      });
      monsterBody.appendChild(monsterFightBtn);
    } else {
      // create the "fight" button, append to body
      const monsterFightBtn = document.createElement("button");
      monsterFightBtn.classList = "btn btn-success";
      monsterFightBtn.textContent = "Fight";
      monsterFightBtn.addEventListener("click", () => {
        console.log(`You fight the ${monsterObj.name}!`);
        fight(playerInfo, monsterObj);
        console.log(playerInfo);
      });
      monsterBody.appendChild(monsterFightBtn);
    }

    // append the completed monster card to the Monster List Container
    monsterListCont.appendChild(monsterCard);
  });
}

function displayPlayer(playerObj) {
  // <div class="card bg-dark mt-4" style="width: 100%">
  //   <div class="card-body">
  //     <h5 class="card-title ps-3 py-2 bg-success rounded-pill"> ${playerInfo.username}</h5>
  //     <p class="card-text p-2">HP: ${playerInfo.hit_points}, Att: ${playerInfo.strength}</p>
  //     <!-- collapsable count of monsters defeated -->
  //     <p>
  //       <button class="btn btn-warning" type="button" data-bs-toggle="collapse" data-bs-target="#collapseList" aria-expanded="false" aria-controls="collapseList">
  //         Monsters Defeated: ${playerInfo.monstersDefeated.length}
  //       </button>
  //     </p>
  //     <div class="collapse" id="collapseList">
  //       <!--  Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger. -->
  //       <div class="card card-body bg-secondary"> ${playerInfo.monstersDefeated[i]} </div>
  //     </div>
  //   </div>
  // </div>

  // create the playercard container
  const playerCard = document.createElement("div");
  playerCard.classList = `card bg-dark mt-4`;
  playerCard.setAttribute("style", "width: 100%");

  // create the player card body
  const playerBody = document.createElement("div");
  playerBody.classList = `card-body`;
  playerBody.appendChild(playerCard);

  // create player name/title h5 element, append to body
  const playerName = document.createElement("h5");
  playerName.classList = `card-title ps-3 py-2 bg-success rounded-pill`;
  playerName.textContent = playerObj.username;
  playerBody.appendChild(playerName);

  // create player stats, append to body
  const playerStats = document.createElement("p");
  playerStats.classList = `card-text p-2`;
  playerStats.textContent = `HP: ${playerObj.hit_points}, Att: ${playerObj.strength}`;
  playerBody.appendChild(playerStats);

  // create button/dropdown with monsters defeated tally, dropdown list of monsters defeated
  const playerDefeatedMonsters = document.createElement("button");
  playerDefeatedMonsters.classList = "btn btn-warning";
  playerDefeatedMonsters.setAttribute("type", "button");
  playerDefeatedMonsters.setAttribute("data-bs-toggle", "collapse");
  playerDefeatedMonsters.setAttribute("data-bs-target", "#collapseList");
  playerDefeatedMonsters.setAttribute("aria-expanded", "false");
  playerDefeatedMonsters.setAttribute("aria-controls", "collapseList");
  playerDefeatedMonsters.textContent = `Monsters Defeated: ${playerObj.monstersDefeated.length}`;
  playerBody.appendChild(playerDefeatedMonsters);

  // create each monster defeated summary and append it to the dropdown button of monsters defeated
  const defeatedMonsterList = document.createElement("div");
  defeatedMonsterList.classList = "collapse";
  defeatedMonsterList.setAttribute("id", "collapseList");
  playerObj.monstersDefeated.forEach((element) => {
    const defeatedMonster = document.createElement("div");
    defeatedMonster.classList = "card card-body bg-secondary";
    defeatedMonster.textContent = `${element}`;
    defeatedMonsterList.appendChild(defeatedMonster);
  });
  playerBody.appendChild(defeatedMonsterList);

  playerDispCont.appendChild(playerBody);
}

getCharacter();
getMonsterArr();
