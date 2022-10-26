import { Brain } from "./Brain";
import { Model } from "./Model";
import { Memory } from "./Memory";

const canvasWidth = 600;
const canvasHeight = 400;
const speedScale = 5;
const stickSize = 60;
const MAX_SCORE = 10;

export class Ball {
	constructor(_p5) {
		this._p5 = _p5;
		this.radius = 5;
		this.resetBall();
	}

	resetBall() {
		this.position = this._p5.createVector(
			canvasWidth / 2,
			canvasHeight / 2
		);
		
		// random speed in bounded direction
		let direction = this._p5.map(
			Math.random(),
			0, 1,
			3 * this._p5.PI / 4, 
			5 * this._p5.PI / 4
		);
		
		let plusOrMinus = Math.random() < 0.5 ? -1 : 1;

		let velocityX = Math.cos(direction) * plusOrMinus;
		let velocityY = Math.sin(direction);

		this.velocity = this._p5.createVector(
			velocityX * speedScale,
			velocityY * speedScale
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

	update(paddles) {
		// update velocity based on collisions
		let collidedWithLeftWall = this.position.x <= this.radius;
		let collidedWithRightWall = (
			this.position.x >= canvasWidth - this.radius
		);

		if (collidedWithLeftWall | collidedWithRightWall) {
			this.resetBall();
		}
		let collidedWithWalls = (
			this.position.y >= canvasHeight - this.radius
			| this.position.y <= this.radius
		);
		if (collidedWithWalls) {
			this.velocity.y = -this.velocity.y;
		}

		for (let paddle of paddles) {
			let hitThePaddleX = (
				paddle.playerTwo 
				? this.position.x + this.radius >= paddle.x - paddle.thickness
				: this.position.x - this.radius <= paddle.x + paddle.thickness
			);

			let hitThePaddleY = (
				this.position.y < paddle.upperEdge 
				&& this.position.y > paddle.lowerEdge
			);

			
			if (hitThePaddleX && hitThePaddleY) {
				// console.log('hit the stick');
				this.velocity.x = -this.velocity.x;
				this.velocity.y = paddle.velocityY;
			}

			if (paddle.playerTwo) {
				collidedWithLeftWall && (paddle.score += 1);
				collidedWithRightWall && (paddle.other_score += 1);
			} else {
				collidedWithRightWall && (paddle.score += 1);
				collidedWithLeftWall && (paddle.other_score += 1);
			}
		}

		this.position.add(this.velocity);
	}
}

export class Field {
	constructor(_p5) {
		this._p5 = _p5;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.max_score = MAX_SCORE;
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

export class Paddle {
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
		this.score = 0;
		this.other_score = 0;

		this.brain = new Brain(
			new Model([4], 4, 3, 100), 
			new Memory(500)
		)

        // console.log(`built the player ${this.playerTwo ? 2 : 1}`);
	}

	display() {
        // console.log('have we got here?');
		this._p5.noStroke();
		this._p5.rectMode(this._p5.CENTER);
		this._p5.rect(
			this.x, 
			this.y, 
			this.thickness, 
			this.size
		);
		// scores
		let scoreXmulti = this.playerTwo ? 3 : 1;
		let scoreXpos = - 50 + (scoreXmulti * canvasWidth / 4);
		for (let s = 1; s <= this.score; s++) {
			this._p5.rect(
				(scoreXpos) + (s * 10), 
				canvasHeight - 10, 
				5, 
				5
			);
		}
	}

	move(action) {
		this.velocityY = action * speedScale;
		// this.velocityY = 5 * (Math.random() - .5) * speedScale;
		// stop paddle from moving if it reaches edge
		let newY = this.velocityY + this.y;
		this.upperEdge = newY + (this.size / 2);
		this.lowerEdge = newY - (this.size / 2);
		let collided = (
			this.upperEdge > canvasHeight
			| this.lowerEdge < 0
		);
		if (!collided) {
			this.y = newY;
			this.velocityY = 0;
		}

	}
}

export class Game {
    constructor(_p5) {
        this._p5 = _p5;
        this.ball = new Ball(this._p5);
        this.field = new Field(this._p5);
        this.playerOne = new Paddle(this._p5, false);
        this.playerTwo = new Paddle(this._p5, true);
    }

    async resetGame () {
        this.playerOne.score = 0;
        this.playerOne.other_score = 0;
        this.playerOne.y = 0;
        
        this.playerTwo.score = 0;
        this.playerTwo.other_score = 0;
        this.playerTwo.y = 0;

        await this.playerOne.brain.replay();
        await this.playerTwo.brain.replay();
    }

    step() {
        this.field.display();
        this.ball.display();
        this.playerOne.display();
        this.playerTwo.display();

        this.playerOne.brain.think(
            this.playerOne, 
            this.playerTwo,
            this.ball,
            this.field
        )

        this.playerTwo.brain.think(
            this.playerTwo, 
            this.playerOne,
            this.ball,
            this.field
        )
	        
	    this.ball.update([this.playerOne, this.playerTwo]);

        let haveWinner = [this.playerOne, this.playerTwo].some(
            (player) => player.score === MAX_SCORE
        );

        if (haveWinner) {
            this.resetGame();
        }
    }
}