"use strict";

function MazeSpace() {
	this.north = false;
	this.east = false;
	this.south = false;
	this.west = false;

	this.ghost = false;
	this.monser = false;
}

MazeSpace.prototype.setWall = function(direction) {
	this[direction] = true;
}