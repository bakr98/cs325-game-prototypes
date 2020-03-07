"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    function updateBullets (lazer) {

        // if (game.time.now > frameTime)
        // {
        //     frameTime = game.time.now + 500;
        // }
        // else
        // {
        //     return;
        // }
        var stars;
        var star;
        var timer;
        var timerText;
        var baddies;
        var lazers;
        var player;
        var cursors;
        var bulletsshot;
        
        var fireButton;
        var bulletTime = 0;
        var frameTime = 0;
        var frames;
        var prevCamX = 0;
        var ingame;
        var buildings;
        var singleship;
        var total = 60;
        var NUMBER_OF_FOLLOWERS = 10;
        var building;
        var weapon;
    
        //  Adjust for camera scrolling
        var camDelta = game.camera.x - game.prevCamX;
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
    /*function updateCounter() {

        game.total--;
        game.timerText = game.timerText.setText("Time Left: " + game.total);
        if(game.total == 0){
            //GAME OVER SCREEN
            console.log("GAME OVER");
            game.total = 30;
            //ingame.stop();
            game.state.start('EndGame', 0);
        }

    
    }*/
   /* function Building(game) {

        var x = game.rnd.between(300,3000);
        var y = 200;
    
        Phaser.Sprite.call(this, game, x, y, 'building', 17);
    
        game.physics.arcade.enable(this);
    
    };*/

    // Follower constructor
var Follower = function(game, x, y, target) {
    Phaser.Sprite.call(this, game, x, y, 'enemyship');

    // Save the target that this Follower will follow
    // The target is any object with x and y properties
    this.target = target;

    // Set the pivot point for this sprite to the center
    this.anchor.setTo(0.5, 0.5);

    // Enable physics on this object
    this.game.physics.enable(this, Phaser.Physics.ARCADE);

    // Each Follower will record its position history in
    // an array of point objects (objects with x,y members)
    // This will be used to make each Follower follow the
    // same track as its target
    this.history = [];
    this.HISTORY_LENGTH = 5;

    // Define constants that affect motion
    this.MAX_SPEED = 250; // pixels/second
    this.MIN_DISTANCE = 32; // pixels
};

// Followers are a type of Phaser.Sprite
Follower.prototype = Object.create(Phaser.Sprite.prototype);
Follower.prototype.constructor = Follower;

