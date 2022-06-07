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
