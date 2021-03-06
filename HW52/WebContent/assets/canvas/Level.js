// -- user code here --

/* --- start generated code --- */

// Generated by  1.5.4 (Phaser v2.6.2)


/**
 * Level.
 */
function Level() {
	
	Phaser.State.call(this);
	
}

/** @type Phaser.State */
var Level_proto = Object.create(Phaser.State.prototype);
Level.prototype = Level_proto;
Level.prototype.constructor = Level;

Level.prototype.init = function () {
	
	this.physics.startSystem(Phaser.Physics.ARCADE);
	
};

Level.prototype.preload = function () {
	
	this.load.pack('preloader', 'assets/pack.json');
	
};

Level.prototype.create = function () {
	var _background = this.add.tileSprite(0.0, 0.0, 320.0, 240.0, 'background', null);
	_background.fixedToCamera = true;
	
	var _middleground = this.add.tileSprite(0.0, 0.0, 320.0, 240.0, 'middleground', null);
	_middleground.fixedToCamera = true;
	
	var _level = this.add.tilemap('level1', 16, 16);
	_level.addTilesetImage('tileset');
	_level.setCollision([1]);
	var _level_layer = _level.createLayer(0);
	_level_layer.position.set(1.886376594484318E-5, -1.1317799362586811E-5);
	_level_layer.resizeWorld();
	
	var _level1_collisions = this.add.tilemap('level1_collisions', 16, 16);
	_level1_collisions.addTilesetImage('collisions');
	_level1_collisions.setCollision([0]);
	var _level1_collisions_layer = _level1_collisions.createLayer(0);
	_level1_collisions_layer.renderable = false;
	_level1_collisions_layer.resizeWorld();
	
	var _props = this.add.group();
	
	this.add.sprite(99.0, 22.0, 'atlas-props', 'tree', _props);
	
	this.add.sprite(272.0, 176.0, 'atlas-props', 'mushroom-brown', _props);
	
	this.add.sprite(176.0, 164.8, 'atlas-props', 'mushroom-red', _props);
	
	this.add.sprite(48.0, 0.0, 'atlas-props', 'vine', _props);
	
	this.add.sprite(400.0, 0.0, 'atlas-props', 'vine', _props);
	
	this.add.sprite(2080.0, 0.0, 'atlas-props', 'vine', _props);
	
	this.add.sprite(2176.0, 0.0, 'atlas-props', 'vine', _props);
	
	this.add.sprite(1947.0, 383.0, 'atlas-props', 'tree', _props);
	
	this.add.sprite(2336.0, 43.2, 'atlas-props', 'house', _props);
	
	this.add.sprite(2304.0, 180.8, 'atlas-props', 'mushroom-red', _props);
	
	this.add.sprite(2240.0, 180.8, 'atlas-props', 'mushroom-brown', _props);
	
	var _chests_group = this.add.group();
	
	var _chest = new Chest(this.game, 1136.0, 160.0);
	_chests_group.add(_chest);
	
	var _chest1 = new Chest(this.game, 512.0, 336.0);
	_chests_group.add(_chest1);
	
	var _player = new Player(this.game, 43.0, 168.0);
	this.add.existing(_player);
	
	var _enemies_group = this.add.group();
	
	var _slug7 = new Slug(this.game, 297.0, 195.0);
	_enemies_group.add(_slug7);
	
	var _slug6 = new Slug(this.game, 496.0, 32.0);
	_enemies_group.add(_slug6);
	
	var _slug5 = new Slug(this.game, 1488.0, 336.0);
	_enemies_group.add(_slug5);
	
	var _slug4 = new Slug(this.game, 1168.0, 336.0);
	_enemies_group.add(_slug4);
	
	var _slug3 = new Slug(this.game, 1328.0, 336.0);
	_enemies_group.add(_slug3);
	
	var _slug2 = new Slug(this.game, 2064.0, 176.0);
	_enemies_group.add(_slug2);
	
	var _slug1 = new Slug(this.game, 2112.0, 176.0);
	_enemies_group.add(_slug1);
	
	var _slug = new Slug(this.game, 192.0, 160.0);
	_enemies_group.add(_slug);
	
	var _bee_bee_ = new Bee(this.game, 528.0, 160.0);
	_bee_bee_.data = {
		distance: 10,
		horizontal: 20
	};
	_enemies_group.add(_bee_bee_);
	
	var _bee_bee_1 = new Bee(this.game, 768.0, 160.0);
	_bee_bee_1.data = {
	distance: 30,
	horizontal: true
	};
	_enemies_group.add(_bee_bee_1);
	
	var _bee_bee_2 = new Bee(this.game, 960.0, 160.0);
	_bee_bee_2.data = {
	distance: 30,
	horizontal: false
	};
	_enemies_group.add(_bee_bee_2);
	
	var _bee_bee_4 = new Bee(this.game, 2272.0, 144.0);
	_bee_bee_4.data = {
	distance: 30,
	horizontal: false
	};
	_enemies_group.add(_bee_bee_4);
	
	var _piranha_0 = new Plant(this.game, 672.0, 160.0);
	_enemies_group.add(_piranha_0);
	
	var _piranha_1 = new Plant(this.game, 1024.0, 80.0);
	_enemies_group.add(_piranha_1);
	
	var _piranha_2 = new Plant(this.game, 1616.0, 320.0);
	_enemies_group.add(_piranha_2);
	
	var _piranha_3 = new Plant(this.game, 1600.0, 112.0);
	_enemies_group.add(_piranha_3);
	
	var _loot_group = this.add.group();
	
	var _propsFront = this.add.group();
	
	this.add.sprite(242.0, 211.0, 'atlas-props', 'rock', _propsFront);
	
	this.add.sprite(32.0, 192.0, 'atlas-props', 'plant', _propsFront);
	
	this.add.sprite(2288.0, 192.0, 'atlas-props', 'plant', _propsFront);
	
	this.add.sprite(2400.0, 192.0, 'atlas-props', 'plant', _propsFront);
	
	this.add.sprite(368.0, 192.0, 'atlas-props', 'plant', _propsFront);
	
	this.add.sprite(2432.0, 192.0, 'atlas-props', 'plant', _propsFront);
	
	this.add.sprite(1904.0, 192.0, 'atlas-props', 'plant', _propsFront);
	
	this.add.sprite(848.0, 176.0, 'atlas-props', 'rock', _propsFront);
	
	this.add.sprite(1952.0, 192.0, 'atlas-props', 'rock', _propsFront);
	
	var _stars_group = this.add.group();
	
	var _star_star_ = new PickStar(this.game, 1632.0, 63.1666666666667);
	_stars_group.add(_star_star_);
	
	var _star_star_1 = new PickStar(this.game, 1367.33333333333, 293.833333333333);
	_stars_group.add(_star_star_1);
	
	var _star_star_2 = new PickStar(this.game, 1272.66666666667, 295.166666666667);
	_stars_group.add(_star_star_2);
	
	var _star_star_3 = new PickStar(this.game, 1183.33333333333, 293.166666666667);
	_stars_group.add(_star_star_3);
	
	var _star_star_4 = new PickStar(this.game, 1664.0, 245.0);
	_stars_group.add(_star_star_4);
	
	var _star_star_5 = new PickStar(this.game, 1516.66666666667, 240.5);
	_stars_group.add(_star_star_5);
	
	var _star_star_6 = new PickStar(this.game, 1486.0, 241.16666666666703);
	_stars_group.add(_star_star_6);
	
	var _star_star_7 = new PickStar(this.game, 1456.0, 241.83333333333297);
	_stars_group.add(_star_star_7);
	
	var _star_star_8 = new PickStar(this.game, 655.333333333333, 96.5);
	_stars_group.add(_star_star_8);
	
	var _star_star_9 = new PickStar(this.game, 653.333333333333, 63.8333333333334);
	_stars_group.add(_star_star_9);
	
	var _star_star_10 = new PickStar(this.game, 428.666666666667, 127.833333333333);
	_stars_group.add(_star_star_10);
	
	var _star_star_11 = new PickStar(this.game, 399.333333333333, 128.5);
	_stars_group.add(_star_star_11);
	
	var _star_star_13 = new PickStar(this.game, 67.0, 30.0);
	_stars_group.add(_star_star_13);
	
	var _star_star_15 = new PickStar(this.game, 272.666666666667, 47.1666666666667);
	_stars_group.add(_star_star_15);
	
	var _star_star_16 = new PickStar(this.game, 302.666666666667, 47.0);
	_stars_group.add(_star_star_16);
	
	var _star_star_12 = new PickStar(this.game, 160.5, 110.833333333333);
	_stars_group.add(_star_star_12);
	
	var _star_star_18 = new PickStar(this.game, 2145.0, 64.0);
	_stars_group.add(_star_star_18);
	
	var _star_star_19 = new PickStar(this.game, 2082.0, 64.0);
	_stars_group.add(_star_star_19);
	
	var _star_star_20 = new PickStar(this.game, 1697.0, 64.0);
	_stars_group.add(_star_star_20);
	
	var _star_star_21 = new PickStar(this.game, 209.0, 106.0);
	_stars_group.add(_star_star_21);
	
	var _star_star_23 = new PickStar(this.game, 209.0, 106.0);
	_stars_group.add(_star_star_23);
	
	var _star_star_29 = new PickStar(this.game, 2351.0, 176.0);
	_stars_group.add(_star_star_29);
	
	var _star_star_30 = new PickStar(this.game, 2287.0, 177.0);
	_stars_group.add(_star_star_30);
	
	var _star_star_31 = new PickStar(this.game, 2323.0, 176.0);
	_stars_group.add(_star_star_31);
	
	var _star_star_32 = new PickStar(this.game, 2210.0, 64.0);
	_stars_group.add(_star_star_32);
	
	var _star_star_17 = new PickStar(this.game, 1664.66666666667, 63.1666666666667);
	_stars_group.add(_star_star_17);
	
	var _carrots_group = this.add.group();
	
	var _carrot_carrot_ = new Carrot(this.game, 1484.66666666667, 29.5);
	_carrots_group.add(_carrot_carrot_);
	
	var _carrot_carrot_2 = new Carrot(this.game, 404.5, 51.0);
	_carrots_group.add(_carrot_carrot_2);
	
	var _carrot_carrot_3 = new Carrot(this.game, 766.833333333333, 65.5);
	_carrots_group.add(_carrot_carrot_3);
	
	var _carrot_carrot_4 = new Carrot(this.game, 936.833333333333, 313.833333333333);
	_carrots_group.add(_carrot_carrot_4);
	
	var _hud = this.add.sprite(10.0, 10.0, 'atlas', 'hud/hud-4');
	_hud.fixedToCamera = true;
	
	var _scoreLabel = this.add.bitmapText(93.0, 11.0, 'vt323', 'X-Eltors: 0', 32);
	_scoreLabel.scale.set(0.4428295183236429, 0.31234285277599705);
	_scoreLabel.fixedToCamera = true;
	
	
	
	// fields
	
	this.fBackground = _background;
	this.fMiddleground = _middleground;
	this.fLevel = _level;
	this.fLevel_layer = _level_layer;
	this.fLevel1_collisions = _level1_collisions;
	this.fLevel1_collisions_layer = _level1_collisions_layer;
	this.fChests_group = _chests_group;
	this.fPlayer = _player;
	this.fEnemies_group = _enemies_group;
	this.fPiranha_2 = _piranha_2;
	this.fLoot_group = _loot_group;
	this.fStars_group = _stars_group;
	this.fCarrots_group = _carrots_group;
	this.fHud = _hud;
	this.fScoreLabel = _scoreLabel;
	this.afterCreate();
	
};

