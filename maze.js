"use strict";

function Maze(options) {
	this.width = options.width;;
	this.height = options.height;

	this.startX = options.startX;
	this.startY = options.startY;
	this.startOrientation = options.startOrientation;
	this.endX = options.endX;
	this.endY = options.endY;

	this.spaces = [];

	this.directions = ["north", "east", "south", "west"];

	for(var x = 1; x <= this.width; x++) {
		this.spaces[x] = [];
		for(var y = 1; y <= this.height; y++) {
			this.spaces[x][y] = new MazeSpace();
		}
	}
}

Maze.prototype.setWall = function(x, y, direction) {
	this.spaces[x][y].setWall(direction);

	switch(direction) {
		case "north":
			if(this.spaces[x - 1][y]) {
				this.spaces[x - 1][y].setWall("south");
			}
			break;

		case "east":
			if(this.spaces[x][y + 1]) {
				this.spaces[x][y + 1].setWall("west");
			}
			break;

		case "south":
			if(this.spaces[x + 1][y]) {
				this.spaces[x + 1][y].setWall("north");
			}
			break;

		case "west":
			if(this.spaces[x][y - 1]) {
				this.spaces[x][y - 1].setWall("east");
			}
			break;
	}
}

Maze.prototype.isValidDirection = function(direction) {
	return this.directions.indexOf(direction) !== -1;
}

Maze.prototype.isInBounds = function(x, y) {
	return x > 0 && x <= this.width && y > 0 && y <= this.height;
}

Maze.prototype.canMove = function(x, y, direction) {
	if(!this.isValidDirection(direction)) {
		return false;
	}

	if(!this.isInBounds(x, y)) {
		return false;
	}

	var nextX, nextY;
	switch(direction) {
		case "north":
			nextX = x - 1;
			nextY = y;
			break;
		case "east":
			nextX = x;
			nextY = y + 1;
			break;
		case "south":
			nextX = x + 1;
			nextY = y;
			break;
		case "west":
			nextX = x;
			nextY = y - 1;
			break;
	}

	if(!this.isInBounds(nextX, nextY)) {
		return false;
	}

	if(this.spaces[x][y][direction]) {
		return false;
	}

	return true;
}

Maze.prototype.checkLostState = function(type, options) {
	if(type == "ghost") {
		if(options.ghost.x == options.player.x && options.ghost.y == options.player.y) {
			return true;
		}
	}

	return false;
}