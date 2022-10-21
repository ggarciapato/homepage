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

import { Link as RouterLink } from "react-router-dom";

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
                        <CardActionArea
                            component={RouterLink}
                            to={`/homepage/projects/${project.tag}`}
                            state={project}
                        >
                            <CardMedia
                                className={classes.cardMedia}
                                image={require(`../images/${project.image}`)}
                                title={project.alt}
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h6">
                                    {project.title}
                                </Typography>
                                <Typography variant='subtitle2'> 
                                    {project.description} 
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
        </>
    )
};

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
