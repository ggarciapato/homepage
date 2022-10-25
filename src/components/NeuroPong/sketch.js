let canvasWidth = 600;
let canvasHeight = 400;
let speedScale = 5;
let stickSize = 60;

let ball;
let field;
let playerOne;
let playerTwo;

class Ball {
	constructor(_p5) {
		this._p5 = _p5;
		this.radius = 5;
		this.resetBall();
	}

	resetBall() {
		this.position = this._p5.createVector(
			canvasWidth / 2,
			// canvasHeight / 2
			Math.random() * canvasHeight
			);
			
		this.velocity = this._p5.createVector(
			Math.random() * speedScale,
			Math.random() * speedScale
		);
	}	

	display() {
		this._p5.noStroke();
		this._p5.ellipse(
			this.position.x, 
			this.position.y, 
			this.radius * 2, 
			this.radius * 2
		);
	}

	update(sticks) {
		// update velocity based on collisions
		let collidedWithBackWalls = (
			this.position.x >= canvasWidth - this.radius 
			| this.position.x <= this.radius
		);
		if (collidedWithBackWalls) {
			this.resetBall();
		}
		let collidedWithWalls = (
			this.position.y >= canvasHeight - this.radius
			| this.position.y <= this.radius
		);
		if (collidedWithWalls) {
			this.velocity.y = -this.velocity.y;
		}

		for (let stick of sticks) {
			let hitTheXStick = (
				stick.playerTwo 
				? this.position.x + this.radius >= stick.x - stick.thickness
				: this.position.x - this.radius <= stick.x + stick.thickness
			);

			let hitTheYStick = (
				this.position.y < stick.upperEdge 
				&& this.position.y > stick.lowerEdge
			);

			
			if (hitTheXStick && hitTheYStick) {
				console.log('hit the stick');
				this.velocity.x = -this.velocity.x;
				this.velocity.y = stick.velocityY;
			}
		}

		this.position.add(this.velocity);
	}
}

class Field {
	constructor(_p5) {
		this._p5 = _p5;
		this.p1score = 0;
		this.p2score = 0;
	}

	display() {
		this._p5.noStroke();
		this._p5.rectMode(this._p5.CENTER);
		for (let y = 0; y < canvasHeight; y += 5) {
			this._p5.rect(canvasWidth / 2, y, 2, 2);
		}
		// draw scores
	}

}

class Stick {
	constructor(_p5, playerTwo=false) {
		this._p5 = _p5;
		this.size = stickSize;
		this.offset = 10;
		this.thickness = 5;
		this.playerTwo = playerTwo;
		this.x = (
			this.playerTwo 
			? canvasWidth - this.offset 
			: this.offset
			);
			
		this.y = canvasHeight / 2;
		this.velocityY = 0;
		this.upperEdge = this.y + (this.size / 2);
		this.lowerEdge = this.y + (this.size / 2);
	}

	display() {
		this._p5.noStroke();
		this._p5.rectMode(this._p5.CENTER);
		this._p5.rect(
			this.x, 
			this.y, 
			this.thickness, 
			this.size
		);
	}

	move() {
		this.velocityY = 10 * (Math.random() - .5) * speedScale;
		// stop stick from moving if it reaches edge
		let newY = this.velocityY + this.y;
		this.upperEdge = newY + (this.size / 2);
		this.lowerEdge = newY - (this.size / 2);
		let collided = (
			this.upperEdge > canvasHeight
			| this.lowerEdge < 0
		);
		if (!collided) {
			this.y = newY;
		}

	}
}

function setup(p5, canvasParentRef) {
	// use parent to render the canvas in this ref
	// (without that p5 will render the canvas outside of your component)
	p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

	ball = new Ball(p5);
	field = new Field(p5);
	playerOne = new Stick(p5, false);
	playerTwo = new Stick(p5, true);
};

function draw (p5) {
	// NOTE: Do not use setState in the draw function or in
    // functions that are executed in the draw function...
	// please use normal variables or class properties 
    // for these purposes
	p5.background(0);
	field.display();
	playerOne.move();
	playerOne.display();
	playerTwo.move();
	playerTwo.display();
	ball.update([playerOne, playerTwo]);
	ball.display();
};

export {setup, draw};