/* --- end generated code --- */

Level.prototype.afterCreate = function() {

	this.score = 0;

	this.createTileMap();
	this.camFollow();
	this.bindKeys();
	this.startMusic();
	this.addAudios();
};

Level.prototype.createStars = function() {
	// create groups
	stars_group = game.add.group();
	stars_group.enableBody = true;

	// add animations
	stars_group.callAll("animations.add", "animations", "spin-star", [
			"star/star-1", "star/star-2", "star/star-3", "star/star-4", ,
			"star/star-5", , "star/star-6" ], 10, true);
	stars_group.callAll("animations.play", "animations", "spin-star");
};

Level.prototype.startMusic = function() {
	this.music = this.add.audio("music");
	this.music.loop = true;

	this.music.play();
};

Level.prototype.addAudios = function() {
	this.audioCarrot = this.add.audio("carrot");
	this.audioEnemyDeath = this.add.audio("enemy-death");
	this.audioHurt = this.add.audio("hurt");
	this.audioJump = this.add.audio("jump");
	this.audioStar = this.add.audio("star");
	this.audioChest = this.add.audio("chest");
};

Level.prototype.createTileMap = function() {
	this.setTopCollisionTiles(1);

	this.fLevel1_collisions.setTileIndexCallback(2, this.enemyCollide, this);
	this.fLevel1_collisions.setTileIndexCallback(3, this.triggerLadder, this);
	this.fLevel1_collisions.setTileIndexCallback(4, this.killZone, this);
	this.fLevel1_collisions.setTileIndexCallback(7, this.exitZone, this);
};

