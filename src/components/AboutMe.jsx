import { 
    Box,
    Typography, 
    Container
  } from "@material-ui/core"

import useStyles from "../styles";
import headshot from "../images/perfil.png";

export function AboutMe() {
    const classes = useStyles();    
    return (
        <>
            <Container className={classes.container}>
                <Box>
                    <Typography variant="h3">
                        About me
                    </Typography>
                    <Typography variant="body2">
                        Hello. My name is Guilherme Garcia, 
                        evolutionary biologist and data scientist.
                        After completing my phD in Evolutionary Biology 
                        in the University of São Paulo, I have worked as a 
                        data scientist at Folha de S. Paulo for four years in the 
                        data journalism desk, producing data-driven content for the newspaper.
                    </Typography>
                </Box>
                <Box className={classes.headshot}>
                    <img src={headshot} width="150px" alt="Guilherme Garcia"/>
                </Box>
            </Container>
        </>
    )
}