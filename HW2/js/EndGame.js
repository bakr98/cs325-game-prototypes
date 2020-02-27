"use strict";

GameStates.makeWinState = function( game, shared ) {

	var music = null;
    var playButton = null;
    var endText;
    
    function startGame(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        game.score = 0;
        game.state.start('Game');
        

    }
    
    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            music = game.add.audio('titleMusic');
            //music.play();
    
            game.add.sprite(0, 0, 'endPage');
            var style = { font: "60px Tahoma", fill: "#ffffff", align: "center" };
            endText = game.add.text(game.world.centerX, game.world.centerY-30, "Score: " + game.score, style );
            endText.anchor.setTo( 0.5, 0.0 );
    
            playButton = game.add.button( game.world.centerX-60, game.world.centerY + 60, 'button_retry', startGame, null, 'button_retry', 'button_retry', 'button_retry');
    
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
