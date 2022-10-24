import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container
} from "@material-ui/core"

import useStyles from "../styles";

export function Header(theme) {
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
        </Toolbar>
      </AppBar>
    </>
  );
}
