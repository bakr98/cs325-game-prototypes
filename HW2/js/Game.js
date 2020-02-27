"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
    var Cat;
    var cats;
    var cat;
    game.score = 0;
    var timer;
    var total = 30;
    var timerText;
    var score = game.score;
    var scoreText;
    var meow1 = null;
    var meow2 = null;
    var ingame = null;

    
    function killCat(cat, pointer) {

       if(cat.name == 'catspecial'){
           game.score += 19;
           meow2.play();
       }
       else{
            meow1.play();
       }
       cats.remove(cat);
       game.score += 1;
       scoreText = scoreText.setText("Cats Caught: " + game.score);
       meow1.play();

       console.log("KILLED " + game.score);

    }

    function updateCounter() {

        total--;
        timerText = timerText.setText("Time Left: " + total);
        if(total == 0){
            //GAME OVER SCREEN
            console.log("GAME OVER");
            total = 30;
            ingame.stop();
            game.state.start('EndGame', game.score);
        }
        console.log(total);

    
    }
    
    function render() {

        game.debug.text('Time until event: ' + (timer.duration.toFixed(0)), 32, 32);
        game.debug.text('Loop Count: ' + total, 32, 64);
    
    }

    function Cat(game) {

        var x = game.rnd.between(0, 800);
        var y = game.rnd.between(0, 600);
    
        Phaser.Sprite.call(this, game, x, y, 'cat', 17);
    
        game.physics.arcade.enable(this);
    
    };
    
    Cat.prototype = Object.create(Phaser.Sprite.prototype);
    Cat.prototype.constructor = Cat;


    return {
    
        create: function () {
    
            
            game.stage.backgroundColor = '#000';
            ingame = game.add.audio('ingame');
            ingame.loopFull();
            meow1 = game.add.audio('kittenmeow');
            meow2 = game.add.audio('catmeow');
            game.add.sprite(0, 0, 'grass');

            cats = game.add.group();
            for (var i = 0; i < 500; i++)
            {
                if(i%20 == 0){
                    cat = cats.create(game.world.randomX, game.world.randomY+50, 'browncat');
                }
                else if(i%5 == 0 || i%2 == 0){
                    cat = cats.create(game.world.randomX, game.world.randomY+50, 'yellowcat');
                }
                else{
                    cat = cats.create(game.world.randomX, game.world.randomY+50, 'cat');
                }
                cat.name = 'cat' + i;
                if(i%100 == 0){
                    cat = cats.create(game.world.randomX, game.world.randomY+50, 'blackcat');
                    cat.name = 'catspecial';
                }

                cat.inputEnabled = true;

                cat.events.onInputDown.add(killCat, this);

            }

            //  Create our Timer
            timer = game.time.create(false);

            timer.loop(1000, updateCounter, this);
            var style = { font: "25px Tahoma", fill: "#ffffff", align: "center" };
            timerText = game.add.text(700, 10, "Time Left: 30", style );
            timerText.anchor.setTo( 0.5, 0.0 );
            scoreText = game.add.text(20, 10, "Cats Caught: 0", style );

            //  Start the timer running - this is important!
            //  It won't start automatically, allowing you to hook it to button events and the like.
            timer.start();
            
    
        },
    
        update: function () {
    
        }
    };
};
