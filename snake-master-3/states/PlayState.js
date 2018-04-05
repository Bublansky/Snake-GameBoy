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
        cursors = game.input.keyboard.createCursorKeys();
        score = 0;
        point = null;
        addPoint();
        player = [];
        console.log(player.length);
        console.log(player);
        for(var i = 0; i < 4; i++) {
            increaseLength();
        }

        var style = {
            font: "16px Arial",
            fill: "#000",
            align: "center"
        };

        //scoreText = phaser.add.text(10, 10, '', style);
        updateScore();
    },
    update: function() {
        updateMovementPosition();

        if((getTimeStamp() - lastUpdate) < updateSpeed) {
            return;
        }
        if(isColliding(player[0], point)) {
            increaseLength();
            addPoint();
            score++;
            updateScore();
        }
        if(checkCollisionWithSelf()) {
            game.state.start("EndState");
            return;
        }
        lastUpdate = getTimeStamp();

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
        switch(currentMovement) {
            case movement.UP:
                player[0].y -= speed;
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
            this.game.state.start("EndState");
            return;
        }
    }
}
    function addPoint() {
        var widthPoints = game.width/16;
        var heightPoints = game.height/16;
        var x = Math.round(Math.random()*(widthPoints-1))*16;
        var y = Math.round(Math.random()*(heightPoints-1))*16;
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
        console.log('chegou aqui');
        console.log(player.length);
        if(player.length != 0) {
            x = player[player.length-1].x + 8;
            y = player[player.length-1].y + 8;
        }
        var ball = this.game.add.sprite(x, y, 'playerball');
        this.game.physics.arcade.enable(ball);
        player.push(ball);
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
            if(player[0].body.hitTest(player[i].x, player[i].y)) {
                return true;
            }
        }

        return false;
    }

    function checkOutOfBoundry() {
        if(player[0].x > game.width || player[0].x < 0) {
            return true;
        }
        if(player[0].y > game.height || player[0].y < 0) {
            return true;
        }

        return false;
    }