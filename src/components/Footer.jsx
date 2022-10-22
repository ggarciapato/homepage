import { 
    Typography, 
    Box 
} from "@material-ui/core";

import useStyles from "../styles";

export function Footer() {
    const classes = useStyles();
    return (
        <Box 
            className={classes.footer} 
        >
            <Typography>
                Contact: guilherme.pato.garcia at gmail.com
            </Typography>
        </Box>
    )
}