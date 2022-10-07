import React from "react";
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Grid,
    Typography,
    Container
} from "@material-ui/core";

import useStyles from "../styles";
import projects from "./projects.json";

function renderCards(cards, classes) {
    return projects.map((project) => (
        <>
            <Grid item key={project.title} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.cardMedia}
                            image={require(`../images/${project.image}`)}
                            title={project.alt}
                        />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5">
                                {project.title}
                            </Typography>
                            <Typography> 
                                {project.description} 
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    )
)};

export function Projects(theme) {
    const classes = useStyles(theme);
    const cards = [...Array(10).keys()];
    return (
        <>
            <Container className={classes.title}>
                <Typography variant="h4">
                    Projects
                </Typography>
            </Container>
            <Container className={classes.cardGrid} maxWidth="md">
               <Grid key="cardGrid" container spacing={2} justify="center">
                    {renderCards(cards, classes)}
                </Grid>
            </Container>
        </>
    )
}
