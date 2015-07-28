"use strict";

function Player() {
	this.x = null;
	this.y = null;
	this.orientation = null;
	this.maze = null;
}

Player.prototype.setMaze = function(maze) {
	this.maze = maze;
	this.x = maze.startX;
	this.y = maze.startY;
	this.orientation = maze.startOrientation;
}

Player.prototype.turnEast = function() {
	if(!this.maze || !this.maze.isValidDirection(this.orientation)) {
		return false;
	}

	this.orientation = "east";
	return true;
}

Player.prototype.turnWest = function() {
	if(!this.maze || !this.maze.isValidDirection(this.orientation)) {
		return false;
	}

	this.orientation = "west";
	return true;
}

Player.prototype.turnNorth = function() {
	if(!this.maze || !this.maze.isValidDirection(this.orientation)) {
		return false;
	}

	this.orientation = "north";
	return true;
}

Player.prototype.turnSouth = function() {
	if(!this.maze || !this.maze.isValidDirection(this.orientation)) {
		return false;
	}

	this.orientation = "south";
	return true;
}

Player.prototype.moveForward = function() {
	if(!this.maze || !this.maze.isValidDirection(this.orientation)) {
		return false;
	}

	if(!this.maze.canMove(this.x, this.y, this.orientation)) {
		return false;
	}


	switch(this.orientation) {
		case "north":
			this.x -= 1;
			break;
		case "east":
			this.y += 1;
			break;
		case "south":
			this.x += 1;
			break;
		case "west":
			this.y -= 1;
			break;
	}

	return {
		x: this.x,
		y: this.y
	};
}