Level.prototype.triggerLadder = function(obj) {
	if (obj.kind == "player" && this.wasd.up.isDown) {
		obj.onLadder = true;
	}
};

Level.prototype.killZone = function(obj) {
	if (obj.kind == "player") {
		obj.death();
	}
};

Level.prototype.exitZone = function(obj) {
	if (obj.kind == "player") {
		this.music.stop();
		this.game.state.start("TitleScreen");
	}
};

Level.prototype.setTopCollisionTiles = function(tileIndex) {
	var map = this.fLevel1_collisions;
	var x, y, tile;
	for (x = 0; x < map.width; x++) {
		for (y = 1; y < map.height; y++) {
			tile = map.getTile(x, y);
			if (tile !== null) {
				if (tile.index == tileIndex) {
					tile.setCollision(false, false, true, false);
				}
			}
		}
	}
};

Level.prototype.camFollow = function() {
	this.camera.follow(this.fPlayer, Phaser.Camera.FOLLOW_PLATFORMER);
};

Level.prototype.update = function() {

	this.physics.arcade.collide(this.fEnemies_group,
			this.fLevel1_collisions_layer);
	this.physics.arcade.collide(this.fChests_group,
			this.fLevel1_collisions_layer);
	this.physics.arcade
			.collide(this.fLoot_group, this.fLevel1_collisions_layer);

	if (this.fPlayer.alive) {
		// physics
		this.physics.arcade
				.collide(this.fPlayer, this.fLevel1_collisions_layer);
		// overlaps
		this.physics.arcade.overlap(this.fPlayer, this.fEnemies_group,
				this.checkAgainstEnemies, null, this);

		this.physics.arcade.overlap(this.fPlayer, this.fCarrots_group,
				this.collectCarrot, null, this);
		this.physics.arcade.overlap(this.fPlayer, this.fStars_group,
				this.collectStar, null, this);
		this.physics.arcade.overlap(this.fPlayer, this.fChests_group,
				this.checkAgainstChests, null, this);
		this.physics.arcade.overlap(this.fPlayer, this.fLoot_group,
				this.collectLoot, null, this);
	}

	this.movePlayer();
	this.parallaxBg();
	this.hurtManager();
	this.deathReset();
	this.updateHealthHud();
};

