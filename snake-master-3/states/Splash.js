var Splash = function () {};
    
Splash.prototype = {
   
    
  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('PlayState','states/PlayState.js');
    game.load.script('EndState','states/EndState.js');
  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['Early-GameBoy'],
        urls: ['assets/fonts/font-sytle.css']
      }
    }
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '13pt Early-GameBoy', fill: '#336600', align: 'center', stroke: '', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (game.world.centerY+10), text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "black";
      target.stroke = "";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "#336600";
      target.stroke = "";
      txt.useHandCursor = false;
    };
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);
  },
  init: function(){},

  preload: function () {
		this.game.load.image('point', 'assets/imgs/point-2.png');
		this.game.load.image('playerball', 'assets/imgs/player-ball-2.png');
  
    this.loadScripts();
    this.loadFonts();
  },

  addGameStates: function () {
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
    this.addGameStates();
    //this.addGameMusic();
    game.stage.disableVisibilityChange = true;
    game.stage.backgroundColor = '#88cc00';
    //'#99cc00'
    var titleSytle = {font: '12pt Early-GameBoy',fill: '#336600', align: 'center'},
        title = game.add.text(game.world.centerX,20,"SNAKE BOY",titleSytle); 
    title.anchor.set(0.5);
    this.addMenuOption('Play', function () {
      //music.stop();
      game.state.start("PlayState");
    });
  }
};
