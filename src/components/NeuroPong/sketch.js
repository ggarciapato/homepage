let canvasWidth = 600;
let canvasHeight = 400;
let speedScale = 5;

let ball;
let field;

class Ball {

	constructor(_p5, position, velocity) {
		this._p5 = _p5;
		this.position = position;
		this.velocity = velocity;
		this.radius = 5
	}

	display() {
		this._p5.ellipse(
			this.position.x, 
			this.position.y, 
			this.radius * 2, 
			this.radius * 2
		);
	}

	update() {
		// update velocity based on collisions
		let collidedWithBackWalls = (
			this.position.x >= canvasWidth - this.radius | 
			this.position.x <= this.radius
		);
		if (collidedWithBackWalls) {
			this.velocity.x = -this.velocity.x;
		}
		let collidedWithWalls = (
			this.position.y >= canvasHeight - this.radius | 
			this.position.y <= this.radius
		);
		if (collidedWithWalls) {
			this.velocity.y = -this.velocity.y;
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
		for (let y = 0; y < canvasHeight; y += 5) {
			this._p5.rect(canvasWidth / 2, y, 2, 2);
		}
		// draw scores
	}

}


function setup(p5, canvasParentRef) {
	// use parent to render the canvas in this ref
	// (without that p5 will render the canvas outside of your component)
	p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
	let startingPosition = p5.createVector(
		canvasWidth / 2,
		Math.random() * canvasHeight
	);
	let startingVelocity = p5.createVector(
		Math.random() * speedScale,
		Math.random() * speedScale
	);
	ball = new Ball(p5, startingPosition, startingVelocity);
	field = new Field(p5);
};

function draw (p5) {
	// NOTE: Do not use setState in the draw function or in
    // functions that are executed in the draw function...
	// please use normal variables or class properties 
    // for these purposes
	p5.background(0);
	field.display();
	ball.update();
	ball.display();
};

export {setup, draw};