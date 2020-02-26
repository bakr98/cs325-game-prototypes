/*var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload () {

    game.load.image('player', 'assets/phaser.png');
    game.load.image('star', 'assets/cloud.png');
    game.load.image('baddie', 'assets/evilcloud.png');

}

var stars;
var baddies;
//var lazers;
var player;
var cursors;
var fireButton;
var bulletTime = 0;
var frameTime = 0;
var frames;
var prevCamX = 0;

function create () {

    game.world.setBounds(0, 0, 800*4, 600);

    frames = Phaser.Animation.generateFrameNames('frame', 2, 30, '', 2);
    frames.unshift('frame02');

    stars = game.add.group();

    for (var i = 0; i < 128; i++)
    {
        stars.create(game.world.randomX, game.world.randomY, 'star');
    }

    baddies = game.add.group();

    for (var i = 0; i < 16; i++)
    {
        baddies.create(game.world.randomX, game.world.randomY, 'baddie');
    }

    //lazers = game.add.group();

    player = game.add.sprite(100, 300, 'player');
    player.anchor.x = 0.5;

    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1);

    cursors = game.input.keyboard.createCursorKeys();
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    prevCamX = game.camera.x;

}

function update () {

    if (cursors.left.isDown)
    {
        player.x -= 8;
        player.scale.x = -1;
    }
    else if (cursors.right.isDown)
    {
        player.x += 8;
        player.scale.x = 1;
    }

    if (cursors.up.isDown)
    {
        player.y -= 8;
    }
    else if (cursors.down.isDown)
    {
        player.y += 8;
    }

    if (fireButton.isDown)
    {
        fireBullet();
    }

    //.forEachAlive(updateBullets, this);

    prevCamX = game.camera.x;

}

function updateBullets (lazer) {

    // if (game.time.now > frameTime)
    // {
    //     frameTime = game.time.now + 500;
    // }
    // else
    // {
    //     return;
    // }

    //  Adjust for camera scrolling
    var camDelta = game.camera.x - prevCamX;
    lazer.x += camDelta;

    if (lazer.animations.frameName !== 'frame30')
    {
        lazer.animations.next();
    }
    else
    {
        if (lazer.scale.x === 1)
        {
            lazer.x += 16;

            if (lazer.x > (game.camera.view.right - 224))
            {
                lazer.kill();
            }
        }
        else
        {
            lazer.x -= 16;

            if (lazer.x < (game.camera.view.left - 224))
            {
                lazer.kill();
            }
        }
    }

}

function fireBullet () {

    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        //lazer = lazers.getFirstDead(true, player.x + 24 * player.scale.x, player.y + 8, 'lazer');

        //lazer.animations.add('fire', frames, 60);
        //lazer.animations.frameName = 'frame02';

        //lazer.scale.x = player.scale.x;

        /*if (lazer.scale.x === 1)
        {
            // lazer.anchor.x = 1;
        }
        else
        {
            // lazer.anchor.x = 0;
        }*/

        //  Lazers start out with a width of 96 and expand over time
        // lazer.crop(new Phaser.Rectangle(244-96, 0, 96, 2), true);

        //bulletTime = game.time.now + 250;
    //}

//}