Level.prototype.updateHealthHud = function() {
	switch (this.fPlayer.health) {
	case 3:
		this.fHud.frameName = "hud/hud-4";
		break;
	case 2:
		this.fHud.frameName = "hud/hud-3";
		break;
	case 1:
		this.fHud.frameName = "hud/hud-2";
		break;
	case 0:
		this.fHud.frameName = "hud/hud-1";
		break;
	}
};

Level.prototype.deathReset = function() {
	if (this.fPlayer.y > 16 * 60) {
		// player.reset();
		this.music.stop();
		this.game.state.start("TitleScreen");
	}
};

/**
 * 
 * @param {Player}
 *            player
 * @param {Star}
 *            item
 */
Level.prototype.collectLoot = function(player, item) {
	if (item.able) {
		item.kill();
		this.audioStar.play();
		this.increaseScore();
	}
};

/**
 * 
 * @param {Player}
 *            player
 * @param {Chest}
 *            chest
 */
Level.prototype.checkAgainstChests = function(player, chest) {
	if ((player.y + player.body.height * 0.5 < chest.y)
			&& player.body.velocity.y > 0 && !chest.opened) {
		player.body.velocity.y = -100;
		chest.open();
		this.audioChest.play();
	}
};

/**
 * 
 * @param {Player}
 *            player
 * @param {Phaser.Sprite}
 *            item
 */
Level.prototype.collectStar = function(player, item) {
	this.increaseScore();
	item.kill();
	this.audioStar.play();

};

Level.prototype.increaseScore = function() {
	this.score++;
	this.fScoreLabel.text = this.score;
};

/**
 * 
 * @param {Player}
 *            player
 * @param {Phaser.Sprite}
 *            item
 */
Level.prototype.collectCarrot = function(player, item) {
	item.kill();
	this.audioCarrot.play();
	player.health++;
	if (player.health > 3) {
		player.health = 3;
	}
};

Level.prototype.hurtManager = function() {
	if (this.fPlayer.hurtFlag && this.game.time.totalElapsedSeconds() > 0.3) {
		this.fPlayer.hurtFlag = false;
	}
};

