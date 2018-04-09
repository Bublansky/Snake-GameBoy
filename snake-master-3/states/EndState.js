var EndState = function(game) {};

EndState.prototype = {
    preload: function(){scoreText = null;},
    init: function(score){},
    addMenuOption: function(text, callback) {
        var optionStyle = { font: '12pt Early-GameBoy', fill: 'white', align: 'center'};
        var txt = game.add.text(game.world.centerX, ((game.world.centerY)+30), text, optionStyle);
        txt.anchor.setTo(0.5);
        txt.stroke = "";
        txt.strokeThickness = 10;
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
        txt.inputEnabled = true;
        txt.events.onInputUp.add(callback, this);
        txt.events.onInputOver.add(onOver, this);
        txt.events.onInputOut.add(onOut, this);
    },
    create: function(){
        var titleSytle = {font: '12pt Early-GameBoy',fill: 'white', align: 'center'},
            title = game.add.text(game.world.centerX,20,"GAME OVER!",titleSytle); 
        title.anchor.set(0.5);

        scoreText = game.add.text(game.world.centerX-70, ((game.world.centerY)-20),'',titleSytle);
        scoreText.setText('SCORE: ' + score);

        this.addMenuOption('Play Again',function(e) {
            game.state.start('PlayState');
        });
    },
}