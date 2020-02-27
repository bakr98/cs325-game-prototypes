"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
    var Cat;
    var cats;
    var cat;
    game.score = 0;
    var timer;
    var total = 5;
    var timerText;
    var score = game.score;
    var scoreText;
    var meow1 = null;
    var meow2 = null;

    
    function killCat(cat, pointer) {


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
            game.state.start('EndGame', game.score);
        }
        console.log(total);

    
    }
    
    function render() {

        game.debug.text('Time until event: ' + (timer.duration.toFixed(0)), 32, 32);
        game.debug.text('Loop Count: ' + total, 32, 64);
    
    }
    /*function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }*/

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
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Create a sprite at the center of the screen using the 'logo' image.
            game.stage.backgroundColor = '#000';
            meow1 = game.add.audio('kittenmeow');
            meow2 = game.add.audio('catmeow');
            //bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'cat' );
            cats = game.add.group();
            for (var i = 0; i < 100; i++)
            {
                cat = cats.create(game.world.randomX, game.world.randomY, 'cat');
                cat.name = 'cat' + i;

                cat.inputEnabled = true;

                cat.events.onInputDown.add(killCat, this);
                //game.starsleft += 1;
                //console.log("H" + game.starsleft);
            }

                //  Create our Timer
            timer = game.time.create(false);

            //  Set a TimerEvent to occur after 2 seconds
            timer.loop(1000, updateCounter, this);
            var style = { font: "25px Verdana", fill: "#cc0000", align: "center" };
            timerText = game.add.text(game.world.centerX, 10, "Time Left: 30", style );
            timerText.anchor.setTo( 0.5, 0.0 );
            scoreText = game.add.text(10, 10, "Cats Caught: 0", style );

            //  Start the timer running - this is important!
            //  It won't start automatically, allowing you to hook it to button events and the like.
            timer.start();
            /*for (var i = 0; i < 20; i++)
            {
                var tempSprite = game.add.sprite(game.world.randomX, game.world.randomY, 'cat');
                tempSprite.inputEnabled = true;
                //tempSprite.input.enableDrag(false, true);
                //tempSprite.events.onInputDown.add(function(s){console.log('clicked',s.name,s.renderOrderID)});
                tempSprite.events.onInputDown.add(killCat, this);
            }*?


            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            //bouncy.anchor.setTo( 0.5, 0.5 );
            
            // Turn on the arcade physics engine for this sprite.
            //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
            // Make it bounce off of the world bounds.
            //bouncy.body.collideWorldBounds = true;
            
            // Add some text using a CSS style.
            // Center it in X, and position its top 15 pixels from the top of the world.
            var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            var text = game.add.text( game.world.centerX, 15, "Meow.", style );
            text.anchor.setTo( 0.5, 0.0 );
            
            /*cats.inputEnableChildren = true;
            cats.onChildInputDown.add(killCat, this);*/
            //cat.events.onInputDown.add( function() { killCat(cat); }, this );
            // When you click on the sprite, you go back to the MainMenu.
            //bouncy.inputEnabled = true;
            //bouncy.events.onInputDown.add( function() { quitGame(); }, this );
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Accelerate the 'logo' sprite towards the cursor,
            // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
            // in X or Y.
            // This function returns the rotation angle that makes it visually match its
            // new trajectory.
            //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
        }
    };
};
