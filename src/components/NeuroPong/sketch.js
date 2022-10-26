import { Game } from './Game';

let game;

function setup(p5, canvasParentRef) {
	// use parent to render the canvas in this ref
	// (without that p5 will render the canvas outside of your component)
	game = new Game(p5);
	p5.createCanvas(game.field.canvasWidth, game.field.canvasHeight).parent(canvasParentRef);
	// ball = new Ball(p5);
	// field = new Field(p5);
	// playerOne = new Paddle(p5, false);
	// playerTwo = new Paddle(p5, true);
};

function draw (p5) {
	// NOTE: Do not use setState in the draw function or in
    // functions that are executed in the draw function...
	// please use normal variables or class properties 
    // for these purposes
	p5.background(0);
	game.step();
};

export {setup, draw};