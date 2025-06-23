let starsCollected = 0;
let timer = 60;
let gameOver = false;

AFRAME.registerComponent('collectible', {
  init: function () {
    this.el.setAttribute('geometry', { primitive: 'sphere', radius: 0.5 });
    this.el.setAttribute('material', { color: 'yellow' });

    this.tick = () => {
      if (gameOver) return;
      const player = document.querySelector('#player');
      const playerPos = player.object3D.position;
      const starPos = this.el.object3D.position;
      const distance = playerPos.distanceTo(starPos);

      if (distance < 1.5) {
        this.el.parentNode.removeChild(this.el);
        starsCollected++;

        // Update score text
        document.querySelector('#scoreText').setAttribute('text', 'value', `Stars: ${starsCollected}/5`);

        if (starsCollected === 5) {
          endGame(true);
        }
      }
    };
  }
});

// Timer logic
setInterval(() => {
  if (gameOver) return;

  timer--;
  document.querySelector('#timerText').setAttribute('text', 'value', `Time: ${timer}`);

  if (timer <= 0) {
    endGame(false);
  }
}, 1000);

function endGame(won) {
  gameOver = true;
  const text = document.querySelector('#endText');
  if (won) {
    text.setAttribute('text', 'value', 'You WON! 🌟');
  } else {
    text.setAttribute('text', 'value', 'Time\'s up! You LOST 😢');
  }
}
