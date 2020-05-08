window.onload = function() {
	var game = new Phaser.Game(320, 240, Phaser.AUTO, "");
	//+480 + 360
	// Add the States your game has.
	game.state.add("Boot", Boot);
	game.state.add("Preloader", Preloader);
	game.state.start("Boot");
};
