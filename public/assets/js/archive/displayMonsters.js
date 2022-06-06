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

module.exports = displayMonsters;