var config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'impact',
        impact: {
            setBounds: {
                x: 0,
                y: 0,
                width: 20000,
                height: 600,
                thickness: 32
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
        extend: {
            minimap: null,
            player: null,
            cursors: null,
            thrust: null,
            flares: null,
            bullets: null,
            lastFired: 0,
            text: null,
            createBulletEmitter: createBulletEmitter,
            createStarfield: createStarfield,
            createLandscape: createLandscape,
            createAliens: createAliens,
            createThrustEmitter: createThrustEmitter
        }
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('star', 'assets/cloud.png');
    this.load.image('bigStar', 'assets/cloud.png');
    this.load.image('ship', 'assets/phaser.png');
    this.load.image('bullet', 'assets/bullet6.png');
    this.load.image('jets', 'assets/bullet6.png');
    this.load.image('flares', 'assets/bullet6.png');
    this.load.spritesheet('face', 'assets/evilcloud.png', { frameWidth: 78, frameHeight: 92 });
}

function create ()
{
    var Bullet = new Phaser.Class({

        Extends: Phaser.GameObjects.Image,

        initialize:

        function Bullet (scene)
        {
            Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

            this.speed = 0;
            this.born = 0;
        },

        fire: function (player)
        {
            this.setPosition(player.x, player.y);

            if (player.flipX)
            {
                //  Facing left
                this.speed = Phaser.Math.GetSpeed(-1000 + player.vel.x, 1);
            }
            else
            {
                //  Facing right
                this.speed = Phaser.Math.GetSpeed(1000 + player.vel.x, 1);
            }

            this.born = 0;
        },

        update: function (time, delta)
        {
            this.x += this.speed * delta;

            this.born += delta;

            if (this.born > 1000)
            {
                this.setActive(false);
                this.setVisible(false);
            }
        }

    });

    //  The world is 3200 x 600 in size
    this.cameras.main.setBounds(0, 0, 20000, 600);

    //  The miniCam is 400px wide, so can display the whole world at a zoom of 0.2
    // this.minimap = this.cameras.add(200, 10, 400, 100).setZoom(0.2);
    // this.minimap.setBackgroundColor(0x002244);
    // this.minimap.scrollX = 1600;
    // this.minimap.scrollY = 300;

    this.createStarfield();
    this.createLandscape();
    this.createAliens();
    this.createThrustEmitter();
    this.createBulletEmitter();

    //  Bullets

    this.bullets = this.add.group({ classType: Bullet, runChildUpdate: true });

    //  Add a player ship

    this.player = this.impact.add.sprite(200, 600, 'ship').setDepth(1);
    this.player.setMaxVelocity(1000).setFriction(800, 600).setPassiveCollision();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' }).setDepth(1).setScrollFactor(0);
}

function update (time, delta)
{
    this.thrust.setPosition(this.player.x, this.player.y);

    if (this.cursors.left.isDown)
    {
        this.player.setAccelerationX(-800);
        this.player.flipX = true;
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setAccelerationX(800);
        this.player.flipX = false;
    }
    else
    {
        this.player.setAccelerationX(0);
    }

    if (this.cursors.up.isDown)
    {
        if(this.player.y == 590.5 && (this.player.vel.x > 800 || this.player.vel.x < -800)){
            this.player.setAccelerationY(-500);
        }
        else if(this.player.y <590.5){
            this.player.setAccelerationY(-500);
        }
        else{
            //No liftoff
        }
    }
    else if (this.cursors.down.isDown)
    {
        this.player.setAccelerationY(800);
    }
    else
    {
        this.player.setAccelerationY(0);
    }

    if (this.player.vel.x < 0)
    {
        this.thrust.setPosition(this.thrust.x.propertyValue += (this.player.flipX) ? 16 : -16, this.thrust.y.propertyValue);
        this.thrust.setSpeed(this.player.vel.x / 2);
        this.thrust.emitParticle(16);
    }
    else if (this.player.vel.x > 0)
    {
        this.thrust.setPosition(this.thrust.x.propertyValue += (this.player.flipX) ? 16 : -16, this.thrust.y.propertyValue);
        this.thrust.setSpeed(this.player.vel.x / 2);
        this.thrust.emitParticle(16);
    }

    if (this.cursors.space.isDown && time > this.lastFired)
    {
        var bullet = this.bullets.get();
        bullet.setActive(true);
        bullet.setVisible(true);

        if (bullet)
        {
            bullet.fire(this.player);

            this.lastFired = time + 100;
        }
    }

    //  Emitters to bullets

    this.bullets.children.each(function(b) {
        if (b.active)
        {
            this.flares.setPosition(b.x, b.y);
            this.flares.setSpeed(b.speed + 500 * -1);
            this.flares.emitParticle(1);
        }
    }, this);

    if(this.player.vel.x > 800 && this.player.y == 0){
        this.text.setText("TAKE OFF!");
    }
    else{
        this.text.setText(this.player.vel.x + " HEIGHT:  " + this.player.y);
    }

    //  Position the center of the camera on the player
    //  We -400 because the camera width is 800px and
    //  we want the center of the camera on the player, not the left-hand side of it
    this.cameras.main.scrollX = this.player.x - 400;

    //  And this camera is 400px wide, so -200
    // this.minimap.scrollX = Phaser.Math.Clamp(this.player.x - 200, 800, 2000);
}

function createBulletEmitter ()
{
    this.flares = this.add.particles('flares').createEmitter({
        x: 1600,
        y: 200,
        angle: { min: 170, max: 190 },
        scale: { start: 0.4, end: 0.2 },
        blendMode: 'ADD',
        lifespan: 500,
        on: false
    });
}

function createThrustEmitter ()
{
    this.thrust = this.add.particles('jets').createEmitter({
        x: 1600,
        y: 200,
        angle: { min: 160, max: 200 },
        scale: { start: 0.2, end: 0 },
        blendMode: 'ADD',
        lifespan: 600,
        on: false
    });
}

function createStarfield ()
{
    //  Starfield background

    //  Note the scrollFactor values which give them their 'parallax' effect

    var group = this.add.group({ key: 'star', frameQuantity: 256 });

    group.createMultiple({ key: 'bigStar', frameQuantity: 32 });

    var rect = new Phaser.Geom.Rectangle(0, 0, 20000, 550);

    Phaser.Actions.RandomRectangle(group.getChildren(), rect);

    group.children.iterate(function (child, index) {

        var sf = Math.max(0.3, Math.random());

        if (child.texture.key === 'bigStar')
        {
            sf = 0.2;
        }

        child.setScrollFactor(sf);

        // this.minimap.ignore(child);

    }, this);
}

function createLandscape ()
{
    //  Draw a random 'landscape'

    var landscape = this.add.graphics();

    landscape.fillStyle(0x008800, 1);
    landscape.lineStyle(2, 0x00ff00, 1);

    landscape.beginPath();

    var maxY = 550;
    var minY = 400;

    var x = 0;
    var y = maxY;
    var range = 0;

    var up = true;

    landscape.moveTo(0, 600);
    landscape.lineTo(0, 550);

    do
    {
        //  How large is this 'side' of the mountain?
        range = Phaser.Math.Between(20, 100);

        if (up)
        {
            y = Phaser.Math.Between(y, minY);
            up = false;
        }
        else
        {
            y = Phaser.Math.Between(y, maxY);
            up = true;
        }

        landscape.lineTo(x + range, y);

        x += range;

    } while (x < 3100);

    landscape.lineTo(20000, maxY);
    landscape.lineTo(20000, 600);
    landscape.closePath();

    landscape.strokePath();
    landscape.fillPath();
}

function createAliens ()
{
    //  Create some random aliens moving slowly around

    var config = {
        key: 'metaleyes',
        frames: this.anims.generateFrameNumbers('face', { start: 0, end: 4 }),
        frameRate: 20,
        repeat: -1
    };

    this.anims.create(config);

    for (var i = 0; i < 200; i++)
    {
        //var x = Phaser.Math.Between(100, 3100);
        var x = Phaser.Math.Between(100, 20000);
        var y = Phaser.Math.Between(100, 400);

        var face = this.impact.add.sprite(x, y, 'face').play('metaleyes');

        face.setLiteCollision().setBounce(1).setBodyScale(0.5);
        //face.setVelocity(Phaser.Math.Between(20, 60), Phaser.Math.Between(20, 60));
        face.setVelocity(Phaser.Math.Between(20, 80), Phaser.Math.Between(20, 80));

        if (Math.random() > 0.5)
        {
            face.vel.x *= -1;
        }
        else
        {
            face.vel.y *= -1;
        }
    }
}

/////////////


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


/*"use strict";
var starsleft = 40;
var winner;
var starsText;

function makeGame(game,shared)
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


*/