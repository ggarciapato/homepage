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

function renderCards(content, classes) {
    return (
        <>
        <Grid 
            container 
            className={classes.cardGrid} 
            spacing={2} 
            justifyContent="center"
        >
            {content.map((project) => (
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
            ))}
        </Grid>
        </>
    )};

export function Projects(theme) {
    const classes = useStyles(theme);
    return (
        <>
            <Container className={classes.projectTitle}>
                <Typography variant="h4">
                    Projects
                </Typography>
            </Container>
            <Container>
                {renderCards(projects, classes)}
            </Container>
        </>
    )
}
