import { 
  AppBar, 
  Toolbar, 
  Grid, 
  Typography, 
  Button,
  Container
} from "@material-ui/core"

import useStyles from "../styles";
import socialData from "./socials.json";

export function SocialHeader(theme) {
  const classes = useStyles(theme);
  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Container className={classes.mainHeader}>
            <Typography variant="h3">
              Guilherme Garcia
            </Typography>
            <Typography variant="h6">
              Data Scientist
            </Typography>
          </Container>
          <Grid 
            container 
            spacing={1} 
            columns={1}
            className={classes.socials}
          >
            {socialData.map((social) => (
              <Grid item key={social}>
                <a href={social.url}>
                  <Button>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="#ffffff" 
                      width="50" 
                      height="50" 
                      viewBox="0 0 24 24"
                    >
                      <path d={social.path}/>
                    </svg>
                  </Button>
                </a>
              </Grid>
            ))}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
