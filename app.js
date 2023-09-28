function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
 data() {
  return {
    playerHealth: 100,
    monsterHealth: 100,
    round: 0,
    battleLog: [],
  }
 },
 computed: {
  monsterBarStyle() {
    return {
      width: this.monsterHealth + '%',
    }
  },
  playerBarStyle() {
    return {
      width: this.playerHealth + '%',
    }
  },
  specialAttackAvailable() {
    return this.round % 3 !== 0;
  },
  healAvailable() {
    return this.playerHealth == 100;
  },
  gameOn() {
    return this.playerHealth > 0 && this.monsterHealth > 0;
  },
  gameWin() {
    return this.playerHealth > 0 && this.monsterHealth == 0;
  },
  gameOver() {
    return this.playerHealth == 0;
  },
  gameDraw() {
    return this.playerHealth == 0 && this.monsterHealth == 0;
  }
 },
 methods: {
  attackMonster() {
    this.round++;
    const damage = getRandomValue(5, 15);
    if (this.monsterHealth - damage < 0) {
      this.monsterHealth = 0;
    } else {
      this.monsterHealth -= damage;
    }
    this.addLogMessage('player', 'attack', damage);
    this.attackPlayer();
  },
  attackPlayer() {
    const damage = getRandomValue(7, 20);
    if (this.playerHealth - damage < 0) {
      this.playerHealth = 0;
    } else {
      this.playerHealth -= damage; 
    }
    this.addLogMessage('monster', 'attack', damage);
  },
  specialAttack() {
    this.round++;
    const damage = getRandomValue(10, 25);
    if (this.monsterHealth - damage < 0) {
      this.monsterHealth = 0;
    } else {
      this.monsterHealth -= damage;
    }
    this.addLogMessage('player', 'attack', damage);
    this.attackPlayer();
  },
  heal() {
    this.round++;
    const heal = getRandomValue(10, 20);
    if (this.playerHealth + heal > 100) {
      this.playerHealth = 100;
    } else {
      this.playerHealth += heal;
    }
    this.addLogMessage('player', 'heal', heal);
    this.attackPlayer();
  },
  surrender() {
    this.battleLog.unshift("The player surrenders.");
    this.playerHealth = 0;
  },
  addLogMessage(who, what, value) {
    this.battleLog.unshift({
      actionBy: who,
      actionType: what,
      actionValue: value
    })

  },
  resetGame() {
    location.reload();
  }

 }
});

app.mount("#game");