import { 
    Typography, 
    Container 
} from "@material-ui/core";

import useStyles from "../styles";

export function Footer(theme) {
    const classes = useStyles(theme);
    return (
        <Container className={classes.footer} position='sticky'>
            <Typography>
                Contact: guilherme.pato.garcia at gmail.com
            </Typography>
        </Container>
    )
}