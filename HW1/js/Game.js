"use strict";
var starsleft = 40;
var winner;
var starsText;

function make_main_game_state( game, shared )
{
    function preload() {
    
        game.load.image( 'bg', 'assets/background.png' );
        game.load.image( 'blackhole', 'assets/phaser.png' );
        game.load.image( 'blackholeblue', 'assets/phaser.png' );
        game.load.image( 'star', 'assets/phaser.png' );
        game.load.audio('bgmusic', ['assets/Poppers and Prosecco.mp3']);

    }
    
    var player;
    var Star;
    var group;
    var bhenemy1;
    var music;

    function Star(game) {

        var x = game.rnd.between(100, 770);
        var y = game.rnd.between(0, 570);
    
        Phaser.Sprite.call(this, game, x, y, 'star', 17);
    
        game.physics.arcade.enable(this);
    
    };
    
    Star.prototype = Object.create(Phaser.Sprite.prototype);
    Star.prototype.constructor = Star;

    function create() {
        
        game.add.tileSprite(0, 0, 1000, 600, 'bg');
        music = game.add.audio('bgmusic');
        music.loopFull();
        
        player = game.add.sprite(game.world.centerX, game.world.centerY, 'blackhole' );
        group = game.add.group();
        for (var i = 0; i < 40; i++)
        {
            group.add(new Star(game));
            game.starsleft += 1;
            console.log("H" + game.starsleft);
        }

       
        var rand = 100*Math.random()

        if (i < 50) {
                
                bhenemy1 =  game.add.sprite(700, 500, 'blackholeblue' );
                bhenemy1.anchor.setTo(0,0);
                game.physics.enable( bhenemy1, Phaser.Physics.ARCADE );
        }
        
        player.scale.setTo(1, 1);
        player.anchor.setTo( 0.5, 0.5 );
        
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( player, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        game.world.wrap(player.body); //Wraps everything inside of the bounds
        player.body.collideWorldBounds = false;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 10, "Eat the stars without being eaten!", style );
        text.anchor.setTo( 0.5, 0.0 );
        starsText = game.add.text( 16, 555, "Stars Eaten: 0", style );
        winner = game.add.text(game.world.centerX, game.world.centerY, " ", style );
    
        
    }
    
    function update() {
        game.physics.arcade.overlap(player, group, collisionHandler, null, this);

        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        player.rotation = game.physics.arcade.accelerateToPointer( player, game.input.activePointer, 500, 500, 500 );
    }


    
    return { "preload": preload, "create": create, "update": update };
}

function collisionHandler (player, star) {

    star.kill();
    starsleft -=1;
    starsText = starsText.setText("Stars Left: " + starsleft);
    if(starsleft == 0){
        winner = winner.setText("YOU WIN!!");
    };
}

window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
	var shared = {};

	game.state.add( 'Boot', GameStates.makeBoot( game ) );
	game.state.add( 'Preloader', GameStates.makePreloader( game ) );
	game.state.add( 'MainMenu', GameStates.makeMainMenu( game, shared ) );
	game.state.add( 'Game', GameStates.makeGame( game, shared ) );

	//	Now start the Boot state.
	game.state.start('Boot');
};


/*"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    
    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Create a sprite at the center of the screen using the 'logo' image.
            bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            bouncy.anchor.setTo( 0.5, 0.5 );
            
            // Turn on the arcade physics engine for this sprite.
            game.physics.enable( bouncy, Phaser.Physics.ARCADE );
            // Make it bounce off of the world bounds.
            bouncy.body.collideWorldBounds = true;
            
            // Add some text using a CSS style.
            // Center it in X, and position its top 15 pixels from the top of the world.
            var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
            var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
            text.anchor.setTo( 0.5, 0.0 );
            
            // When you click on the sprite, you go back to the MainMenu.
            bouncy.inputEnabled = true;
            bouncy.events.onInputDown.add( function() { quitGame(); }, this );
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Accelerate the 'logo' sprite towards the cursor,
            // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
            // in X or Y.
            // This function returns the rotation angle that makes it visually match its
            // new trajectory.
            bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
        }
    };
};
*/