"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
    var Cat;
    var cats;
    
    /*function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }*/

    function Cat(game) {

        var x = game.rnd.between(100, 770);
        var y = game.rnd.between(0, 570);
    
        Phaser.Sprite.call(this, game, x, y, 'cat', 17);
    
        game.physics.arcade.enable(this);
    
    };
    
    Cat.prototype = Object.create(Phaser.Sprite.prototype);
    Cat.prototype.constructor = Cat;
    
    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Create a sprite at the center of the screen using the 'logo' image.
            //bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'cat' );
            cats = game.add.group();
            for (var i = 0; i < 100; i++)
            {
                cats.add(new Cat(game));
                //game.starsleft += 1;
                //console.log("H" + game.starsleft);
            }
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
