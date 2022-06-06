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
    // c
    fetch(`/api/users/${characterId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
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

module.exports = fight;