/**
 * 
 * @param {Player}
 *            player
 * @param {Phaser.Sprite}
 *            enemy
 */
Level.prototype.checkAgainstEnemies = function(player, enemy) {

	if ((player.y + player.body.height * 0.5 < enemy.y)
			&& player.body.velocity.y > 0) {

		enemy.kill();
		enemy.destroy();
		this.audioEnemyDeath.play();
		this.spawnEnemyDeath(enemy.x, enemy.y);
		player.body.velocity.y = -300;
	} else {
		this.hurtPlayer();
	}
};

Level.prototype.hurtPlayer = function() {

	if (this.fPlayer.hurtFlag) {
		return;
	}

	this.fPlayer.hurtFlag = true;
	this.game.time.reset();

	this.fPlayer.animations.play("hurt");
	this.fPlayer.y -= 5;

	this.fPlayer.body.velocity.y = -150;
	this.fPlayer.body.velocity.x = (this.fPlayer.scale.x == 1) ? -22 : 22;
	this.fPlayer.health--;

	this.audioHurt.play();
	if (this.fPlayer.health < 1) {
		this.fPlayer.death();
	}
};

Level.prototype.spawnEnemyDeath = function(x, y) {
	var temp = new EnemyDeath(this.game, x, y);
	this.add.existing(temp);
};

Level.prototype.parallaxBg = function() {
	this.fBackground.tilePosition.x = this.fLevel_layer.x * -0.2;
	this.fMiddleground.tilePosition.x = this.fLevel_layer.x * -0.5;
};

Level.prototype.bindKeys = function() {
	this.wasd = {
		jump : this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
		left : this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
		right : this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
		duck : this.input.keyboard.addKey(Phaser.Keyboard.DOWN),
		up : this.input.keyboard.addKey(Phaser.Keyboard.UP)
	};
	this.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR,
			Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.DOWN,
			Phaser.Keyboard.UP ]);
};

Level.prototype.movePlayer = function() {
	if (!this.fPlayer.alive) {
		this.fPlayer.animations.play("hurt");
		return;
	}

	if (this.fPlayer.hurtFlag) {
		this.fPlayer.animations.play("hurt");
		return;
	}

	if (this.fPlayer.onLadder) {
		this.fPlayer.animations.play("climb");

		var vel = 30;
		if (this.wasd.duck.isDown) {
			this.fPlayer.body.velocity.y = vel;
		} else if (this.wasd.up.isDown) {
			this.fPlayer.body.velocity.y = -vel;
		}

		// horizontal

		if (this.wasd.left.isDown) {
			this.fPlayer.body.velocity.x = -vel;

			this.fPlayer.scale.x = -1;
		} else if (this.wasd.right.isDown) {
			this.fPlayer.body.velocity.x = vel;

			this.fPlayer.scale.x = 1;
		} else {
			this.fPlayer.body.velocity.x = 0;

		}

		return;
	}

	if (this.wasd.jump.isDown && this.fPlayer.body.onFloor()) {
		this.fPlayer.body.velocity.y = -200;
		this.audioJump.play();

	}

	var vel = 80;
	if (this.wasd.left.isDown) {
		this.fPlayer.body.velocity.x = -vel;
		this.moveAnimation();
		this.fPlayer.scale.x = -1;
	} else if (this.wasd.right.isDown) {
		this.fPlayer.body.velocity.x = vel;
		this.moveAnimation();
		this.fPlayer.scale.x = 1;
	} else {
		this.fPlayer.body.velocity.x = 0;
		this.stillAnimation();

	}
};

Level.prototype.enemyCollide = function(obj) {
	if (obj.kind == "slug") {
		// enemy.y = 0;
		obj.turnAround();
	}
};

Level.prototype.moveAnimation = function() {
	if (this.fPlayer.body.velocity.y < 0) {
		this.fPlayer.animations.play("jump");
	} else if (this.fPlayer.body.velocity.y > 0) {
		this.fPlayer.animations.play("fall");
	} else {
		this.fPlayer.animations.play("skip");
	}
};

Level.prototype.stillAnimation = function() {
	if (this.fPlayer.body.velocity.y < 0) {
		this.fPlayer.animations.play("jump");
	} else if (this.fPlayer.body.velocity.y > 0) {
		this.fPlayer.animations.play("fall");
	} else if (this.wasd.duck.isDown) {
		this.fPlayer.animations.play("duck");
	} else {
		this.fPlayer.animations.play("idle");
	}
};
