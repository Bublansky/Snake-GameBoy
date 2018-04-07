var Splash = function () {};
    
Splash.prototype = {
   
    
  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('PlayState','states/PlayState.js');
    game.load.script('EndState','states/EndState.js');
    //game.load.script('gamemenu','states/GameMenu.js');
    //game.load.script('game', 'states/Game.js');
    
    //game.load.script('gameover','states/GameOver.js');
    //game.load.script('Wins','states/Wins.js');
    //game.load.script('credits', 'states/Credits.js');
    //game.load.script('options', 'states/Options.js');
   
    
  },

  //loadBgm: function () {
    // thanks Kevin Macleod at http://incompetech.com/
    //game.load.audio('dangerous', 'assets/audio/Dangerous.mp3');
    //game.load.audio('exit', 'assets/audio/Exit the Premises.mp3');
  //},
  // varios freebies found from google image search
  //loadImages: function () {
    //game.load.image('space-bg', 'assets/images/mario_menu_bg.png');
	//game.load.image('space-bg', 'assets/images/space-bg.jpg');
    //game.load.image('menu-bg', 'assets/images/space-bg.png');
    //game.load.image('options-bg', 'assets/images/options-bg.jpg');
    //game.load.image('gameover-bg', 'assets/images/mario-game-over-2.png');
  //},

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['Early-GameBoy'],
        urls: ['assets/fonts/font-sytle.css']
      }
    }
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '15pt Early-GameBoy', fill: 'white', align: 'center', stroke: '', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, game.world.centerY, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "black";
      target.stroke = "";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);
  },


  //init: function () {
    //this.loadingBar = game.make.sprite(game.world.centerX-(387/2), 400, "loading");
    //this.logo       = game.make.sprite(game.world.centerX, 200, 'brand');
    //this.status     = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
    //utils.centerGameObjects([this.logo, this.status]);
  //},
  init: function(){
  },

  preload: function () {
    //this.game.load.image('gameover', 'gfx/gameover-2.png');
		this.game.load.image('point', 'assets/imgs/point-2.png');
		this.game.load.image('playerball', 'assets/imgs/player-ball-2.png');
		//this.game.load.image('play', 'gfx/play-3.png');
   

    this.loadScripts();
    //this.loadImages();
    this.loadFonts();
    //this.loadBgm();

  },

  addGameStates: function () {
    //game.state.add("Wins",Wins);
    //game.state.add("GameMenu",GameMenu);
    //game.state.add("Game",Game);
    //game.state.add("GameOver",GameOver);
    //game.state.add("Credits",Credits);
    //game.state.add("Options",Options);
    game.state.add("PlayState",PlayState);
    game.state.add("EndState",EndState);
   
  },

  /*addGameMusic: function () {
    music = game.add.audio('dangerous');
    music.loop = true;
    music.play();
  },
  */
  create: function() {
    //this.status.setText('Ready!');
    this.addGameStates();
    //this.addGameMusic();

    //setTimeout(function () {
     // game.state.start("GameMenu");
    //}, 1000);
    game.stage.disableVisibilityChange = true;
    game.stage.backgroundColor = '#99cc00'
    this.addMenuOption('Play', function () {
      //music.stop();
      game.state.start("PlayState");
    });
  }
};
