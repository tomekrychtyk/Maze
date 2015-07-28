function Ghost(x, y, orientation, maze) {
	this.maze = maze;

	this.x = x;
	this.y = y;
	this.startOrientation = orientation;
}

Ghost.prototype.moveForward = function() {
	if(!this.maze || !this.maze.isValidDirection(this.startOrientation)) {
		return false;
	}

	if(!this.maze.canMove(this.x, this.y, this.startOrientation)) {
		return false;
	}

	switch(this.startOrientation) {
		case "east":
			this.y += 1;
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

Ghost.prototype.switchOrientation = function() {
	if(this.startOrientation == "east") {
		this.startOrientation = "west";
	} else {
		this.startOrientation = "east";
	}
}