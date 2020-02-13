"use strict";

function make_main_game_state( game )
{
    function preload() {
        // Load an image and call it 'logo'.
    
        game.load.image( 'bg', 'assets/background.png' );
        game.load.image( 'blackhole', 'assets/blackhole.png' );
        game.load.image( 'blackholeblue', 'assets/blackholeblue.png' );
        game.load.image( 'star', 'assets/star.png' );
        game.load.image( 'plane', 'assets/fly.png' );
        game.load.audio('bgmusic', ['assets/music1.ogg']);

    }
    
    var bouncy;
    var stars;
    var star1;
    var star2;
    var star3;
    var star4;
    var star5;
    var star6;
    var star7;
    var star8;
    var star9;
    var star10;
    var bhenemy1;
    var bhenemy2;
    var scoreText;
    var music;

    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        game.add.tileSprite(0, 0, 1000, 600, 'bg');
        music = game.add.audio('bgmusic');
        music.loopFull();
        bouncy = game.add.sprite(game.world.centerX, game.world.centerY, 'blackhole' );
            //  The baddies!
        stars = game.add.group();
        stars.enableBody = true;
        stars.physicsBodyType = Phaser.Physics.ARCADE;

        //createStars();
        star1 = game.add.sprite(10, 10 , 'star' );
        star1.enableBody = true;
        star1.physicsBodyType = Phaser.Physics.ARCADE;
        star2 = game.add.sprite(100, 100, 'star' );
        star3 = game.add.sprite(100, 100, 'star' );
        star4 = game.add.sprite(500, 500, 'star' );
        star5 = game.add.sprite(300, 100, 'star' );
        star6 = game.add.sprite(444, 333, 'star' );
        star7 = game.add.sprite(222, 300, 'star' );
        star8 = game.add.sprite(111, 400, 'star' );
        star9 = game.add.sprite(200, 444, 'star' );
        star10 = game.add.sprite(666, 200, 'star' );
        star9 = game.add.sprite(200, 444, 'star' );
        star10 = game.add.sprite(666, 200, 'star' );
        bhenemy1 =  game.add.sprite(0, 0, 'blackholeblue' );
        
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        /*star1.scale.setTo(1,1);
        star2.scale.setTo(1,1);
        star3.scale.setTo(1,1);
        star4.scale.setTo(1,1);
        star5.scale.setTo(1,1);
        star6.scale.setTo(1,1);
        star7.scale.setTo(1,1);
        star8.scale.setTo(1,1);
        star9.scale.setTo(1,1);
        star10.scale.setTo(1,1);*/


        bouncy.scale.setTo(1, 1);
        bouncy.anchor.setTo( 0.5, 0.5 );
        bhenemy1.anchor.setTo(0,0);
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( star1, Phaser.Physics.ARCADE );
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        game.physics.enable( bhenemy1, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        game.world.wrap(bouncy.body); //Wraps everything inside of the bounds
        game.world.wrap(bhenemy1.body); 
        bouncy.body.collideWorldBounds = false;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 10, "Eat the of the stars without being eaten!", style );
        text.anchor.setTo( 0.5, 0.0 );
    
    
        scoreText = game.add.text(16,10, 'Score: 0', style);
    
        game.physics.add.collider(bouncy, bhenemy1);

        game.physics.add.overlap(bouncy, star1, collectStar, null, this);
        game.physics.add.overlap(bouncy, star2, collectStar, null, this);
        game.physics.add.overlap(bouncy, star3, collectStar, null, this);
        game.physics.add.overlap(bouncy, star4, collectStar, null, this);
        game.physics.add.overlap(bouncy, star5, collectStar, null, this);
        game.physics.add.overlap(bouncy, star6, collectStar, null, this);
        game.physics.add.overlap(bouncy, star7, collectStar, null, this);
        game.physics.add.overlap(bouncy, star8, collectStar, null, this);
        game.physics.add.overlap(bouncy, star9, collectStar, null, this);
        game.physics.add.overlap(bouncy, star10, collectStar, null, this);
        
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
    }


    
    return { "preload": preload, "create": create, "update": update };
}

function collectStar1 (bouncy, star1)
{
    star1.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);
}
function collectStar2 (bouncy, star2)
{
    star1.disableBody(true, true);

    score += 15;
    scoreText.setText('Score: ' + score);
}
/*function createStars () {

    for (var y = 0; y < 4; y++)
    {
        for (var x = 0; x < 10; x++)
        {
            var star = game.stars.create(x * 48, y * 50, 'star');
            star.anchor.setTo(0.5, 0.5);
            star.animations.add('fly', [ 0, 1, 2, 3 ], 20, true);
            star.play('fly');
            star.body.moves = true;
        }
    }

    star.x = 100;
    star.y = 50;

    //  All this does is basically start the invaders moving. Notice we're moving the Group they belong to, rather than the invaders directly.
    var tween = game.add.tween(aliens).to( { x: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    //  When the tween loops it calls descend
    tween.onLoop.add(descend, this);
}*/


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
    
    game.state.add( "main", make_main_game_state( game ) );
    
    game.state.start( "main" );
};