Follower.prototype.update = function() {
    // Get the target x and y position.
    //
    // This algorithm will follow targets that may or may not have a position
    // history.
    //
    // The targetMoving flag tells this object when its target is moving
    // so that it knows when to move and when to stop.
    var t = {};
    var targetMoving = false;
    if (this.target.history !== undefined && this.target.history.length) {
        // This target has a history so go towards that
        t = this.target.history[0];
        if (this.target.body.velocity.x !== 0 ||
            this.target.body.velocity.y !== 0) targetMoving = true;
    } else {
        // This target doesn't have a history defined so just
        // follow its current x and y position
        t.x = this.target.x;
        t.y = this.target.y;

        // Calculate distance to target
        // If the position is far enough way then consider it "moving"
        // so that we can get this Follower to move.
        var distance = this.game.math.distance(this.x, this.y, t.x, t.y);
        if (distance > this.MIN_DISTANCE) targetMoving = true;
    }

    // If the distance > MIN_DISTANCE then move
    if (targetMoving) {
        // Add current position to the end of the history array
        this.history.push({ x: this.x, y: this.y });

        // If the length of the history array is over a certain size
        // then remove the oldest (first) element
        if (this.history.length > this.HISTORY_LENGTH) this.history.shift();

        // Calculate the angle to the target
        var rotation = this.game.math.angleBetween(this.x, this.y, t.x, t.y);

        // Calculate velocity vector based on rotation and this.MAX_SPEED
        this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
        this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
    } else {
        this.body.velocity.setTo(0, 0);
    }
};
    
    function fireBullet () {
    
        if (game.time.now > game.bulletTime)
        {
            //  Grab the first bullet we can from the pool
            lazer = game.lazers.getFirstDead(true, player.x + 24 * player.scale.x, player.y + 8, 'lazer');
    
            lazer.animations.add('fire', frames, 60);
            lazer.animations.frameName = 'frame02';
    
            lazer.scale.x = player.scale.x;
    
            if (lazer.scale.x === 1)
            {
                // lazer.anchor.x = 1;
            }
            else
            {
                // lazer.anchor.x = 0;
            }
    
            //  Lazers start out with a width of 96 and expand over time
            // lazer.crop(new Phaser.Rectangle(244-96, 0, 96, 2), true);
    
            game.bulletTime = game.time.now + 250;
        }
    
    }

    function destroyBuilding(weaponbullets, building){

            building.kill();
            console.log("REMOVED");
            //starsleft -=1;
            //starsText = starsText.setText("Stars Left: " + starsleft);
            //if(starsleft == 0){
            //    winner = winner.setText("YOU WIN!!");
            //};
        
        
    }
    


    return {
    
        create: function () {

            game.add.tileSprite(0, 0, 3500, 600, 'citybg');
            game.ingame = game.add.audio('ingame');
            game.ingame.loopFull();
    
            game.world.setBounds(0, 0, 800*4, 600);

            frames = Phaser.Animation.generateFrameNames('frame', 2, 30, '', 2);
            frames.unshift('frame02');


            game.stars = game.add.group();
            game.weapon = game.add.weapon(30, 'alienbaby');
            game.bulletsshot = game.weapon.bullets;
            game.physics.arcade.enable(game.weapon);
            game.weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            game.weapon.bulletAngleOffset = 0;
            game.weapon.bulletSpeed = -200;
            game.weapon.fireRate = 1;


        
            for (var i = 0; i < 20; i++)
            {
                game.star = game.stars.create(game.world.randomX, game.world.randomY-300, 'cloud');
                game.star.name = "cloud" + i;
                game.physics.arcade.enable(game.star);
                game.star.body.velocity.x = -10;
            }
        
            game.baddies = game.add.group();
        
            for (var i = 0; i < 30; i++)
            {
                game.singleship = game.baddies.create(game.world.randomX, game.world.randomY-200, 'enemyship');
                game.singleship.name = "singleship" + i;
                game.physics.arcade.enable(game.singleship);
                if(i%3 == 0){ 
                    game.singleship.body.velocity.x = 50;
                }
                else if(i%10 == 0){
                    game.singleship.body.velocity.x = 100;
                    game.singleship.body.velocity.y = -10
                }
                else{
                    game.singleship.body.velocity.x = 30;
                }
                //game.singleship.body.acceleration.x = -100;
                
            }

           
        
            game.lazers = game.add.group();
        
            game.player = game.add.sprite(100, 300, 'monster');
            game.player.anchor.x = 0.5;
        
            game.camera.follow(game.player, Phaser.Camera.FOLLOW_LOCKON, 0.1);
        
            game.cursors = game.input.keyboard.createCursorKeys();
            game.fireButton = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        
            game.prevCamX = game.camera.x;
            for(var i = 0; i < game.NUMBER_OF_FOLLOWERS; i++) {
                var f = this.game.add.existing(
                    new Follower(this.game,
                        this.game.width/2 + i * 32,
                        this.game.height/2,
                        f || this.game.input /* the previous follower or pointer */
                    )
                );
            }
            game.weapon.trackSprite(game.player, 14, 0);

            game.buildings = game.add.group();
        
            for (var i = 0; i < 5; i++)
            {
                //group.add(new Building(game));

                game.building = game.buildings.create(game.world.randomX, 200, 'building');
                game.physics.arcade.enable(game.building);

                //game.physics.arcade.overlap(game.building, game.weapon, destroyBuilding, null, game);
                


            }
            //fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        
            /*game.stage.backgroundColor = '#000';
            ingame = game.add.audio('ingame');
            ingame.loopFull();
            //meow1 = game.add.audio('kittenmeow');
            //meow2 = game.add.audio('catmeow');
            game.add.sprite(0, 0, 'grass');

            ////

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
        
            lazers = game.add.group();
        
            player = game.add.sprite(100, 300, 'player');
            player.anchor.x = 0.5;
        
            game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1);
        
            cursors = game.input.keyboard.createCursorKeys();
            fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
            prevCamX = game.camera.x;





            ///

            /*cats = game.add.group();
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

            }*/

            //  Create our Timer
            
            /*game.timer = game.time.create(false);

            game.timer.loop(1000, updateCounter, this);
            var style = { font: "25px Tahoma", fill: "#ffffff", align: "center" };
            game.timerText = game.add.text(700, 10, "Time Left: 60", style );
            //game.timerText.anchor.setTo( 0.5, 0.0 );


            //  Start the timer running - this is important!
            //  It won't start automatically, allowing you to hook it to button events and the like.
            game.timer.start();*/
            
            
    
        },
    
        update: function () {
            game.physics.arcade.overlap(game.player, game.buildings, destroyBuilding, null, game);
            game.physics.arcade.overlap(game.buildings, game.player, destroyBuilding, null, game);

            game.physics.arcade.overlap(game.weaponbullets, game.buildings, destroyBuilding, null, game);
            game.physics.arcade.collide(game.weaponbullets, game.buildings);


            if (game.cursors.left.isDown)
            {
                game.player.x -= 8;
                game.player.scale.x = -1;
            }
            else if (game.cursors.right.isDown)
            {
                game.player.x += 8;
                game.player.scale.x = 1;
            }
        
            if (game.cursors.up.isDown)
            {
                game.player.y -= 8;
            }
            else if (game.cursors.down.isDown)
            {
                game.player.y += 8;
            }
        
            if (game.fireButton.isDown)
            {
                //fireBullet();
                game.weapon.fire()
            }
        
            game.lazers.forEachAlive(updateBullets, this);
        
            game.prevCamX = game.camera.x;
    
        }
    };
};
