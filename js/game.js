class Game {
  constructor() {
    this.background = new Background();
    this.timer = new Timer();
    this.obstacles = new Obstacles();
    this.player = new Player();
    this.enemy = new Enemy();
    this.interactable = new Interactable();
    this.ui = new Ui();
    this.isWindowTouched = false;
    this.isWindowClosed = false;
  }

  preload() {
    this.backgroundImage = loadImage('assets/background/bg-room.png');
    this.playerImage = loadImage('assets/player/player.png');
    this.enemyImage = loadImage('assets/enemy/enemy.png');

    // load ui
    this.startScreenImage = loadImage('assets/ui/screen-start.png');
    this.gameOverImage = loadImage('assets/ui/screen-lose.png');
    this.winImage = loadImage('assets/ui/screen-win.png');
    this.buttonImage = loadImage('assets/ui/button-bg.png');

    // interactable(s)
    this.windowOpenImageLayer0 = loadImage('assets/interactables/window-open.png');
    this.windowOpenImageLayer1 = loadImage('assets/interactables/window-open-frame.png');
    this.windowClosedImage = loadImage('assets/interactables/window-closed.png');

    // load music
    this.music = loadSound('assets/music/day-15.mp3');
    this.gameOverSound = loadSound('assets/music/game-over-sound.wav');
    this.winSound = loadSound('assets/music/win-sound.wav');
  }

  setup() {
    this.music.play();
  }
  
  draw() {
    clear();
    this.background.draw();
    this.obstacles.draw();
    this.timer.draw();
    this.player.draw();

    this.timer.enemyAppear(this.enemy);
    
    this.windowCollision(this.player);
    if(this.isWindowClosed) {
      this.windowOpenImageLayer1.resize(0,0);
      image(this.windowClosedImage, this.interactable.x, this.interactable.y, this.interactable.windowOpenWidth, this.interactable.windowOpenHeight);
    } else {
      this.windowOpen();
    }
  }

  // made separate collision classes for interactacles
  windowCollision(playerInfo) {
    let windowX = this.interactable.x + this.interactable.windowOpenWidth;
    let windowY = this.interactable.y + this.interactable.windowOpenHeight;
    // get the middle of the player
    let playerX = playerInfo.x + playerInfo.width / 2;
    let playerY = playerInfo.y + playerInfo.height / 2;

    if (dist(windowX, windowY, playerX, playerY) > 25) {
      this.isWindowTouched = false;
    } else {
        // here we have a collision
        this.isWindowTouched = true;
    }
  }

  windowOpen() {
    this.interactable.openWindowOutsideDisplay();
    setTimeout(this.interactable.openWindowFrameDisplay(), 2000);
    this.windowOpenImageLayer1.resize(this.interactable.windowOpenWidth, this.interactable.windowOpenHeight);
    this.windowOpenImageLayer0.resize(this.interactable.windowOpenWidth, this.interactable.windowOpenHeight);
    this.windowClosedImage.resize(0, 0);
  } 

  gameOver() {
    this.ui.gameOver();
    this.gameOverSound.play();
    noLoop();
  }

  winState() {
    this.ui.win();
    this.winSound.play();
    noLoop();
  }
}
