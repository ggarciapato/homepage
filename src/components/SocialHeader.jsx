import { 
  AppBar, 
  Toolbar, 
  Grid, 
  Typography, 
  IconButton,
  Container
} from "@material-ui/core"

import useStyles from "../styles";
import socialData from "./socials.json";

export function SocialHeader(theme) {
  const classes = useStyles(theme);
  return (
    <>
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.containerToolbar}>
            <Container className={classes.mainHeader}>
              <Typography variant="h4">
                Guilherme Garcia
              </Typography>
              <Typography variant="h6">
                Data Scientist
              </Typography>
            </Container>
            <Grid 
              container 
              spacing={0} 
              columns={1}
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
        </Toolbar>
      </AppBar>
    </>
  );
}
