"use strict";

GameStates.makeWinState = function( game, shared ) {

	var music = null;
    var playButton = null;
    var endText;
    var endgamemusic = null;
    
    function startGame(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        endgamemusic.stop();

        //	And start the actual game
        game.score = 0;
        game.state.start('Game');
        

    }
    
    return {
    
        create: function () {
    
            endgamemusic = game.add.audio('endgametheme');
            endgamemusic.loopFull();
            game.add.sprite(0, 0, 'endPage');
            var style = { font: "60px Tahoma", fill: "#ffffff", align: "center" };
            endText = game.add.text(game.world.centerX, game.world.centerY-30, "Score: " + game.score, style );
            endText.anchor.setTo( 0.5, 0.0 );
    
            playButton = game.add.button( game.world.centerX-60, game.world.centerY + 80, 'button_retry', startGame, null, 'button_retry', 'button_retry', 'button_retry');
    
        },
    
        update: function () {
        
        }
        
    };
};
