import {  
    Card,
    CardMedia,
    CardContent,
    Typography,
    Container
} from "@material-ui/core";
import Sketch from "react-p5";
import useStyles from "../styles";

import { setup, draw } from "./NeuroPong/sketch";

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