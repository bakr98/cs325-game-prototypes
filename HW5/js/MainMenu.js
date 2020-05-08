"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
    var playButton = null;
    var enterKey;
    
    function startGame(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        //music.stop();

        //	And start the actual game
        game.state.start('Game');

    }
    
    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            //music = game.add.audio('gametheme');
            //music.loopFull();
    
            game.add.sprite(0, 0, 'titlePage');
            enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            

    
            //playButton = game.add.button( 303, 400, 'playButton', startGame, null, 'Play', 'out', 'down');
    
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
            if(enterKey.isDown){
                startGame();
            }
        }
        
    };
};
