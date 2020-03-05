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
        var baddies;
        var lazers;
        var player;
        var cursors;
        var fireButton;
        var bulletTime = 0;
        var frameTime = 0;
        var frames;
        var prevCamX = 0;
    
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
    


    return {
    
        create: function () {
    
            game.world.setBounds(0, 0, 800*4, 600);

            frames = Phaser.Animation.generateFrameNames('frame', 2, 30, '', 2);
            frames.unshift('frame02');
        
            game.stars = game.add.group();
        
            for (var i = 0; i < 128; i++)
            {
                game.stars.create(game.world.randomX, game.world.randomY, 'star');
            }
        
            game.baddies = game.add.group();
        
            for (var i = 0; i < 16; i++)
            {
                game.baddies.create(game.world.randomX, game.world.randomY, 'baddie');
            }
        
            game.lazers = game.add.group();
        
            game.player = game.add.sprite(100, 300, 'monster');
            game.player.anchor.x = 0.5;
        
            game.camera.follow(game.player, Phaser.Camera.FOLLOW_LOCKON, 0.1);
        
            game.cursors = game.input.keyboard.createCursorKeys();
            game.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
            game.prevCamX = game.camera.x;
            /*game.stage.backgroundColor = '#000';
            //ingame = game.add.audio('ingame');
            //ingame.loopFull();
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
           /* timer = game.time.create(false);

            timer.loop(1000, updateCounter, this);*/
            var style = { font: "25px Tahoma", fill: "#ffffff", align: "center" };
           /* timerText = game.add.text(700, 10, "Time Left: 30", style );
            timerText.anchor.setTo( 0.5, 0.0 );
            scoreText = game.add.text(20, 10, "Cats Caught: 0", style );

            //  Start the timer running - this is important!
            //  It won't start automatically, allowing you to hook it to button events and the like.
            timer.start();*/
            
    
        },
    
        update: function () {
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
                fireBullet();
            }
        
            game.lazers.forEachAlive(updateBullets, this);
        
            game.prevCamX = game.camera.x;
    
        }
    };
};
