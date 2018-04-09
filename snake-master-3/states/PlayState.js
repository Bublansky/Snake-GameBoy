/**
 * Play state
 *
 * @file			PlayState.js
 * @package			Snake.State
 * @dependencies	jQuery, Phaser
 */
var PlayState = function(game){},
    //phaser = null,
    cursors = null,
    currentMovement = 2,
    player = null,
    point = null,
    score = 0,
    speed = 8,
    updateSpeed = 100,
    lastUpdate = 0,
    scoreText = null,
    movement = {
        'UP' : 1,
        'RIGHT' : 2,
        'DOWN' : 4,
        'LEFT' : 8,
    };

PlayState.prototype = {
    create: function(){
        cursors = game.input.keyboard.createCursorKeys();//
        eatSound = game.add.audio('eat');
        dieSound = game.add.audio('die');
        score = 0;//
        point = null;//
        addPoint();//adiciona o ponto de forma aleatória
        player = [];
        for(var i = 0; i < 4; i++) {
            increaseLength();
        }

        createBoundaries();

        var style = {
            font: "16px Arial",
            fill: "#000",
            align: "center"
        };

        //scoreText = phaser.add.text(10, 10, '', style);
       // updateScore();
    },
    update: function() {
        updateMovementPosition();

        if((getTimeStamp() - lastUpdate) < updateSpeed) {
            return;
        }
        //verifica se a cobra se colidiu com o ponto
        if(isColliding(player[0], point)) {
            eatSound.play();
            increaseLength();
            addPoint();
            score++;
          //  updateScore();
        }
        if(checkCollisionWithSelf()) {
            dieSound.play();
            //2 param -> limpar o mundo, 3 param -> limpar o cache
            game.state.start("EndState",true,false,score);
            return;
        }
        lastUpdate = getTimeStamp();
        //dinamismo para posicao do corpo em relacao com  a cabeça
        var oldX, oldY;
        for(var i = 0; i < player.length; i++) {
            var x = player[i].x;
            var y = player[i].y;
            if(i != 0) {
                player[i].x = oldX;
                player[i].y = oldY;
            }

            oldX = x;
            oldY = y;
        }
        //fazendo o movimento da cobra atraves de iteração das posicoes 
        switch(currentMovement) {
            case movement.UP:
                player[0].y = player[0].y - speed;
            break;
            case movement.RIGHT:
                player[0].x += speed;
            break;
            case movement.DOWN:
                player[0].y += speed;
            break;
            case movement.LEFT:
                player[0].x -= speed;
            break;
        }

        if(checkOutOfBoundry()) {
            //2 param -> limpar o mundo, 3 param -> limpar o cache
            dieSound.play();
            this.game.state.start("EndState",true,false,score);
            return;
        }
    }
}
    function createBoundaries() {
        var boundariesBlock;
        
        for(var i = 0; i < game.width; i++) {
            boundariesBlock = this.game.add.sprite(game.world.centerX, game.world.centerY, 'playerball');
            boundariesBlock.x = i;
            boundariesBlock.y = 0;
        }
        
        for(var i = 0; i < game.height; i++) {
            boundariesBlock = this.game.add.sprite(game.world.centerX, game.world.centerY, 'playerball');
            boundariesBlock.x = 0;
            boundariesBlock.y = i;
        }
        
        for(var i = 0; i < game.width; i++) {
            boundariesBlock = this.game.add.sprite(game.world.centerX, game.world.centerY, 'playerball');
            boundariesBlock.x = i;
            boundariesBlock.y = game.height - boundariesBlock.width;
        }
        
        for(var i = 0; i < game.height; i++) {
            boundariesBlock = this.game.add.sprite(game.world.centerX, game.world.centerY, 'playerball');
            boundariesBlock.x = game.width - boundariesBlock.width;
            boundariesBlock.y = i;
        }
    }
    function addPoint() {
        var widthPoints = game.width/16;
        var heightPoints = game.height/16;
        var x = Math.round(Math.random()*(widthPoints-2))*16 + 8;
        var y = Math.round(Math.random()*(heightPoints-2))*16 + 8;
        if(!point) {
            point = this.game.add.sprite(game.world.centerX, game.world.centerY, 'point');
        }
        point.x = x;
        point.y = y;
    }
    function updateScore() {
        //scoreText.setText('SCORE: ' + score);
    }
    function increaseLength() {
        //var x = 160;
        //var y = 160;
        var x = 80;
        var y = 72;
        if(player.length != 0) {
            x = player[player.length-1].x + 8; // capturando a posicao do eixo x do corpo
            y = player[player.length-1].y + 8; // capturando a posicao do eixo x do corpo
        }
        var ball = this.game.add.sprite(x, y, 'playerball');
        this.game.physics.arcade.enable(ball);
        player.push(ball); //aumentando o corpo
    }

    function updateMovementPosition() {
        if (cursors.up.isDown) {
            if(currentMovement != movement.DOWN) {
                currentMovement = movement.UP;
            }
        }

        if (cursors.right.isDown) {
            if(currentMovement != movement.LEFT) {
                currentMovement = movement.RIGHT;
            }
        }

        if (cursors.down.isDown) {
            if(currentMovement != movement.UP) {
                currentMovement = movement.DOWN;
            }
        }

        if (cursors.left.isDown){
            if(currentMovement != movement.RIGHT) {
                currentMovement = movement.LEFT;
            }
        }
    }
    function getTimeStamp() {
        return new Date().getTime();
    }

    function isColliding(a, b) {
        if(a.body.hitTest(b.x, b.y)) {
            return true;
        }

        return false;
    }

    function checkCollisionWithSelf() {
        for(var i = 1; i < player.length; i++) {
            if(player[0].body.hitTest(player[i].x, player[i].y)) { //verifica se a cabeça está dentro do corpo, especificamente na parte player[i]
                return true;
            }
        }

        return false;
    }

    function checkOutOfBoundry() {
        var min = (8);
		var max = (8+4);
		
        if(player[0].x > game.width - max || player[0].x < min) {
            return true;
        }
        if(player[0].y > game.height - max || player[0].y < min) {
            return true;
        }

        return false;
		/*
		if(player[0].x > game.width || player[0].x < 0) {
            return true;
        }
        if(player[0].y > game.height || player[0].y < 0) {
            return true;
        }

        return false;
		*/
    }