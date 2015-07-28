"use strict";

function mazeInterface(maze, player, ghosts) {
	this.maze = maze;
	this.player = player;
	this.ghosts = ghosts;

	this.ghostsIntervals = [];

	this.gameOver = false;

	this.render = function() {
		var div = document.getElementById("maze");

		for(var x = 1; x <= this.maze.width; x++) {
			for(var y = 1; y <= this.maze.height; y++) {
				var space = document.createElement('div');
				space.className = 'maze-space';

				space.id = "space-" + x + "-" + y;

				if(this.maze.spaces[x][y].north) {
					space.classList.add('north');
				}

				if(this.maze.spaces[x][y].east) {
					space.classList.add('east');
				}

				if(this.maze.spaces[x][y].south) {
					space.classList.add('south');
				}

				if(this.maze.spaces[x][y].west) {
					space.classList.add('west');
				}

				if(x == this.maze.startX && y == this.maze.startY) {
					space.classList.add("player");
					space.classList.add("player-" + this.maze.startOrientation);
				}

				if(x == this.maze.endX && y == this.maze.endY) {
					space.classList.add("target");
				}

				if([1,2,3,4,5,6,7,8,9,10].indexOf(x) != -1 && (y == 1 || y == 10)) {
					if(y == 1) {
						space.classList.add("west-2");
					} else {
						space.classList.add("east-2");
					}
				}

				if([1,2,3,4,5,6,7,8,9,10].indexOf(y) != -1 && (x == 1 || x == 10)) {
					if(x == 1) {
						space.classList.add("north-2");
					} else {
						space.classList.add("south-2");
					}
				}

				ghosts.forEach(function(el) {
					if(el.x == x && el.y == y) {
						space.classList.add("ghost-" + el.startOrientation);
					}
				})

				div.appendChild(space);
			}

			var clear = document.createElement('div');
			clear.className = 'clear';

			div.appendChild(clear);
		}
	};

	this.bindEvents = function() {
		this.turnEvent();
		this.startGhosts();
	};

	this.startGhosts = function() {
		var that = this;
		this.ghosts.forEach(function(el) {
			that.ghostsIntervals.push(setInterval(function() {
				that.moveGhost(el);
			}, 100));
		});
	};

	this.moveGhost = function(ghost) {
		var x = ghost.x;
		var y = ghost.y;
		var orientation = ghost.startOrientation;

		var coords = ghost.moveForward();
		if(!coords) {
			ghost.switchOrientation();
		}

		var ghostDiv = document.getElementById('space-' + x + '-' + y);
		ghostDiv.classList.remove('ghost-' + orientation);

		if(coords) {
			var newGhostDiv = document.getElementById('space-' + coords.x + '-' + coords.y);
			newGhostDiv.classList.add('ghost-' + ghost.startOrientation);
		}
		
		var isLost = this.maze.checkLostState("ghost", {
			ghost: ghost,
			player: this.player
		});

		if(isLost) {
			this.endGame();
		}
	}

	this.turnEvent = function() {
		var that = this;
		document.addEventListener("keydown", function(e) {
			that.movePlayer(e, that.player);
		});
	};

	this.movePlayer = function(e, player) {
		if(this.gameOver) {
			return false;
		}

		var previousOrientation = player.orientation;

		if(e.keyCode == 38) {
			player.turnNorth();
		} else if(e.keyCode == 39) {
			player.turnEast();
		} else if(e.keyCode == 40) {
			player.turnSouth();
		} else if(e.keyCode == 37) {
			player.turnWest();
		} else {
			return false;
		}

		var coords = player.moveForward();

		var playerDiv = document.getElementsByClassName('player')[0];
		playerDiv.classList.remove("player-" + previousOrientation);

		if(coords) {
			console.log(previousOrientation);
			playerDiv.classList.remove("player");
			var newPlayerDiv = document.getElementById('space-' + coords.x + '-' + coords.y);
			newPlayerDiv.classList.add("player-" + player.orientation);
			newPlayerDiv.classList.add("player");

			if(coords.x == this.maze.endX && coords.y == this.maze.endY) {
				alert('You win!');
			}
		} else {
			playerDiv.classList.add("player-" + player.orientation);
		}
	};

	this.endGame = function() {
		this.gameOver = true;

		this.ghostsIntervals.forEach(function(el) {
			clearInterval(el);
		});
	};
}