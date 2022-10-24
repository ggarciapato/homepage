import { 
    Box,
    Grid,
    IconButton
} from "@material-ui/core";

import useStyles from "../styles";
import socialData from "./socials.json";


export function Footer() {
    const classes = useStyles();
    return (
        <Box 
            className={classes.footer} 
        >
            <Grid 
              container 
              spacing={0} 
              // columns={1}
              className={classes.socials}
            >
              {socialData.map((social) => (
                <Grid item key={social.title}>
                  <a href={social.url}>
                    <IconButton>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="#ffffff" 
                        width="30" 
                        height="30" 
                        viewBox="0 0 24 24"
                        >
                        <path d={social.path}/>
                      </svg>
                    </IconButton>
                  </a>
                </Grid>
              ))}
            </Grid>
        </Box>
    )
}