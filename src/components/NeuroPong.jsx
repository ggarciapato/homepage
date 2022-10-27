import {  
    Card,
    CardMedia,
    CardContent,
    Typography,
    Container
} from "@material-ui/core";
import Sketch from "react-p5";
import useStyles from "../styles";
// import { setup, draw } from "./NeuroPong/sketch";
import { Game } from './NeuroPong/Game';

let game;

function setup(p5, canvasParentRef) {
	// use parent to render the canvas in this ref
	// (without that p5 will render the canvas outside of your component)
	game = new Game(p5);
	p5.createCanvas(game.field.canvasWidth, game.field.canvasHeight).parent(canvasParentRef);
};

function draw (p5) {
	// NOTE: Do not use setState in the draw function or in
    // functions that are executed in the draw function...
	// please use normal variables or class properties 
    // for these purposes
	p5.background(0);
	game.step();
};

export function NeuroPong(props) {
    const classes = useStyles();
	return (
        <>
        <Container
            className={classes.container}
        >
            <Card
                className={classes.card}
            >
                <CardMedia 
                    component={Sketch} 
                    setup={setup} 
                    draw={draw}
                />
                <CardContent>
                    <Typography>Still working on it</Typography>
                </CardContent>
            </Card>
        </Container>
        </>
    );
}